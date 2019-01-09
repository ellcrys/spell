import jsonrpc = require("yo-jsonrpc2");
import rn from "random-number";
import errors, { wrapErr } from "./errors";
import State from "./namespaces/state";
import RPCClient from "./rpcclient";
import Node from "./namespaces/node";

/**
 * Spell provides access to a client
 * RPC functionality.
 *
 * @export
 * @class Spell
 */
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
	 * Creates an instance of Spell.
	 * @memberof Spell
	 */
	constructor() {
		this.rpcClient = new RPCClient();
		this.state = new State(this.rpcClient);
		this.node = new Node(this.rpcClient);
	}

	/**
	 * provideClient attempts to connect to an
	 * Ellcrys JSON-RPC server. If it succeeds,
	 * it will use the connection in future RPC
	 * method calls.
	 */
	public provideClient(options: ConnectOptions) {
		return new Promise((resolve, reject) => {
			const client = jsonrpc.Client.$create(options.port, options.host)
			client.call("rpc_echo", "hi", options, (err: any, res: any) => {
				if (err) { return reject(errors.ClientConnect); }
				this.rpcClient.client = client;
				this.rpcClient.clientOpts = options;
				return resolve(this.rpcClient);
			})
		});
	}
}
