declare module 'flaverr';
declare module 'node-json-rpc2';
declare module 'yo-jsonrpc2';

interface HttpCallOption {
	method: string,
	params: any,
	jsonrpc: string,
	id: number
}

interface JSONRPCCaller {
	call(method: string, params: any, option: HttpCallOption, cb: (err: any, res: any) => {}): any;
}

interface ConnectOptions {
	host: string;
	port: number;
	https?: boolean;
	path?: string
}

interface Block {
	hash: string
	header: Header
	sig: string
	transactions: Array<Transaction>
}

interface Header {
	creatorPubKey: string
	difficulty: string
	extra: string
	parentHash: string
	stateRoot: string
	timestamp: string
	totalDifficulty: string
	transactionRoot: string
}

interface Transaction {
	fee: string
	from: string
	hash: string
	nonce: string
	senderPubKey: string
	sig: string
	timestamp: string
	to: string
	type: string
	value: string
}

declare enum TxStatus {
	Mined = "mined",
	Pooled = "pooled",
	Unknown = "unknown"
}

interface SyncState {
	currentChainHeight: number
	currentTotalDifficulty: number
	progressPercent: number
	targetChainHeight: number
	targetTotalDifficulty: number
}

interface NodeInfo {
	address: string
	id: string
	coinbase: string
	coinbasePublicKey: string
	listeningAddresses: string[]
	mode: string
	syncing: boolean
	netVersion: string
	buildVersion: string
	buildDate: string
	buildCommit: string
	goVersion: string
}
