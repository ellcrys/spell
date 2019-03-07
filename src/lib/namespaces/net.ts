/**
 * @module Net
 */
import { ActivePeer, NetStat, Peer } from "../../..";
import RPCClient from "../rpcclient";
import Namespace from "./namespace";

/**
 * Manage and access the nodes network related
 * activities and resources.
 *
 * @export
 * @class Net
 * @extends {Namespace}
 */
export default class Net extends Namespace {
	/**
	 * Creates an instance of Net.
	 *
	 * @param {RPCClient} client
	 * @memberof Net
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * getActivePeers returns the peers
	 * that are connected to the node.
	 *
	 * @returns {Promise<ActivePeer[]>}
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
	 * Get all peers known to the
	 * client.
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
	 * Get the peers that the node will
	 * regularly broadcast messages to.
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
	 * Get the node's connection statistics
	 *
	 * @returns {Promise<NetStat>}
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
	 * Add an address to the node.
	 * The node will attempt to connect
	 * to this address when it needs more
	 * connections.
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
	 * Delete all known peer addresses
	 * in memory and on disk.
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
	 * Connect to one or more addresses
	 * immediately.
	 *
	 * @param {Array<string>} peerAddress array of addresses to be connected to
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public join(peerAddress: string[]): Promise<boolean> {
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

	/**
	 * Prevents inbound or outbound connections by
	 * shutting down the client's network function.
	 * Note that this does not affect RPC service
	 * and connections.
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public noNet(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("net_noNet", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
