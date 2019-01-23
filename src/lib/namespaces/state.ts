import RPCClient from "../rpcclient";
import Namespace from "./namespace";
import { Block, Difficulty, Account, ReOrgInfo, Transaction, Branches, Chain } from "../../..";

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

	/**
	 * Get a block by block Hash
	 *
	 * @param {string} blockHash The hash of the block.
	 * @returns {Promise<Block>}
	 * @memberof State
	 */
	public getBlockByHash(blockHash: string): Promise<Block> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getBlockByHash", blockHash)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get the current difficulty and total difficulty
	 * of the network.
	 *
	 * @returns {Promise<Difficulty>}
	 * @memberof State
	 */
	public getDifficulty(): Promise<Difficulty> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getDifficulty", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get all the account on the network
	 *
	 * @returns {Promise<Account[]>}
	 * @memberof State
	 */
	public listAccounts(): Promise<Account[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_listAccounts", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get a list of re-organization events
	 * that have occurred from the node's
	 * perspective
	 *
	 * @returns {Promise<ReOrgInfo[]>}
	 * @memberof State
	 */
	public getReOrgs(): Promise<ReOrgInfo[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getReOrgs", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get a list of top accounts on the network.
	 *
	 * @param {number} limit The maximum number of top accounts to return
	 * @returns {Promise<Account[]>}
	 * @memberof State
	 */
	public listTopAccounts(limit: number): Promise<Account[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_listTopAccounts", limit)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get a specific account on the network
	 *
	 * @param {string} address The address of the accounts
	 * @returns {Promise<Account>}
	 * @memberof State
	 */
	public getAccount(address: string): Promise<Account> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getAccount", address)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get the nonce of a given address
	 *
	 * @param {string} address The address whose nonce will be fetched
	 * @returns {Promise<number>}
	 * @memberof State
	 */
	public getAccountNonce(address: string): Promise<number> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getAccountNonce", address)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get a transaction by its hash
	 *
	 * @param {string} txHash The transaction's hash
	 * @returns {Promise<Transaction>}
	 * @memberof State
	 */
	public getTransaction(txHash: string): Promise<Transaction> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getTransaction", txHash)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get all the known branches on the node
	 *
	 * @returns {Promise<Branches[]>}
	 * @memberof State
	 */
	public getBranches(): Promise<Branches[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getBranches", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get orphan blocks on the node
	 *
	 * @returns {Promise<Block[]>}
	 * @memberof State
	 */
	public getOrphans(): Promise<Block[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getOrphans", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get the best chain on the node
	 *
	 * @returns {Promise<Chain>}
	 * @memberof State
	 */
	public getBestChain(): Promise<Chain> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getBestChain", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Returns raw db objects (Debug only)
	 *
	 * @param {JSON} filter Filter parameters
	 * @returns {Promise<any>}
	 * @memberof State
	 */
	public getObjects(filter: JSON): Promise<any> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getObjects", filter)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
