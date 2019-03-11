import Decimal from "decimal.js";

export default class Spell {
	/**
	 * The RPC client
	 *
	 * @type {RPCClient}
	 * @memberof Spell
	 */
	public rpcClient: RPCClient;
	/**
	 * State module
	 *
	 * @type {State}
	 * @memberof Spell
	 */
	public state: State;
	/**
	 * Node module
	 *
	 * @type {Node}
	 * @memberof Spell
	 */
	public node: Node;
	/**
	 * Authentication module
	 *
	 * @type {Auth}
	 * @memberof Spell
	 */
	public auth: Auth;
	/**
	 * Mempool module
	 *
	 * @type {Pool}
	 * @memberof Spell
	 */
	public pool: Pool;
	/**
	 * Miner module
	 *
	 * @type {Miner}
	 * @memberof Spell
	 */
	public miner: Miner;
	/**
	 * Net Module
	 *
	 * @type {Net}
	 * @memberof Spell
	 */
	public net: Net;
	public ell: Ell;
	/**
	 * Logger Module
	 *
	 * @type {Logger}
	 * @memberof Spell
	 */
	public logger: Logger;
	public rpc: RPC;
	/**
	 * Creates an instance of Spell
	 * @memberof Spell
	 */
	constructor();
	/**
	 * provideClient attempts to connect to an
	 * Ellcrys JSON-RPC server. If it succeeds,
	 * it will use the connection in future RPC
	 * method calls.
	 */
	public provideClient(options: ConnectOptions): Promise<RPCClient>;
	/**
	 * Request for a session token from the node.
	 *
	 * @returns
	 * @memberof Spell
	 */
	public authenticate(username: string, password: string): Promise<string>;
}

export const NumDecimals = 18;

export const TxPayloadVersion: Buffer;

export const AddressVersion: Buffer;
export const PublicKeyVersion: Buffer;
export const PrivateKeyVersion: Buffer;

export interface HttpCallOption {
	method: string;
	params: any;
	jsonrpc: string;
	id: number;
}

export interface JSONRPCCaller {
	call(
		method: string,
		params: any,
		option: HttpCallOption,
		cb: (err: any, res: any) => {},
	): any;
}

export interface ConnectOptions {
	username?: string;
	password?: string;
	host: string;
	port: number;
	https?: boolean;
	path?: string;
}

export interface Block {
	hash: string;
	header: Header;
	sig: string;
	transactions: Transaction[];
}

export interface ArgMindedBlock {
	limit?: number;
	lastHash?: string;
	creatorPubKey?: string;
}

export interface MinedBlock {
	number: string;
	hash: string;
	timestamp: number;
	totalFees: string;
	txCount: string;
	creatorPubKey: string;
}

export interface MinedBlocksResult {
	blocks: MinedBlock[];
	hasMore: boolean;
}

export interface Header {
	creatorPubKey: string;
	difficulty: string;
	extra: string;
	number: string;
	parentHash: string;
	stateRoot: string;
	timestamp: string;
	totalDifficulty: string;
	transactionRoot: string;
	sig: string;
}

export interface InvokeArgs {
	func: string;
	param: { [key: string]: Buffer };
}

export interface CurveKeyPair {
	publicKey: Buffer;
	privateKey: Buffer;
}

export interface Transaction {
	fee?: string;
	from?: string;
	hash?: string;
	nonce?: number;
	senderPubKey?: string;
	sig?: string;
	timestamp?: number | string;
	to?: string;
	type?: number;
	value?: string;
	invokeArgs?: InvokeArgs;
}

export interface Difficulty {
	difficulty: string;
	totalDifficulty: string;
}

export interface Account {
	address: string;
	balance: string;
	nonce: number;
	type: number;
}

export interface ReOrgInfo {
	branchID: string;
	branchLen: number;
	mainChainID: string;
	reOrgLen: 2;
	timestamp: number;
}

