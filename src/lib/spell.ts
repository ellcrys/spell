/**
 * @module Spell
 */

const jsonrpc = require("yo-jsonrpc2");
import { ConnectOptions } from "../..";
import errors, { wrapErr } from "./errors";
import Auth from "./namespaces/auth";
import Ell from "./namespaces/ell";
import Logger from "./namespaces/logger";
import Miner from "./namespaces/miner";
import Net from "./namespaces/net";
import Node from "./namespaces/node";
import Pool from "./namespaces/pool";
import RPC from "./namespaces/rpc";
import State from "./namespaces/state";
import RPCClient from "./rpcclient";
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

	/* Ell module
	 *
	 * @type {Ell}
	 * @memberof Spell
	 */
	public ell: Ell;

	/**
	 * Logger Module
	 *
	 * @type {Logger}
	 * @memberof Spell
	 */
	public logger: Logger;

	/**
	 * RPC Module
	 *
	 * @type {RPC}
	 * @memberof Spell
	 */
	public rpc: RPC;

	/**
	 * Creates an instance of Spell.
	 * @memberof Spell
	 */
	constructor() {
		this.rpcClient = new RPCClient();
		this.state = new State(this.rpcClient);
		this.node = new Node(this.rpcClient);
		this.auth = new Auth(this.rpcClient);
		this.pool = new Pool(this.rpcClient);
		this.miner = new Miner(this.rpcClient);
		this.net = new Net(this.rpcClient);
		this.logger = new Logger(this.rpcClient);
		this.ell = new Ell(this.rpcClient);
		this.rpc = new RPC(this.rpcClient);
	}

	/**
	 * provideClient attempts to connect to an
	 * Ellcrys JSON-RPC server. If it succeeds,
	 * it will use the connection in future RPC
	 * method calls.
	 *
	 * @param {ConnectOptions} options The connection options
	 * @returns {Promise<RPCClient>} An initialized client
	 * @memberof Spell
	 */
	public provideClient(options: ConnectOptions): Promise<RPCClient> {
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
	 *
	 * @param {string} username The node's RPC username
	 * @param {string} password The node's RPC password
	 * @returns {Promise<string>} A session token
	 * @memberof Spell
	 */
	public authenticate(username: string, password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			this.auth
				.authenticate(username, password)
				.then((token: string) => {
					this.rpcClient.setToken(token);
					return resolve(token);
				})
				.catch((err: Error) => {
					return reject(wrapErr(errors.AuthError, err.message));
				});
		});
	}
}
