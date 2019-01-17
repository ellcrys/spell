import { Address } from "../key";
import Decimal from "decimal.js";
import RPCClient from "../rpcclient";
import errors from "../errors";
import moment = require("moment");
import TxUtility from "./tx_util";
import { PrivateKey } from "..";
import b58 = require("bs58check");

export const NumDecimals = 18;
export const TxPayloadVersion = Buffer.from([95]);

/**
 * Transaction builder provides
 * transaction creation and execution
 * capabilities.
 *
 * @class TxBuilder
 */
export default class TxBuilder {
	public balance: TxBalanceBuilder;
	constructor(client: RPCClient) {
		this.balance = new TxBalanceBuilder(client);
	}
}

/**
 * TxBalanceBuilder provides the ability to
 * build and execute a balance transaction
 *
 * @class TxBalanceBuilder
 */
export class TxBalanceBuilder extends TxUtility {
	/**
	 * The transaction data
	 *
	 * @protected
	 * @type {Transaction}
	 * @memberof TxBalanceBuilder
	 */
	protected data: Transaction;

	/**
	 * The RPC client
	 *
	 * @protected
	 * @type {RPCClient}
	 * @memberof TxBalanceBuilder
	 */
	protected client: undefined | RPCClient;

	/**
	 * Creates an instance of TxBalanceBuilder.
	 *
	 * @param {RPCClient} [client] The RPC client
	 * @memberof TxBalanceBuilder
	 */
	constructor(client?: RPCClient) {
		super();
		this.client = client;
		this.data = {
			type: 0x1,
		};
	}

	/**
	 * Set the sender address
	 *
	 * @param {string|Address} address The address
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public from(address: string | Address): TxBalanceBuilder {
		if (address instanceof Address) {
			this.data.from = address.toString();
		} else {
			this.data.from = address;
		}
		return this;
	}

	/**
	 * Set the recipient address
	 *
	 * @param {string|Address} address The address
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public to(address: string | Address): TxBalanceBuilder {
		if (address instanceof Address) {
			this.data.to = address.toString();
		} else {
			this.data.to = address;
		}
		return this;
	}

	/**
	 * The next nonce of the sending account
	 *
	 * @param {number} n The next nonce of the sender
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public nonce(num: number): TxBalanceBuilder {
		this.data.nonce = num;
		return this;
	}

	/**
	 * Set the amount to send from the
	 * sender to the recipient
	 *
	 * @param {string} value The amount to send
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public value(value: string | Decimal): TxBalanceBuilder {
		if (value instanceof Decimal) {
			this.data.value = value.toFixed(NumDecimals);
		} else {
			this.data.value = value;
		}
		return this;
	}

	/**
	 * Set the fee to be paid for this
	 * transaction
	 *
	 * @param {string} value The amount to pay as fee
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public fee(fee: string | Decimal): TxBalanceBuilder {
		if (fee instanceof Decimal) {
			this.data.fee = fee.toFixed(NumDecimals);
		} else {
			this.data.fee = fee;
		}
		return this;
	}

	/**
	 * Reset the transaction builder
	 *
	 * @memberof TxBalanceBuilder
	 */
	public reset() {
		this.data = {};
	}

	/**
	 * Performs final operations such  computing and
	 * setting the transaction hash and signature as
	 * well as setting the sender public key and time.
	 *
	 * @protected
	 * @param {PrivateKey} sk The sender's private key
	 * @returns {Promise<string>} Returns the transaction hash
	 * @memberof TxBalanceBuilder
	 */
	protected finalize(sk?: PrivateKey): Promise<string> {
		return new Promise(async (resolve, reject) => {
			if (!sk) {
				return reject(errors.RequirePrivateKey);
			}

			this.data.senderPubKey = sk.publicKey().toBase58();

			// We need to determine the senders current nonce
			// if it has not been manually set.
			if (!this.data.nonce) {
				if (!this.client) {
					return reject(errors.ClientNotInitialized);
				}
				try {
					const acct = await this.client.call(
						"state_getAccount",
						this.data.from,
					);
					this.data.nonce = acct.nonce + 1;
				} catch (e) {
					if (e.statusCode === 400) {
						e.data = JSON.parse(e.data);
						if (e.data.error.code === 30001) {
							return reject(errors.UnknownSenderAccount);
						}
					}
					return reject(e);
				}
			}

			// Compute and set hash
			this.data.hash = this.hash(this.data, "");

			// Compute and set signature
			this.data.sig = this.sign(this.data, sk, "");

			return resolve(this.data.hash);
		});
	}

	/**
	 * Returns the transaction data without sending
	 * it to the network. It will finalize the transaction
	 * if the sender's private key is provided.
	 *
	 * @param {PrivateKey} [sk] The senders private key
	 * @memberof TxBalanceBuilder
	 */
	public async payload(sk?: PrivateKey) {
		// Set timestamp
		this.data.timestamp = moment().unix();

		// If the private is provided,
		// we can attempt to finalize
		// the builder
		if (sk) {
			await this.finalize(sk);
		}

		return this.data;
	}

	/**
	 * Send the transaction to the network
	 *
	 * @param {PrivateKey} sk The sender's private key
	 * @returns {Promise<TxResult>}
	 * @memberof TxBalanceBuilder
	 */
	public async send(sk: PrivateKey): Promise<TxResult> {
		return new Promise(async (resolve, reject) => {
			this.data.timestamp = moment().unix();
			await this.finalize(sk);

			if (!this.client) {
				return reject(errors.ClientNotInitialized);
			}

			this.client
				.call("ell_send", this.data)
				.then((hash) => {
					return resolve(hash);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Returns a base58 serialized version of the
	 * transaction.
	 *
	 * @param {PrivateKey} sk The sender's private key
	 * @returns {string}
	 * @memberof TxBalanceBuilder
	 */
	public async packed(sk: PrivateKey): Promise<string> {
		this.data.timestamp = moment().unix();
		await this.finalize(sk);
		const txBytes = Buffer.from(JSON.stringify(this.data));
		return Promise.resolve(b58.encode(Buffer.concat([TxPayloadVersion, txBytes])));
	}
}