export interface Branches {
	height: string;
	id: string;
	isBranch: boolean;
	length: string;
	parentBlockHash: string;
	parentBlockNumber: string;
	timestamp: string;
	totalDifficulty: string;
}

export interface Chain {
	height: string;
	id: string;
	timestamp: string;
	totalDifficulty: string;
}

export enum TxStatus {
	Mined = "mined",
	Pooled = "pooled",
	Unknown = "unknown",
}

export interface SyncStat {
	currentChainHeight: number;
	currentTotalDifficulty: number;
	progressPercent: number;
	targetChainHeight: number;
	targetTotalDifficulty: number;
}

export interface NodeInfo {
	address: string;
	id: string;
	coinbase: string;
	coinbasePublicKey: string;
	listeningAddresses: string[];
	mode: string;
	syncing: boolean;
	netVersion: string;
	buildVersion: string;
	buildDate: string;
	buildCommit: string;
	goVersion: string;
	tipBlockDifficulty: string;
	tipBlockHash: string;
	tipBlockHeight: string;
	tipBlockTotalDifficulty: string;
}

export interface BasicNodeInfo {
	buildCommit: string;
	buildDate: string;
	buildVersion: string;
	goVersion: string;
	id: string;
	mode: string;
	name: string;
	netVersion: string;
	syncing: boolean;
	tipBlockDifficulty: string;
	tipBlockHash: string;
	tipBlockHeight: string;
	tipBlockTotalDifficulty: string;
}

export interface NodeConfig {
	peer: PeerInfo;
	txPool: TxPoolInfo;
	rpc: RPCInfo;
}

export interface PeerInfo {
	address: string;
	mode: number;
	getAddrInt: number;
	pingInt: number;
	selfAdvInt: number;
	cleanUpInt: number;
	maxAddrsExpected: number;
	maxOutConnections: number;
	maxInConnections: number;
	conEstInt: number;
	messageTimeout: number;
}

export interface TxPoolInfo {
	cap: number;
}

export interface RPCInfo {
	disableAuth: boolean;
	username: string;
	password: string;
	sessionSecretKey: string;
}

export interface PoolSize {
	byteSize: number;
	numTxs: number;
}

export interface ActivePeer {
	name: string;
	connected: boolean;
	id: string;
	isAcquainted: boolean;
	isHardcoded: boolean;
	isInbound: boolean;
	lastSeen: string;
}

export interface Peer {
	name: string;
	banEndTime: string;
	connected: boolean;
	id: string;
	isAcquainted: boolean;
	isBanned: boolean;
	isInbound: boolean;
	lastSeen: string;
}

export interface NetStat {
	inbound: number;
	intros: number;
	outbound: number;
	total: number;
}

export interface TxResult {
	id: string;
}

export interface RpcMethod {
	description: string;
	name: string;
	private: boolean;
}

export enum TxType {
	Balance = 0x1,
	Alloc = 0x2,
}

