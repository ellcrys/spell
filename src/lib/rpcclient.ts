import flaverr = require("flaverr");
import jsonrpc from "node-json-rpc2";
import rn from "random-number";
import errors, { wrapErr } from "./errors";

/**
 * RPCClient connects to given host and port
 * of an Ellcrys node.
 *
 * @export
 * @class RPCClient
 */
export default class RPCClient {
	// client references the JSON-RPC 2.0 client
	public client: any;

	/**
	 * Creates an instance of RPCClient.
	 *
	 * @param {*} client The underlying JSON-RPC 2.0 client
	 * @memberof RPCClient
	 */
	constructor(client: any) {
		this.client = client;
	}

	/**
	 * Call a RPC method
	 *
	 * @param {string} method The method full name
	 * @param {*} params The method's parameters
	 * @returns {Promise}
	 * @memberof RPCClient
	 */
	public call(method: string, params: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.client.call(
				{
					method,
					params,
					jsonrpc: "2.0",
					id: rn({ integer: true, min: 10000, max: 999999999999 }),
				},
				(err: any, res: any) => {
					if (err) {
						const customErr = wrapErr(errors.RPCCallError, err);
						(customErr as any).data = JSON.parse(res);
						return reject(customErr);
					}
					return resolve(res);
				},
			);
		});
	}
}
