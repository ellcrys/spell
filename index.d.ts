import Decimal from "decimal.js";

export as namespace Spell

export = Spell;

declare class Spell {
	/**
     * The RPC client
     *
     * @type {RPCClient}
     * @memberof Spell
     */
    rpcClient: RPCClient;
    /**
     * State module
     *
     * @type {State}
     * @memberof Spell
     */
    state: State;
    /**
     * Node module
     *
     * @type {Node}
     * @memberof Spell
     */
    node: Node;
    /**
     * Authentication module
     *
     * @type {Auth}
     * @memberof Spell
     */
    auth: Auth;
    /**
     * Mempool module
     *
     * @type {Pool}
     * @memberof Spell
     */
    pool: Pool;
    /**
     * Miner module
     *
     * @type {Miner}
     * @memberof Spell
     */
    miner: Miner;
    /**
     * Net Module
     *
     * @type {Net}
     * @memberof Spell
     */
    net: Net;
    ell: Ell;
    /**
     * Logger Module
     *
     * @type {Logger}
     * @memberof Spell
     */
    logger: Logger;
    rpc: RPC;
    /**
     * Creates an instance of Spell.
     * @memberof Spell
     */
    constructor();
    /**
     * provideClient attempts to connect to an
     * Ellcrys JSON-RPC server. If it succeeds,
     * it will use the connection in future RPC
     * method calls.
     */
    provideClient(options: Spell.ConnectOptions): Promise<{}>;
    /**
     * Request for a session token from the node.
     *
     * @returns
     * @memberof Spell
     */
    authenticate(username: string, password: string): Promise<{}>;
}

declare namespace Spell {

	export  const NumDecimals = 18;

	export  const TxPayloadVersion: Buffer;

