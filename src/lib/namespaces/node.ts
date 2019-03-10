/**
 * @module Node
 */
import {
	BasicNodeInfo,
	NodeConfig,
	NodeInfo,
	SyncStat,
	Transaction,
	TxStatus,
} from "../../..";
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
	public getTransactionStatus(hash: string): Promise<TxStatus> {
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
	 * @returns {Promise<SyncStat | null>}
	 * @memberof Node
	 */
	public getSyncStat(): Promise<SyncStat | null> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_getSyncStat", null)
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
	public isSyncing(): Promise<boolean> {
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
	 * Enable block synchronization on the node
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	public enableSync(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_enableSync", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Disable block synchronization on the node
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	public disableSync(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_disableSync", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Checks whether block synchronization
	 * is enabled on the node.
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	public isSyncEnabled(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_isSyncEnabled", null)
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
	public info(): Promise<NodeInfo> {
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
	 * Get the node's configurations
	 *
	 * @returns {Promise<NodeConfig>}
	 * @memberof Node
	 */
	public config(): Promise<NodeConfig> {
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

	/**
	 * Returns non-sensitive information about
	 * a node.
	 *
	 * @returns {Promise<BasicNodeInfo>}
	 * @memberof Node
	 */
	public basic(): Promise<BasicNodeInfo> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_basic", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get transaction from the transaction pool
	 *
	 * @param {string} txHash hash of the tx to fetch from pool
	 * @returns {Promise<Transaction>}
	 * @memberof Node
	 */
	public getTransactionFromPool(txHash: string): Promise<Transaction> {
		return new Promise((resolve, reject) => {
			this.client
				.call("node_getTransactionFromPool", txHash)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
