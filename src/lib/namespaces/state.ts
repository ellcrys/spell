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
	 * Get the difficulty & totalDifficulty
	 * of the Ellcrys blockchain protocol.
	 *
	 * @returns
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
	 * Get all the account on the Ellcrys blockchain
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
	 * Get the ReOrg chains available on the Ellcrys protocol
	 *
	 * @returns {Promise<Chain[]>}
	 * @memberof State
	 */
	public getReOrgs(): Promise<Chain[]> {
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
	 * Get the Top n account on the Ellcrys Blockchain protocol
	 *
	 * @param {number} topNumber the total number of accounts to be
	 * returned from the Ellcrys blockchain protocol
	 *
	 * @returns {Promise<Account[]>}
	 * @memberof State
	 */
	public listTopAccounts(topNumber: number): Promise<Account[]> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_listTopAccounts", topNumber)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get a specific account on the Ellcrys Blockchain Protocol
	 * based on the address specified
	 *
	 * @param {string} address is the address of an account to be returned
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
	 * Get the nonce of a specific address on the
	 * Ellcrys Blockchain protocol
	 *
	 * @param {string} address is the address of an account to be returned
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
	 * Get a specific transaction on the Ellcrys Blockchain protocol
	 *
	 * @param {string} txHash is the hash of the transaction we want to get
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
	 * Get all the branches available on the Ellcrys Blockchain protocol
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
	 * gets the blocks that are considered as
	 * orphan blocks on the Ellcrys network
	 *
	 * @returns {Promise<Block>}
	 * @memberof State
	 */
	public getOrphans(): Promise<Block> {
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
	 * get the best chain on the Ellcrys Blockchain protocol
	 *
	 * @returns {Promise<BestChain>}
	 * @memberof State
	 */
	public getBestChain(): Promise<BestChain> {
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
	 * getObjects returns the logs which is used for debugging on the Ellcrys network
	 *
	 * @param {JSON} jsonParameter is the parameter feed into the rpc method
	 * @returns {Promise<any>}
	 * @memberof State
	 */
	public getObjects(jsonParameter: JSON): Promise<any> {
		return new Promise((resolve, reject) => {
			this.client
				.call("state_getObjects", jsonParameter)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