export declare class PrivateKey {
	/**
	 * Instantiate a PrivateKey from a base58
	 * encoded private key string
	 *
	 * @static
	 * @param {string} str The base58 encoded private keys
	 * @returns {PrivateKey}
	 * @throws InvalidPrivateKeyChecksum|InvalidPrivateKeyVersion|InvalidPrivateKeySize
	 * @memberof PrivateKey
	 */
	public static from(str: string): PrivateKey;
	/**
	 * Instantiate a PrivateKey from a buffer.
	 * The buffer's 0th index must contain the
	 * private key version.
	 *
	 * @static
	 * @param {Buffer} buf
	 * @returns {PrivateKey}
	 * @memberof PrivateKey
	 */
	public static fromBuffer(buf: Buffer): PrivateKey;
	/**
	 * The ED25519 key material
	 *
	 * @private
	 * @type {ed25519.CurveKeyPair}
	 * @memberof PrivateKey
	 */
	private keypair;
	/**
	 * Creates an instance of PrivateKey.
	 * @param {Buffer} seed Random seed used ro create the key
	 * @memberof PrivateKey
	 */
	constructor(seed?: Buffer);
	/**
	 * Sign a message
	 *
	 * @param {Buffer} data The message
	 * @returns {Buffer}
	 * @memberof PrivateKey
	 */
	public sign(data: Buffer): Buffer;
	/**
	 * Returns an address derived from
	 * the private key
	 *
	 * @returns {Address}
	 * @memberof PrivateKey
	 */
	public toAddress(): Address;
	/**
	 * Returns the public key.
	 *
	 * @returns {PublicKey}
	 * @memberof PrivateKey
	 */
	public publicKey(): PublicKey;
	/**
	 * Returns base58 encode string of the private key
	 *
	 * @returns {string}
	 * @memberof PrivateKey
	 */
	public toBase58(): string;
	/**
	 * Returns the private key as a buffer.
	 * The base58 version is added as the 0th
	 * byte in the returned buffer
	 *
	 * @returns {Buffer}
	 * @memberof PrivateKey
	 */
	public toBuffer(): Buffer;
}

export declare class PublicKey {
	/**
	 * Instantiate a PublicKey from a buffer.
	 * The buffer's 0th index must contain the
	 * public key version.
	 *
	 * @static
	 * @param {Buffer} buf
	 * @returns {PublicKey}
	 * @memberof PublicKey
	 */
	public static fromBuffer(buf: Buffer): PublicKey;
	/**
	 * Instantiate a PublicKey from a base58
	 * encoded public key string
	 *
	 * @static
	 * @param {string} str
	 * @returns {PublicKey}
	 * @throws InvalidPublicKeyChecksum|InvalidPublicKeyVersion|InvalidPublicKeySize
	 * @memberof PublicKey
	 */
	public static from(str: string): PublicKey;
	private pk;
	/**
	 * Returns base58 encode string of the public key
	 *
	 * @returns {string}
	 * @memberof PublicKey
	 */
	public toBase58(): string;
	/**
	 * Returns the public key as a buffer.
	 * The public key version is added as the 0th
	 * byte in the returned buffer
	 *
	 * @returns {Buffer}
	 * @memberof PublicKey
	 */
	public toBuffer(): Buffer;
	/**
	 * Returns an address derived from
	 * the public key
	 *
	 * @returns {Address}
	 * @memberof PublicKey
	 */
	public toAddress(): Address;
	/**
	 * Verify a signature
	 *
	 * @param {Buffer} msg The message that was signed
	 * @param {Buffer} sig The message's signature
	 * @returns {boolean}
	 * @memberof PublicKey
	 */
	public verify(msg: Buffer, sig: Buffer): boolean;
}

export declare class Address {
	/**
	 * Check whether an address is valid
	 *
	 * @static
	 * @param {string} address The address to check
	 * @returns {boolean}
	 * @memberof Address
	 */
	public static isValid(address: string): boolean;
	/**
	 * Check whether a given address is valid.
	 * If not valid, the specific validation error
	 * is returned. It returns null if the address
	 * is valid.
	 *
	 * @static
	 * @param {string} address The address to check
	 * @returns {(null | Error)} InvalidAddressVersion |
	 * 			InvalidAddressSize }| InvalidAddressFormat
	 * @memberof Address
	 */
	public static getValidationError(address: string): null | Error;
	/**
	 * Instantiate an Address instance from
	 * a given address string
	 *
	 * @static
	 * @param {string} address
	 * @returns {Address}
	 * @throws InvalidAddress
	 * @memberof Address
	 */
	public static from(address: string): Address;
	/**
	 * Return a string format of the address
	 *
	 * @memberof Address
	 */
	public toString: () => string;
	/**
	 * The loaded address
	 *
	 * @private
	 * @type {string}
	 * @memberof Address
	 */
	private address;
}

export declare class TxBuilder {
	public balance: TxBalanceBuilder;
	constructor(client: RPCClient);
}

