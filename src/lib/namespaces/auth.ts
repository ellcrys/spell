import jsonrpc from "node-json-rpc2";
import rn from "random-number";
import errors, { wrapErr } from "../errors";
import RPCClient from "../rpcclient";
import Namespace from "./namespace";

/**
 * Auth accesses information about an Elld client
 *
 * @export
 * @class Auth
 */
export default class Auth extends Namespace {
	/**
	 * Creates an instance of Auth.
	 *
	 * @param {RPCClient} client
	 * @memberof Auth
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Retrieve a session token from
	 * the node.
	 *
	 * @param {string} username The RPC username
	 * @param {string} password The RPC password
	 * @memberof Auth
	 * @returns {Promise<string>} The session token
	 */
	authenticate(username: string, password: string): Promise<string> {
		return new Promise((resolve, reject) => {
			if (!username || !password) {
				return reject(new Error("Username and password are required"));
			}

			this.client
				.call("admin_auth", { username, password })
				.then((token) => {
					return resolve(token);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
