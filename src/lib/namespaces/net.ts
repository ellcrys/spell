import Namespace from "./namespace";
import RPCClient from "../rpcclient";

/**
 * Manage the network related activities of a Node
 *
 * @export
 * @class Net
 * @extends {Namespace}
 */
export default class Net extends Namespace {
	/**
	 *Creates an instance of Net.
	 * @param {RPCClient} client
	 * @memberof Net
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * getActivePeers get all the active peers connected to a node
	 *
	 * @returns {Promise<Peer[]>}
	 * @memberof Net
	 */
	public getActivePeers(): Promise<ActivePeer[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_getActivePeers", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get all the peers that the node synced.
	 *
	 * @returns {Promise<Peer[]>}
	 * @memberof Net
	 */
	public getPeers(): Promise<Peer[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_getPeers", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get broadcast peers on the ellcrys network
	 *
	 * @returns {Promise<any>}
	 * @memberof Net
	 */
	public getBroadcasters(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_broadcasters", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get number connections and network nodes
	 *
	 * @returns {Promise<any>}
	 * @memberof Net
	 */
	public getStats(): Promise<NetStat> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_stats", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * add a peer address to a node
	 *
	 * @param {string} peerAddress
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public addPeer(peerAddress: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_addPeer", peerAddress)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
	/**
	 * Delete all peers in memory and on disk
	 *
	 * @param {string} peerAddress
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public dumpPeers(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_dumpPeers", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Connect to one or more address
	 *
	 * @param {Array<string>} peerAddress array of address to be connected to
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public join(peerAddress: Array<string>): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_join", peerAddress)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
