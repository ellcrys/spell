import Namespace from "./namespace";
import RPCClient from "../rpcclient";
import { RpcMethod } from "../../..";

/**
 * RPC is responsible for calling
 * JSON-RPC 2.0 methods supported by
 * a remote node.
 *
 * @export
 * @class RPC
 * @extends {Namespace}
 */
export default class RPC extends Namespace {
	/**
	 * Creates an instance of RPC.
	 * @param {RPCClient} client
	 * @memberof RPC
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Stop the JSON-RPC 2.0 service
	 *
	 * @export
	 * @class RPC
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
	 * Test JSON-RPC 2.0 service by sending
	 * messages that are echoed back.
	 *
	 * @export
	 * @class RPC
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
	 * Get all JSON-RPC 2.0 methods
	 * supported by the service
	 *
	 * @returns {Promise<RpcMethod[]>}
	 * @memberof RPC
	 */
	public methods(): Promise<RpcMethod[]> {
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
