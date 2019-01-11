import jsonrpc from "node-json-rpc2";
import rn from "random-number";
import errors, { wrapErr } from "../errors";
import RPCClient from "../rpcclient";
import Namespace from "./namespace";

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
	send(txData: Transaction): Promise<TxResult> {
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
}
