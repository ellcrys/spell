import Namespace from "./namespace";
import RPCClient from "../rpcclient";
import { resolve } from "path";

/**
 * Manage the mining activities of an elld node
 *
 * @export
 * @class Miner
 * @extends {Namespace}
 */
export default class Miner extends Namespace {
	/**
	 *Creates an instance of Miner.
	 * @param {RPCClient} client
	 * @memberof Miner
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Start the elld miner on the specified ellcrys node
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public start(): Promise<Boolean> {
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
	 * Stop the elld miner on the specified ellcrys node
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public stop(): Promise<Boolean> {
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
	 * get the mining status of an elld node on the Ellcrys network
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public isMining(): Promise<Boolean> {
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
	 * Get the hashrate of the ell node
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
	 * Set the number of miner threads for an elld node.
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
