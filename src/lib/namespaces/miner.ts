/**
 * @module Miner
 */
import RPCClient from "../rpcclient";
import Namespace from "./namespace";

/**
 * Miner handles mining operations
 * on a node.
 *
 * @export
 * @class Miner
 * @extends {Namespace}
 */
export default class Miner extends Namespace {
	/**
	 * Creates an instance of Miner.
	 * @param {RPCClient} client
	 * @memberof Miner
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Start the miner on the node
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public start(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("miner_start", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Stop the miner on the node
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public stop(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("miner_stop", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Check whether the miner has is running
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public isMining(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("miner_isMining", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get the hashrate of the miner
	 *
	 * @returns {Promise<number>}
	 * @memberof Miner
	 */
	public getHashrate(): Promise<number> {
		return new Promise((resolve, reject) => {
			this.client
				.call("miner_getHashrate", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get the number of miner threads
	 *
	 * @returns {Promise<number>}
	 * @memberof Miner
	 */
	public numThreads(): Promise<number> {
		return new Promise((resolve, reject) => {
			this.client
				.call("miner_numThreads", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Set the number of miner threads
	 * to run.
	 *
	 * @param {number} num
	 * @returns {Promise<number>}
	 * @memberof Miner
	 */
	public setThreads(num: number): Promise<number> {
		return new Promise((resolve, reject) => {
			this.client
				.call("miner_setThreads", num)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
