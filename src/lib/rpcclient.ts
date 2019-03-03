/**
 * @module RPCClient
 */

import jwt = require("jsonwebtoken");
import moment = require("moment");
import { JSONRPCCaller } from "../..";
import errors from "./errors";

/**
 * RPCClient connects to given host and port
 * of an Ellcrys node.
 *
 * @export
 * @class RPCClient
 */
export default class RPCClient {
	/**
	 * client references the JSON-RPC 2.0 client
	 *
	 * @type {JSONRPCCaller}
	 * @memberof RPCClient
	 */
	public client?: JSONRPCCaller;

	/**
	 * clientOpts contains the options to pass
	 * to the client call request
	 *
	 * @public
	 * @type {*}
	 * @memberof RPCClient
	 */
	public clientOpts: any;

	/**
	 * The session token to access
	 * private endpoints
	 *
	 * @private
	 * @type {string}
	 * @memberof Spell
	 */
	private token: string;

	/**
	 * Creates an instance of RPCClient.
	 *
	 * @param {JSONRPCCaller} [client] The underlying JSON-RPC 2.0 client
	 * @memberof RPCClient
	 */
	constructor(client?: JSONRPCCaller) {
		this.client = client;
	}

	/**
	 * Call a RPC method
	 *
	 * @param {string} method The RPC method full name
	 * @param {*} params The method's parameters
	 * @returns {Promise}
	 * @memberof RPCClient
	 */
	public call(method: string, params: any): Promise<any> {
		return new Promise((resolve, reject) => {
			// We can't make any call if client has not been initiated
			if (!this.client) {
				return reject(errors.ClientNotInitialized);
			}

			// Add bearer token to the client option if available
			if (this.token && this.clientOpts) {
				// Decode the token to check whether it has expired.
				// If expired, return SessionTokenExpired error
				const decoded = jwt.decode(this.token, { complete: true });
				const expUtc = moment((decoded as any).payload.exp).utc();
				if (expUtc.isBefore(moment().utc())) {
					return reject(errors.SessionTokenExpired);
				}

				this.clientOpts.bearerToken = this.token;
			}

			this.client.call(
				method,
				params,
				this.clientOpts,
				(err: any, res: any): any => {
					if (err) {
						if (err.statusCode === 401) {
							return reject(errors.AuthRequired);
						}
						return reject(err);
					}
					return resolve(res);
				},
			);
		});
	}

	/**
	 * Set the session token
	 *
	 * @param {string} token
	 * @memberof RPCClient
	 */
	public setToken(token: string) {
		this.token = token;
	}
}
