declare module "flaverr";
declare module "node-json-rpc2";

interface ConnectOptions {
	host: string;
	port: number;
	https?: boolean;
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

interface Transaction {
	fee: string;
	from: string;
	hash: string;
	nonce: string;
	senderPubKey: string;
	sig: string;
	timestamp: string;
	to: string;
	type: string;
	value: string;
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

interface Chain {
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

interface BestChain {
	height: string;
	id: string;
	timestamp: string;
	totalDifficulty: string;
}