	export  const AddressVersion: Buffer;
	export  const PublicKeyVersion: Buffer;
	export  const PrivateKeyVersion: Buffer;

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
			option: Spell.HttpCallOption,
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
		transactions: Array<Spell.Transaction>;
	}

	export interface Header {
		creatorPubKey: string;
		difficulty: string;
		extra: string;
		parentHash: string;
		stateRoot: string;
		timestamp: string;
		totalDifficulty: string;
		transactionRoot: string;
	}

	export interface InvokeArgs {
		func: string;
		param: { [key: string]: Buffer };
	}

	export interface Transaction {
		fee?: string;
		from?: string;
		hash?: string;
		nonce?: number;
		senderPubKey?: string;
		sig?: string;
		timestamp?: number;
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

	enum TxStatus {
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
		connected: boolean;
		id: string;
		isAcquainted: boolean;
		isHardcoded: boolean;
		isInbound: boolean;
		lastSeen: string;
	}

	export interface Peer {
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

    enum TxType {
		Balance = 0x1,
		Alloc = 0x2,
	}
}

declare class PrivateKey {
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
    sign(data: Buffer): Buffer;
    /**
     * Returns an address derived from
     * the private key
     *
     * @returns {Address}
     * @memberof PrivateKey
     */
    toAddress(): Address;
    /**
     * Returns the public key.
     *
     * @returns {PublicKey}
     * @memberof PrivateKey
     */
    publicKey(): PublicKey;
    /**
     * Returns base58 encode string of the private key
     *
     * @returns {string}
     * @memberof PrivateKey
     */
    toBase58(): string;
    /**
     * Returns the private key as a buffer.
     * The base58 version is added as the 0th
     * byte in the returned buffer
     *
     * @returns {Buffer}
     * @memberof PrivateKey
     */
    toBuffer(): Buffer;
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
    static from(str: string): PrivateKey;
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
    static fromBuffer(buf: Buffer): PrivateKey;
}

declare class PublicKey {
    private pk;
    /**
     * Returns base58 encode string of the public key
     *
     * @returns {string}
     * @memberof PublicKey
     */
    toBase58(): string;
    /**
     * Returns the public key as a buffer.
     * The public key version is added as the 0th
     * byte in the returned buffer
     *
     * @returns {Buffer}
     * @memberof PublicKey
     */
    toBuffer(): Buffer;
    /**
     * Returns an address derived from
     * the public key
     *
     * @returns {Address}
     * @memberof PublicKey
     */
    toAddress(): Address;
    /**
     * Verify a signature
     *
     * @param {Buffer} msg The message that was signed
     * @param {Buffer} sig The message's signature
     * @returns {boolean}
     * @memberof PublicKey
     */
    verify(msg: Buffer, sig: Buffer): boolean;
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
    static fromBuffer(buf: Buffer): PublicKey;
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
    static from(str: string): PublicKey;
}

declare class Address {
    /**
     * The loaded address
     *
     * @private
     * @type {string}
     * @memberof Address
     */
    private address;
    /**
     * Check whether an address is valid
     *
     * @static
     * @param {string} address The address to check
     * @returns {boolean}
     * @memberof Address
     */
    static isValid(address: string): boolean;
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
    static getValidationError(address: string): null | Error;
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
    static from(address: string): Address;
    /**
     * Return a string format of the address
     *
     * @memberof Address
     */
    toString: () => string;
}


declare class TxBuilder {
    balance: TxBalanceBuilder;
    constructor(client: RPCClient);
}

declare class TxUtility {
    /**
     * Returns the byte equivalent of
     * a given transaction but does not
     * include the transaction `hash` and
     * `sig` fields
     *
     * @param {Spell.Transaction} tx The transaction
     * @returns {Buffer}
     * @memberof TxUtility
     */
    getBytesNoHashAndSig(tx: Spell.Transaction): Buffer;
    /**
     * Compute and return the hash of a transaction
     *
     * @param {Spell.Transaction} tx The transaction
     * @param {string} [prefix="0x"] Add a prefix to the hash
     * @returns {string}
     * @memberof TxUtility
     */
    hash(tx: Spell.Transaction, prefix?: string): string;
    /**
     * Sign and return a signature of the
     * transaction.
     *
     * @param {Spell.Transaction} tx The transaction
     * @param {PrivateKey} sk The private key to use for signing
     * @param {string} [prefix="0x"] A prefix to add to the signature
     * @returns {string} An hex string
     * @memberof TxUtility
     */
    sign(tx: Spell.Transaction, sk: PrivateKey, prefix?: string): string;
}

declare class TxBalanceBuilder extends TxUtility {
    /**
     * The transaction data
     *
     * @protected
     * @type {Transaction}
     * @memberof TxBalanceBuilder
     */
    protected data: Spell.Transaction;
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
    from(address: string | Address): TxBalanceBuilder;
    /**
     * Set the recipient address
     *
     * @param {string|Address} address The address
     * @returns {TxBalanceBuilder}
     * @memberof TxBalanceBuilder
     */
    to(address: string | Address): TxBalanceBuilder;
    /**
     * The next nonce of the sending account
     *
     * @param {number} n The next nonce of the sender
     * @returns {TxBalanceBuilder}
     * @memberof TxBalanceBuilder
     */
    nonce(num: number): TxBalanceBuilder;
    /**
     * Set the amount to send from the
     * sender to the recipient
     *
     * @param {string} value The amount to send
     * @returns {TxBalanceBuilder}
     * @memberof TxBalanceBuilder
     */
    value(value: string | Decimal): TxBalanceBuilder;
    /**
     * Set the fee to be paid for this
     * transaction
     *
     * @param {string} value The amount to pay as fee
     * @returns {TxBalanceBuilder}
     * @memberof TxBalanceBuilder
     */
    fee(fee: string | Decimal): TxBalanceBuilder;
    /**
     * Reset the transaction builder
     *
     * @memberof TxBalanceBuilder
     */
    reset(): void;
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
    /**
     * Returns the transaction data without sending
     * it to the network. It will finalize the transaction
     * if the sender's private key is provided.
     *
     * @param {PrivateKey} [sk] The senders private key
     * @memberof TxBalanceBuilder
     */
    payload(sk?: PrivateKey): Promise<Spell.Transaction>;
    /**
     * Send the transaction to the network
     *
     * @param {PrivateKey} sk The sender's private key
     * @returns {Promise<Spell.TxResult>}
     * @memberof TxBalanceBuilder
     */
    send(sk: PrivateKey): Promise<Spell.TxResult>;
    /**
     * Returns a base58 serialized version of the
     * transaction.
     *
     * @param {PrivateKey} sk The sender's private key
     * @returns {string}
     * @memberof TxBalanceBuilder
     */
    packed(sk: PrivateKey): Promise<string>;
}


declare class Namespace {
    protected client: RPCClient;
}

declare class RPCClient {
    /**
     * client references the JSON-RPC 2.0 client
     *
     * @type {JSONRPCCaller}
     * @memberof RPCClient
     */
    client?: Spell.JSONRPCCaller;
    /**
     * clientOpts contains the options to pass
     * to the client call request
     *
     * @public
     * @type {*}
     * @memberof RPCClient
     */
    clientOpts: any;
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
    constructor(client?: Spell.JSONRPCCaller);
    /**
     * Call a RPC method
     *
     * @param {string} method The RPC method full name
     * @param {*} params The method's parameters
     * @returns {Promise}
     * @memberof RPCClient
     */
    call(method: string, params: any): Promise<any>;
    /**
     * Set the session token
     *
     * @param {string} token
     * @memberof RPCClient
     */
    setToken(token: string): void;
}

declare class State extends Namespace {
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
     * @returns {Promise<Spell.Block>}
     * @memberof State
     */
    getBlock(num: number): Promise<Spell.Block>;
    /**
     * Get a block by block Hash
     *
     * @param {string} blockHash The hash of the block.
     * @returns {Promise<Spell.Block>}
     * @memberof State
     */
    getBlockByHash(blockHash: string): Promise<Spell.Block>;
    /**
     * Get the current difficulty and total difficulty
     * of the network.
     *
     * @returns
	 * @returns {Promise<Spell.Difficulty>}
     * @memberof State
     */
	getDifficulty(): Promise<Spell.Difficulty>;
    /**
     * Get all the account on the network
     *
     * @returns {Promise<Spell.Account[]>}
     * @memberof State
     */
    listAccounts(): Promise<Spell.Account[]>;
    /**
     * Get a list of re-organization events
     * that have occurred from the node's
     * perspective
     *
     * @returns {Promise<ReOrgInfo[]>}
     * @memberof State
     */
    getReOrgs(): Promise<Spell.ReOrgInfo[]>;
    /**
     * Get a list of top accounts on the network.
     *
     * @param {number} limit The maximum number of top accounts to return
     * @returns {Promise<Spell.Account[]>}
     * @memberof State
     */
    listTopAccounts(limit: number): Promise<Spell.Account[]>;
    /**
     * Get a specific account on the network
     *
     * @param {string} address The address of the accounts
     * @returns {Promise<Spell.Account>}
     * @memberof State
     */
    getAccount(address: string): Promise<Spell.Account>;
    /**
     * Get the nonce of a given address
     *
     * @param {string} address The address whose nonce will be fetched
     * @returns {Promise<number>}
     * @memberof State
     */
    getAccountNonce(address: string): Promise<number>;
    /**
     * Get a transaction by its hash
     *
     * @param {string} txHash The transaction's hash
     * @returns {Promise<Spell.Transaction>}
     * @memberof State
     */
    getTransaction(txHash: string): Promise<Spell.Transaction>;
    /**
     * Get all the known branches on the node
     *
     * @returns {Promise<Spell.Branches[]>}
     * @memberof State
     */
    getBranches(): Promise<Spell.Branches[]>;
    /**
     * Get orphan blocks on the node
     *
     * @returns {Promise<Spell.Block>}
     * @memberof State
     */
    getOrphans(): Promise<Spell.Block>;
    /**
     * Get the best chain on the node
     *
     * @returns {Promise<Spell.Chain>}
     * @memberof State
     */
    getBestChain(): Promise<Spell.Chain>;
    /**
     * Returns raw db objects (Debug only)
     *
     * @param {JSON} filter Filter parameters
     * @returns {Promise<any>}
     * @memberof State
     */
    getObjects(filter: JSON): Promise<any>;
}

declare class Node extends Namespace {
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
     * @returns {Promise<Spell.TxStatus>}
     * @memberof Node
     */
    getTransactionStatus(hash: string): Promise<Spell.TxStatus>;
    /**
     * Get the current status of the node
     * block synchronization session. Returns
     * null when the node is not syncing.
     *
     * @returns {Promise<Spell.SyncStat | null>}
     * @memberof Node
     */
    getSyncStat(): Promise<Spell.SyncStat | null>;
    /**
     * Check whether the node is currently
     * syncing blocks with a peer.
     *
     * @returns {Promise<boolean>}
     * @memberof Node
     */
    isSyncing(): Promise<boolean>;
    /**
     * Get information about the node
     *
     * @returns {Promise<Spell.NodeInfo>}
     * @memberof Node
     */
    info(): Promise<Spell.NodeInfo>;
    /**
     * Get the node's configurations
     *
     * @returns {Promise<Spell.NodeInfo>}
     * @memberof Node
     */
    config(): Promise<Spell.NodeConfig>;
    /**
     * Returns non-sensitive information about
     * a node.
     *
     * @returns {Promise<Spell.BasicNodeInfo>}
     * @memberof Node
     */
    basic(): Promise<Spell.BasicNodeInfo>;
}

declare class Auth extends Namespace {
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
    authenticate(username: string, password: string): Promise<string>;
}

declare class Pool extends Namespace {
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
	 * @returns {Promise<Spell.PoolSize>}
     * @extends {Namespace}
     */
	getSize(): Promise<Spell.PoolSize>;
    /**
     * Get all transactions in the pool
     *
     * @returns {Promise<any>}
     * @memberof Pool
     */
    getAll(): Promise<any>;
}

declare class Miner extends Namespace {
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
    start(): Promise<Boolean>;
    /**
     * Stop the miner on the node
     *
     * @returns {Promise<Boolean>}
     * @memberof Miner
     */
    stop(): Promise<Boolean>;
    /**
     * Check whether the miner has is running
     *
     * @returns {Promise<Boolean>}
     * @memberof Miner
     */
    isMining(): Promise<Boolean>;
    /**
     * Get the hashrate of the miner
     *
     * @returns {Promise<number>}
     * @memberof Miner
     */
    getHashrate(): Promise<number>;
    /**
     * Get the number of miner threads
     *
     * @returns {Promise<number>}
     * @memberof Miner
     */
    numThreads(): Promise<number>;
    /**
     * Set the number of miner threads
     * to run.
     *
     * @param {number} num
     * @returns {Promise<number>}
     * @memberof Miner
     */
    setThreads(num: number): Promise<number>;
}

declare class Net extends Namespace {
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
	 * @returns {Promise<Spell.ActivePeer[]>}
     * @memberof Net
     */
	getActivePeers(): Promise<Spell.ActivePeer[]>;
    /**
     * Get all the peers that the peers
     * that is known to the node.
     *
	 * @returns {Promise<Spell.Peer[]>}
     * @memberof Net
     */
	getPeers(): Promise<Spell.Peer[]>;
    /**
     * Get the peers that the node will
     * regularly broadcast messages to.
     *
     * @returns {Promise<any>}
     * @memberof Net
     */
    getBroadcasters(): Promise<any>;
    /**
     * Get the node's connection stats
     *
     * @returns {Promise<Spell.NetStat>}
     * @memberof Net
     */
    getStats(): Promise<Spell.NetStat>;
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
    addPeer(peerAddress: string): Promise<boolean>;
    /**
     * Delete all peers in memory and on disk
     *
     * @param {string} peerAddress
     * @returns {Promise<boolean>}
     * @memberof Net
     */
    dumpPeers(): Promise<boolean>;
    /**
     * Connect to one or more addresses
     * immediately
     *
     * @param {Array<string>} peerAddress array of addresses to be connected to
     * @returns {Promise<boolean>}
     * @memberof Net
     */
    join(peerAddress: Array<string>): Promise<boolean>;
    /**
     * Prevents inbound or outbound connections by
     * shutting down the client's network function.
     * @returns {Promise<boolean>}
     * @memberof Net
     */
    noNet(): Promise<boolean>;
}

declare class Ell extends Namespace {
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
     * @param {Spell.Transaction} txData The transaction's data
     * @returns {Promise<Spell.TxResult>}
     * @memberof Ell
     */
    send(txData: Spell.Transaction): Promise<Spell.TxResult>;
    /**
     * Returns the balance of an account
     * using the given address
     *
     * @param {string} address
     * @returns {Promise<string>}
     * @memberof Ell
     */
    getBalance(address: string): Promise<Decimal>;
    /**
     * Returns a balance transaction builder for
     * creating and executing balance transactions.
     *
     * @returns {TxBalanceBuilder}
     * @memberof Ell
     */
    balance(): TxBalanceBuilder;
    /**
     * Send a Base58 encoded transaction
     * to the node.
     *
     * @param {string} encodedTx
     * @returns {Promise<Spell.TxResult>}
     * @memberof Ell
     */
	sendRaw(encodedTx: string): Promise<Spell.TxResult>;
}

declare class Logger extends Namespace {
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
    debugLogger(): Promise<boolean>;
    /**
     * Set the logger to default logger
     *
     * @public
     * @returns {Promise<boolean>}
     * @memberof Logger
     */
    defaultLogger(): Promise<boolean>;
}


declare class RPC extends Namespace {
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
    stop(): Promise<boolean>;
    /**
     * Test JSON-RPC 2.0 service by sending
     * messages that are echoed back.
     *
     * @export
     * @class RPC
     * @extends {Namespace}
     */
    echo(params?: any | null): Promise<any>;
    /**
     * Get all JSON-RPC 2.0 methods
     * supported by the service
     *
     * @export
     * @class RPC
     * @extends {Namespace}
     */
    methods(): Promise<Spell.RpcMethod[]>;
}


