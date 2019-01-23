import Namespace from "./namespace";
import RPCClient from "../rpcclient";

/**
 * Pool gets the information of transaction in the mempool
 *
 * @export
 * @class Pool
 * @extends {Namespace}
 */
export default class Pool extends Namespace {
	/**
	 * Creates an instance of Pool.
	 * @param {RPCClient} client
	 * @memberof Pool
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Get the size of the transaction
	 * pool
	 *
	 * @returns {Promise<Spell.PoolSize>}
	 * @memberof Pool
	 */
	public getSize(): Promise<Spell.PoolSize> {
		return new Promise((resolve, reject) => {
			this.client
				.call("pool_getSize", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get all transactions in the pool
	 *
	 * @returns {Promise<any>}
	 * @memberof Pool
	 */
	public getAll(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.client
				.call("pool_getAll", null)
				.then((res) => {
					return resolve([]);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
