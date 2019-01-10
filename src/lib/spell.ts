import jsonrpc = require("yo-jsonrpc2");
import rn from "random-number";
import errors, { wrapErr } from "./errors";
import State from "./namespaces/state";
import RPCClient from "./rpcclient";
import Node from "./namespaces/node";
import Auth from "./namespaces/auth";

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
	 * Authentication module
	 *
	 * @type {Auth}
	 * @memberof Spell
	 */
	public auth: Auth;

	/**
	 * Creates an instance of Spell.
	 * @memberof Spell
	 */
	constructor() {
		this.rpcClient = new RPCClient();
		this.state = new State(this.rpcClient);
		this.node = new Node(this.rpcClient);
		this.auth = new Auth(this.rpcClient);
	}

	/**
	 * provideClient attempts to connect to an
	 * Ellcrys JSON-RPC server. If it succeeds,
	 * it will use the connection in future RPC
	 * method calls.
	 */
	public provideClient(options: ConnectOptions) {
		return new Promise((resolve, reject) => {
			const client = jsonrpc.Client.$create(options.port, options.host);
			client.call("rpc_echo", "hi", options, (err: any, res: any) => {
				if (err) {
					return reject(errors.ClientConnect);
				}

				this.rpcClient.client = client;
				this.rpcClient.clientOpts = options;

				// Attempt to request for a session token from the node
				// if username and password are provided
				if (options.username && options.password) {
					this.authenticate(options.username, options.password)
						.then(() => {
							return resolve(this.rpcClient);
						})
						.catch(reject);
					return;
				}

				return resolve(this.rpcClient);
			});
		});
	}

	/**
	 * Request for a session token from the node.
	 *
	 * @returns
	 * @memberof Spell
	 */
	authenticate(username: string, password: string) {
		return new Promise((resolve, reject) => {
			this.auth
				.authenticate(username, password)
				.then((token: string) => {
					this.rpcClient.setToken(token);
					return resolve(token);
				})
				.catch((err) => {
					return reject(wrapErr(errors.AuthError, err.message));
				});
		});
	}
}
