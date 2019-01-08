declare module 'flaverr';
declare module 'node-json-rpc2';

interface HttpCallOption {
	method: string,
	params: any,
	jsonrpc: string,
	id: number
}

interface JSONRPCCaller {
	call(option: HttpCallOption, cb: (err: any, res: any) => {}): any;
}

interface ConnectOptions {
	host: string;
	port: number;
	https?: boolean;
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

