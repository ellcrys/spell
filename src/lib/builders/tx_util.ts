import msgpack = require("msgpack5");
import sha256 = require("sha256");
import { PrivateKey } from "..";

/**
 * TxUtility provides transaction
 * processing functions to be used
 * by other modules.
 *
 * @class TxUtility
 */
export default class TxUtility {
	/**
	 * Returns the byte equivalent of
	 * a given transaction but does not
	 * include the transaction `hash` and
	 * `sig` fields
	 *
	 * @param {Transaction} tx The transaction
	 * @returns {Buffer}
	 * @memberof TxUtility
	 */
	getBytesNoHashAndSig(tx: Transaction): Buffer {
		const data = [
			tx.type,
			tx.nonce,
			tx.to,
			tx.senderPubKey,
			tx.from,
			tx.value,
			tx.fee,
			tx.timestamp,
			null,
		];
		return msgpack()
			.encode(data)
			.slice(0);
	}

	/**
	 * Compute and return the hash of a transaction
	 *
	 * @param {Transaction} tx The transaction
	 * @param {string} [prefix="0x"] Add a prefix to the hash
	 * @returns {string}
	 * @memberof TxUtility
	 */
	hash(tx: Transaction, prefix = "0x"): string {
		const data = this.getBytesNoHashAndSig(tx);
		return prefix + sha256(data);
	}

	/**
	 * Sign and return a signature of the
	 * transaction.
	 *
	 * @param {Transaction} tx The transaction
	 * @param {PrivateKey} sk The private key to use for signing
	 * @param {string} [prefix="0x"] A prefix to add to the signature
	 * @returns {string} An hex string
	 * @memberof TxUtility
	 */
	sign(tx: Transaction, sk: PrivateKey, prefix = "0x"): string {
		const data = this.getBytesNoHashAndSig(tx);
		return prefix + sk.sign(data).toString("hex");
	}
}
