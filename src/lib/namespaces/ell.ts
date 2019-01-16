import RPCClient from "../rpcclient";
import Namespace from "./namespace";
import Decimal from "decimal.js";
import TxBuilder, { TxBalanceBuilder } from "../builders/transaction_builder";

/**
 * Ell accesses information about an Elld client
 *
 * @export
 * @class Ell
 */
export default class Ell extends Namespace {
	/**
	 * Creates an instance of Ell.
	 *
	 * @param {RPCClient} client
	 * @memberof Ell
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Send a transaction
	 *
	 * @param {Transaction} txData The transaction's data
	 * @returns {Promise<TxResult>}
	 * @memberof Ell
	 */
	public send(txData: Transaction): Promise<TxResult> {
		return new Promise((resolve, reject) => {
			this.client
				.call("ell_send", txData)
				.then((token) => {
					return resolve(token);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Returns the balance of an account
	 * using the given address
	 *
	 * @param {string} address
	 * @returns {Promise<string>}
	 * @memberof Ell
	 */
	public getBalance(address: string): Promise<Decimal> {
		return new Promise((resolve, reject) => {
			this.client
				.call("ell_getBalance", address)
				.then((balance) => {
					return resolve(new Decimal(balance));
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Returns a balance transaction builder for
	 * creating and executing balance transactions.
	 *
	 * @returns {TxBalanceBuilder}
	 * @memberof Ell
	 */
	public balance(): TxBalanceBuilder {
		return new TxBuilder(this.client).balance;
	}

	/**
	 * This send an encoded transaction in Base58 as input
	 * to a node for processing.
	 *
	 * @param {string} encodedTx
	 * @returns {Promise<TxResult>}
	 * @memberof Ell
	 */
	public sendRaw(encodedTx: string): Promise<TxResult> {
		return new Promise((resolve, reject) => {
			this.client
				.call("ell_sendRaw", encodedTx)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
