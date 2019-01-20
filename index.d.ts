declare module "flaverr";
declare module "node-json-rpc2";
declare module "yo-jsonrpc2";
declare module "sha3";
declare module "ripemd160";
declare module "bs58check";
declare module "blake2";

interface HttpCallOption {
	method: string;
	params: any;
	jsonrpc: string;
	id: number;
}

interface JSONRPCCaller {
	call(
		method: string,
		params: any,
		option: HttpCallOption,
		cb: (err: any, res: any) => {},
	): any;
}

interface ConnectOptions {
	username?: string;
	password?: string;
	host: string;
	port: number;
	https?: boolean;
	path?: string;
}

interface Block {
	hash: string;
	header: Header;
	sig: string;
	transactions: Array<Transaction>;
}

interface Header {
	creatorPubKey: string;
	difficulty: string;
	extra: string;
	parentHash: string;
	stateRoot: string;
	timestamp: string;
	totalDifficulty: string;
	transactionRoot: string;
}

interface InvokeArgs {
	func: string;
	param: { [key: string]: Buffer };
}

interface Transaction {
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

interface Difficulty {
	difficulty: string;
	totalDifficulty: string;
}

interface Account {
	address: string;
	balance: string;
	nonce: number;
	type: number;
}

interface ReOrgInfo {
	branchID: string;
	branchLen: number;
	mainChainID: string;
	reOrgLen: 2;
	timestamp: number;
}

interface Branches {
	height: string;
	id: string;
	isBranch: boolean;
	length: string;
	parentBlockHash: string;
	parentBlockNumber: string;
	timestamp: string;
	totalDifficulty: string;
}

interface Chain {
	height: string;
	id: string;
	timestamp: string;
	totalDifficulty: string;
}

declare enum TxStatus {
	Mined = "mined",
	Pooled = "pooled",
	Unknown = "unknown",
}

interface SyncStat {
	currentChainHeight: number;
	currentTotalDifficulty: number;
	progressPercent: number;
	targetChainHeight: number;
	targetTotalDifficulty: number;
}

interface NodeInfo {
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

interface BasicNodeInfo {
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

interface NodeConfig {
	peer: PeerInfo;
	txPool: TxPoolInfo;
	rpc: RPCInfo;
}

interface PeerInfo {
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

interface TxPoolInfo {
	cap: number;
}

interface RPCInfo {
	disableAuth: boolean;
	username: string;
	password: string;
	sessionSecretKey: string;
}

interface PoolSize {
	byteSize: number;
	numTxs: number;
}

interface ActivePeer {
	connected: boolean;
	id: string;
	isAcquainted: boolean;
	isHardcoded: boolean;
	isInbound: boolean;
	lastSeen: string;
}

interface Peer {
	banEndTime: string;
	connected: boolean;
	id: string;
	isAcquainted: boolean;
	isBanned: boolean;
	isInbound: boolean;
	lastSeen: string;
}

interface NetStat {
	inbound: number;
	intros: number;
	outbound: number;
	total: number;
}

interface TxResult {
	id: string;
}

interface RpcMethod {
	description: string;
	name: string;
	private: boolean;
}

declare enum TxType {
	Balance = 0x1,
	Alloc = 0x2,
}