export declare class TxUtility {
	/**
	 * Returns the byte equivalent of
	 * a given transaction but does not
	 * include the transaction `hash` and
	 * `sig` fields
	 *
	 * @param {Transaction} tx The transaction
	 * @returns {Buffer}
	 * @memberof TxUtility
	 */
	public getBytesNoHashAndSig(tx: Transaction): Buffer;
	/**
	 * Compute and return the hash of a transaction
	 *
	 * @param {Transaction} tx The transaction
	 * @param {string} [prefix="0x"] Add a prefix to the hash
	 * @returns {string}
	 * @memberof TxUtility
	 */
	public hash(tx: Transaction, prefix?: string): string;
	/**
	 * Sign and return a signature of the
	 * transaction.
	 *
	 * @param {Transaction} tx The transaction
	 * @param {PrivateKey} sk The private key to use for signing
	 * @param {string} [prefix="0x"] A prefix to add to the signature
	 * @returns {string} An hex string
	 * @memberof TxUtility
	 */
	public sign(tx: Transaction, sk: PrivateKey, prefix?: string): string;
}

export declare class TxBalanceBuilder extends TxUtility {
	/**
	 * The transaction data
	 *
	 * @protected
	 * @type {Transaction}
	 * @memberof TxBalanceBuilder
	 */
	protected data: Transaction;
	/**
	 * The RPC client
	 *
	 * @protected
	 * @type {RPCClient}
	 * @memberof TxBalanceBuilder
	 */
	protected client: undefined | RPCClient;
	/**
	 * Creates an instance of TxBalanceBuilder.
	 *
	 * @param {RPCClient} [client] The RPC client
	 * @memberof TxBalanceBuilder
	 */
	constructor(client?: RPCClient);
	/**
	 * Set the sender address
	 *
	 * @param {string|Address} address The address
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public from(address: string | Address): TxBalanceBuilder;
	/**
	 * Set the recipient address
	 *
	 * @param {string|Address} address The address
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public to(address: string | Address): TxBalanceBuilder;
	/**
	 * The next nonce of the sending account
	 *
	 * @param {number} n The next nonce of the sender
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public nonce(num: number): TxBalanceBuilder;
	/**
	 * Set the amount to send from the
	 * sender to the recipient
	 *
	 * @param {string} value The amount to send
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public value(value: string | Decimal): TxBalanceBuilder;
	/**
	 * Set the fee to be paid for this
	 * transaction
	 *
	 * @param {string} value The amount to pay as fee
	 * @returns {TxBalanceBuilder}
	 * @memberof TxBalanceBuilder
	 */
	public fee(fee: string | Decimal): TxBalanceBuilder;
	/**
	 * Reset the transaction builder
	 *
	 * @memberof TxBalanceBuilder
	 */
	public reset(): void;
	/**
	 * Returns the transaction data without sending
	 * it to the network. It will finalize the transaction
	 * if the sender's private key is provided.
	 *
	 * @param {PrivateKey} [sk] The senders private key
	 * @memberof TxBalanceBuilder
	 */
	public payload(sk?: PrivateKey): Promise<Transaction>;
	/**
	 * Send the transaction to the network
	 *
	 * @param {PrivateKey} sk The sender's private key
	 * @returns {Promise<TxResult>}
	 * @memberof TxBalanceBuilder
	 */
	public send(sk: PrivateKey): Promise<TxResult>;
	/**
	 * Returns a base58 serialized version of the
	 * transaction.
	 *
	 * @param {PrivateKey} sk The sender's private key
	 * @returns {string}
	 * @memberof TxBalanceBuilder
	 */
	public packed(sk: PrivateKey): Promise<string>;
	/**
	 * Performs final operations such  computing and
	 * setting the transaction hash and signature as
	 * well as setting the sender public key and time.
	 *
	 * @protected
	 * @param {PrivateKey} sk The sender's private key
	 * @returns {Promise<string>} Returns the transaction hash
	 * @memberof TxBalanceBuilder
	 */
	protected finalize(sk?: PrivateKey): Promise<string>;
}

