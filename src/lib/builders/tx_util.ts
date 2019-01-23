import msgpack = require("msgpack5");
import { PrivateKey } from "..";
import { Transaction } from "../../..";
const blake2 = require("blake2");

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
			tx.fee,
			tx.from,
			null, // reserved for invoke args
			tx.nonce,
			tx.senderPubKey,
			tx.timestamp,
			tx.to,
			tx.type,
			tx.value,
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
		var h = blake2.createHash("blake2b", { digestLength: 32 });
		h.update(data);
		return prefix + h.digest("hex");
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
