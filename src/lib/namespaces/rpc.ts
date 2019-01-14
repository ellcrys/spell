import Namespace from "./namespace";
import RPCClient from "../rpcclient";

/**
 * Rpc gets the information about the Rpc operations
 *
 * @export
 * @class Rpc
 * @extends {Namespace}
 */
export default class Rpc extends Namespace {
	/**
	 * Creates an instance of Rpc.
	 * @param {RPCClient} client
	 * @memberof Rpc
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Start the JSON-RPC service
	 *
	 * @export
	 * @class Rpc
	 * @extends {Namespace}
	 */
	public start(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("rpc_start", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Stop the JSON-RPC service
	 *
	 * @export
	 * @class Rpc
	 * @extends {Namespace}
	 */
	public stop(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("rpc_stop", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Test JSON-RPC service for echo reply
	 *
	 * @export
	 * @class Rpc
	 * @extends {Namespace}
	 */
	public echo(params?: any | null): Promise<any> {
		return new Promise((resolve, reject) => {
			this.client
				.call("rpc_echo", params)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Get all JSON-RPC methods
	 *
	 * @export
	 * @class Rpc
	 * @extends {Namespace}
	 */
	public methods(): Promise<RpcMethod> {
		return new Promise((resolve, reject) => {
			this.client
				.call("rpc_methods", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