export declare class Namespace {
	protected client: RPCClient;
}

export declare class RPCClient {
	/**
	 * client references the JSON-RPC 2.0 client
	 *
	 * @type {JSONRPCCaller}
	 * @memberof RPCClient
	 */
	public client?: JSONRPCCaller;
	/**
	 * clientOpts contains the options to pass
	 * to the client call request
	 *
	 * @public
	 * @type {*}
	 * @memberof RPCClient
	 */
	public clientOpts: any;
	/**
	 * The session token to access
	 * private endpoints
	 *
	 * @private
	 * @type {string}
	 * @memberof Spell
	 */
	private token;
	/**
	 * Creates an instance of RPCClient.
	 *
	 * @param {*} client The underlying JSON-RPC 2.0 client
	 * @memberof RPCClient
	 */
	constructor(client?: JSONRPCCaller);
	/**
	 * Call a RPC method
	 *
	 * @param {string} method The RPC method full name
	 * @param {*} params The method's parameters
	 * @returns {Promise}
	 * @memberof RPCClient
	 */
	public call(method: string, params: any): Promise<any>;
	/**
	 * Set the session token
	 *
	 * @param {string} token
	 * @memberof RPCClient
	 */
	public setToken(token: string): void;
}

export declare class State extends Namespace {
	/**
	 * Creates an instance of State.
	 *
	 * @param {RPCClient} client
	 * @memberof State
	 */
	constructor(client: RPCClient);
	/**
	 * Get a block by number
	 *
	 * @param {number} num The block number/height
	 * @returns {Promise<Block>}
	 * @memberof State
	 */
	public getBlock(num: number): Promise<Block>;

	/**
	 * Fetch blocks mined by the node. It is possible to
	 * limit the results by specifying opts.limit to
	 * a desired number.
	 *
	 * To support pagination, set
	 * opts.lastHash to get only results after a specified
	 * block hash.
	 *
	 * Given the possibility that a node may mined blocks
	 * using different coinbase (and public key), use
	 * opts.creatorPubKey to return blocks mined by a
	 * specific public key (or account).
	 *
	 * @param {ArgMindedBlock} [opts={}]
	 * @returns {Promise<MinedBlocksResult>}
	 * @memberof State
	 */
	public getMinedBlocks(opts: ArgMindedBlock): Promise<MinedBlocksResult>;

	/**
	 * Get a block by block Hash
	 *
	 * @param {string} blockHash The hash of the block.
	 * @returns {Promise<Block>}
	 * @memberof State
	 */
	public getBlockByHash(blockHash: string): Promise<Block>;
	/**
	 * Get the current difficulty and total difficulty
	 * of the network.
	 *
	 * @returns
	 * @returns {Promise<Difficulty>}
	 * @memberof State
	 */
	public getDifficulty(): Promise<Difficulty>;
	/**
	 * Get all the account on the network
	 *
	 * @returns {Promise<Account[]>}
	 * @memberof State
	 */
	public listAccounts(): Promise<Account[]>;
	/**
	 * Get a list of re-organization events
	 * that have occurred from the node's
	 * perspective
	 *
	 * @returns {Promise<ReOrgInfo[]>}
	 * @memberof State
	 */
	public getReOrgs(): Promise<ReOrgInfo[]>;
	/**
	 * Get a list of top accounts on the network.
	 *
	 * @param {number} limit The maximum number of top accounts to return
	 * @returns {Promise<Account[]>}
	 * @memberof State
	 */
	public listTopAccounts(limit: number): Promise<Account[]>;
	/**
	 * Get a specific account on the network
	 *
	 * @param {string} address The address of the accounts
	 * @returns {Promise<Account>}
	 * @memberof State
	 */
	public getAccount(address: string): Promise<Account>;
	/**
	 * Get the nonce of a given address
	 *
	 * @param {string} address The address whose nonce will be fetched
	 * @returns {Promise<number>}
	 * @memberof State
	 */
	public getAccountNonce(address: string): Promise<number>;
	/**
	 * Get a transaction by its hash
	 *
	 * @param {string} txHash The transaction's hash
	 * @returns {Promise<Transaction>}
	 * @memberof State
	 */
	public getTransaction(txHash: string): Promise<Transaction>;
	/**
	 * Get all the known branches on the node
	 *
	 * @returns {Promise<Branches[]>}
	 * @memberof State
	 */
	public getBranches(): Promise<Branches[]>;
	/**
	 * Get orphan blocks on the node
	 *
	 * @returns {Promise<Block>}
	 * @memberof State
	 */
	public getOrphans(): Promise<Block>;
	/**
	 * Get the best chain on the node
	 *
	 * @returns {Promise<Chain>}
	 * @memberof State
	 */
	public getBestChain(): Promise<Chain>;
	/**
	 * Returns raw db objects (Debug only)
	 *
	 * @param {JSON} filter Filter parameters
	 * @returns {Promise<any>}
	 * @memberof State
	 */
	public getObjects(filter: JSON): Promise<any>;
}

