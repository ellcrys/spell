import RPCClient from "../rpcclient";
import Namespace from "./namespace";

/**
 * Node accesses information about an Elld client
 *
 * @export
 * @class Node
 */
export default class Node extends Namespace {
	/**
	 * Creates an instance of Node.
	 *
	 * @param {RPCClient} client
	 * @memberof Node
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Get the status of a transaction.
	 *
	 * The status is 'pooled' when the transaction
	 * is currently in the transaction pool or 'mined'
	 * if the transaction has been added to a mined block.
	 * If the transaction hash is unrecognised, 'unknown'
	 * is returned.
	 *
	 * @param {string} hash The transaction hash
	 * @returns {Promise<TxStatus>}
	 * @memberof Node
	 */
	getTransactionStatus(hash: string): Promise<TxStatus> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_getTransactionStatus", hash)
				.then((res) => {
					return resolve(res.status);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get the current status of the node
	 * block synchronization session. Returns
	 * null when the node is not syncing.
	 *
	 * @returns {Promise<SyncState | null>}
	 * @memberof Node
	 */
	getSyncState(): Promise<SyncState | null> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_getSyncState", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Check whether the node is currently
	 * syncing blocks with a peer.
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	isSyncing(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_isSyncing", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get information about the node
	 *
	 * @returns {Promise<NodeInfo>}
	 * @memberof Node
	 */
	info(): Promise<NodeInfo> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_info", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get information about the node
	 *
	 * @returns {Promise<NodeInfo>}
	 * @memberof Node
	 */
	config(): Promise<NodeConfig> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_config", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}