import jsonrpc from "node-json-rpc2";
import rn from "random-number";
import errors, { wrapErr } from "../errors";
import RPCClient from "../rpcclient";
import Namespace from "./namespace";

/**
 * Read the state of the Ellcrys blockchain
 * on a client.
 *
 * @export
 * @class State
 */
export default class State extends Namespace {
	/**
	 * Creates an instance of State.
	 *
	 * @param {RPCClient} client
	 * @memberof State
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Get a block by number
	 *
	 * @param {number} num The block number/height
	 * @returns {Promise<Block>}
	 * @memberof State
	 */
	public getBlock(num: number): Promise<Block> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getBlock", num)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