export declare class Node extends Namespace {
	/**
	 * Creates an instance of Node.
	 *
	 * @param {RPCClient} client
	 * @memberof Node
	 */
	constructor(client: RPCClient);
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
	public getTransactionStatus(hash: string): Promise<TxStatus>;
	/**
	 * Get the current status of the node
	 * block synchronization session. Returns
	 * null when the node is not syncing.
	 *
	 * @returns {Promise<SyncStat | null>}
	 * @memberof Node
	 */
	public getSyncStat(): Promise<SyncStat | null>;
	/**
	 * Check whether the node is currently
	 * syncing blocks with a peer.
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	public isSyncing(): Promise<boolean>;

	/**
	 * Enable block synchronization on the node
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	public enableSync(): Promise<boolean>;

	/**
	 * Disable block synchronization on the node
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	public disableSync(): Promise<boolean>;

	/**
	 * Checks whether block synchronization
	 * is enabled on the node.
	 *
	 * @returns {Promise<boolean>}
	 * @memberof Node
	 */
	public isSyncEnabled(): Promise<boolean>;

	/**
	 * Get information about the node
	 *
	 * @returns {Promise<NodeInfo>}
	 * @memberof Node
	 */
	public info(): Promise<NodeInfo>;
	/**
	 * Get the node's configurations
	 *
	 * @returns {Promise<NodeInfo>}
	 * @memberof Node
	 */
	public config(): Promise<NodeConfig>;
	/**
	 * Returns non-sensitive information about
	 * a node.
	 *
	 * @returns {Promise<BasicNodeInfo>}
	 * @memberof Node
	 */
	public basic(): Promise<BasicNodeInfo>;
}

export declare class Auth extends Namespace {
	/**
	 * Creates an instance of Auth.
	 *
	 * @param {RPCClient} client
	 * @memberof Auth
	 */
	constructor(client: RPCClient);
	/**
	 * Retrieve a session token from
	 * the node.
	 *
	 * @param {string} username The RPC username
	 * @param {string} password The RPC password
	 * @memberof Auth
	 * @returns {Promise<string>} The session token
	 */
	public authenticate(username: string, password: string): Promise<string>;
}

export declare class Pool extends Namespace {
	/**
	 * Creates an instance of Pool.
	 * @param {RPCClient} client
	 * @memberof Pool
	 */
	constructor(client: RPCClient);
	/**
	 * Get the size of the transaction
	 * pool
	 *
	 * @export
	 * @class Pool
	 * @returns {Promise<PoolSize>}
	 * @extends {Namespace}
	 */
	public getSize(): Promise<PoolSize>;
	/**
	 * Get all transactions in the pool
	 *
	 * @returns {Promise<any>}
	 * @memberof Pool
	 */
	public getAll(): Promise<any>;
}

