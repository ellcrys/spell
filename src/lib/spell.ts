import jsonrpc from "node-json-rpc2";
import rn from "random-number";
import errors, { wrapErr } from "./errors";
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
	public state: State;
	private rpcClient: RPCClient;

	constructor() {
		this.rpcClient = new RPCClient(null);
		this.state = new State(this.rpcClient);
	}

	/**
	 * provideClient attempts to connect to an
	 * Ellcrys JSON-RPC server. If it succeeds,
	 * it will use the connection in future RPC
	 * method calls.
	 */
	public provideClient(options: ConnectOptions) {
		return new Promise((resolve, reject) => {
			const client = new jsonrpc.Client({
				host: options.host,
				protocol: options.https ? "https" : "http",
				path: "/rpc",
				port: options.port,
			});

			client.call(
				{
					method: "rpc_echo",
					params: "hi",
					jsonrpc: "2.0",
					id: rn({ integer: true, min: 10000, max: 999999999999 }),
				},
				(err: any, res: any) => {
					if (err) {
						return reject(errors.ClientConnect);
					}
					this.rpcClient.client = client;
					return resolve(this.rpcClient);
				},
			);
		});
	}
}