export declare class Miner extends Namespace {
	/**
	 *Creates an instance of Miner.
	 * @param {RPCClient} client
	 * @memberof Miner
	 */
	constructor(client: RPCClient);
	/**
	 * Start the miner on the node
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public start(): Promise<Boolean>;
	/**
	 * Stop the miner on the node
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public stop(): Promise<Boolean>;
	/**
	 * Check whether the miner has is running
	 *
	 * @returns {Promise<Boolean>}
	 * @memberof Miner
	 */
	public isMining(): Promise<Boolean>;
	/**
	 * Get the hashrate of the miner
	 *
	 * @returns {Promise<number>}
	 * @memberof Miner
	 */
	public getHashrate(): Promise<number>;
	/**
	 * Get the number of miner threads
	 *
	 * @returns {Promise<number>}
	 * @memberof Miner
	 */
	public numThreads(): Promise<number>;
	/**
	 * Set the number of miner threads
	 * to run.
	 *
	 * @param {number} num
	 * @returns {Promise<number>}
	 * @memberof Miner
	 */
	public setThreads(num: number): Promise<number>;
}

export declare class Net extends Namespace {
	/**
	 * Creates an instance of Net.
	 *
	 * @param {RPCClient} client
	 * @memberof Net
	 */
	constructor(client: RPCClient);
	/**
	 * getActivePeers get all the peers
	 * that are connected to the node
	 *
	 * @returns {Promise<Peer[]>}
	 * @returns {Promise<ActivePeer[]>}
	 * @memberof Net
	 */
	public getActivePeers(): Promise<ActivePeer[]>;
	/**
	 * Get all the peers that the peers
	 * that is known to the node.
	 *
	 * @returns {Promise<Peer[]>}
	 * @memberof Net
	 */
	public getPeers(): Promise<Peer[]>;
	/**
	 * Get the peers that the node will
	 * regularly broadcast messages to.
	 *
	 * @returns {Promise<any>}
	 * @memberof Net
	 */
	public getBroadcasters(): Promise<any>;
	/**
	 * Get the node's connection stats
	 *
	 * @returns {Promise<NetStat>}
	 * @memberof Net
	 */
	public getStats(): Promise<NetStat>;
	/**
	 * Add a peer address to a node.
	 * The node will attempt to connect
	 * to this address when it needs more
	 * connections.
	 *
	 * @param {string} peerAddress
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public addPeer(peerAddress: string): Promise<boolean>;
	/**
	 * Delete all peers in memory and on disk
	 *
	 * @param {string} peerAddress
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public dumpPeers(): Promise<boolean>;
	/**
	 * Connect to one or more addresses
	 * immediately
	 *
	 * @param {Array<string>} peerAddress array of addresses to be connected to
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public join(peerAddress: string[]): Promise<boolean>;
	/**
	 * Prevents inbound or outbound connections by
	 * shutting down the client's network function.
	 * @returns {Promise<boolean>}
	 * @memberof Net
	 */
	public noNet(): Promise<boolean>;
}

export declare class Ell extends Namespace {
	/**
	 * Creates an instance of Ell.
	 *
	 * @param {RPCClient} client
	 * @memberof Ell
	 */
	constructor(client: RPCClient);
	/**
	 * Send a transaction
	 *
	 * @param {Transaction} txData The transaction's data
	 * @returns {Promise<TxResult>}
	 * @memberof Ell
	 */
	public send(txData: Transaction): Promise<TxResult>;
	/**
	 * Returns the balance of an account
	 * using the given address
	 *
	 * @param {string} address
	 * @returns {Promise<string>}
	 * @memberof Ell
	 */
	public getBalance(address: string): Promise<Decimal>;
	/**
	 * Returns a balance transaction builder for
	 * creating and executing balance transactions.
	 *
	 * @returns {TxBalanceBuilder}
	 * @memberof Ell
	 */
	public balance(): TxBalanceBuilder;
	/**
	 * Send a Base58 encoded transaction
	 * to the node.
	 *
	 * @param {string} encodedTx
	 * @returns {Promise<TxResult>}
	 * @memberof Ell
	 */
	public sendRaw(encodedTx: string): Promise<TxResult>;
}

export declare class Logger extends Namespace {
	/**
	 * Creates an instance of Logger.
	 * @param {RPCClient} client
	 * @memberof Logger
	 */
	constructor(client: RPCClient);
	/**
	 * Set the log level to DEBUG.
	 *
	 * @public
	 * @returns {Promise<boolean>}
	 * @memberof Logger
	 */
	public debugLogger(): Promise<boolean>;
	/**
	 * Set the logger to default logger
	 *
	 * @public
	 * @returns {Promise<boolean>}
	 * @memberof Logger
	 */
	public defaultLogger(): Promise<boolean>;
}

export declare class RPC extends Namespace {
	/**
	 * Creates an instance of RPC.
	 * @param {RPCClient} client
	 * @memberof RPC
	 */
	constructor(client: RPCClient);
	/**
	 * Stop the JSON-RPC 2.0 service
	 *
	 * @export
	 * @class RPC
	 * @extends {Namespace}
	 */
	public stop(): Promise<boolean>;
	/**
	 * Test JSON-RPC 2.0 service by sending
	 * messages that are echoed back.
	 *
	 * @export
	 * @class RPC
	 * @extends {Namespace}
	 */
	public echo(params?: any | null): Promise<any>;
	/**
	 * Get all JSON-RPC 2.0 methods
	 * supported by the service
	 *
	 * @export
	 * @class RPC
	 * @extends {Namespace}
	 */
	public methods(): Promise<RpcMethod[]>;
}

/**
 * Checks whether an HDKey path is
 * valid
 *
 * @export
 * @param {string} path The path to check
 * @returns {boolean}
 */
export declare function isValidPath(path: string): boolean;
/**
 * HDKey provides the ability to create
 * hierarchical deterministic keys.
 *
 * @export
 * @class HDKey
 */
export declare class HDKey {
	/**
	 * Create an HDKey from a seed.
	 *
	 * @static
	 * @param {Buffer} seed
	 * @returns {Node}
	 * @memberof HDKey
	 */
	public static fromMasterSeed(seed: Buffer): HDKey;
	private mKey;
	private mChainCode;
	/**
	 * Creates an instance of HDKey.
	 * @param {Buffer} key Left half of the hmac digest
	 * @param {Buffer} chainCode Right half of the hmac digest
	 * @memberof HDKey
	 */
	constructor(key: Buffer, chainCode: Buffer);
	/**
	 * Return the derived key
	 *
	 * @returns {Buffer}
	 * @memberof HDKey
	 */
	public key(): Buffer;
	/**
	 * Return the derived chain code
	 *
	 * @returns {Buffer}
	 * @memberof HDKey
	 */
	public chainCode(): Buffer;
	/**
	 * Child key derivation function
	 *
	 * @param {Buffer} key The parent key
	 * @param {Buffer} chainCode The parent chain code
	 * @param {number} index The key index
	 * @returns {HDKey}
	 * @memberof HDKey
	 */
	public ckd(key: Buffer, chainCode: Buffer, index: number): HDKey;
	/**
	 * Given a path, derive a child key. Path
	 * must contain only hardened indices
	 *
	 * @param {string} path The derivation path
	 * @returns {HDKey}
	 * @memberof HDKey
	 */
	public derive(path: string): HDKey;
	/**
	 * Get the private key created using the
	 * derived key
	 *
	 * @returns {PrivateKey}
	 * @memberof HDKey
	 */
	public privateKey(): PrivateKey;
}
