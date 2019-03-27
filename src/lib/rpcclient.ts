/**
 * @module RPCClient
 */

import jwt = require("jsonwebtoken");
import moment = require("moment");
import request from "request";
import uuidv4 from "uuid/v4";
import { ConnectOptions, IClient } from "../..";
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
	 * @type {Client}
	 * @memberof RPCClient
	 */
	public client?: IClient;

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
	 * @param {Client} [client] The underlying JSON-RPC 2.0 client
	 * @memberof RPCClient
	 */
	constructor(client?: IClient) {
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
				const expUtc = moment.unix((decoded as any).payload.exp);
				if (expUtc.isBefore(moment().utc())) {
					return reject(errors.SessionTokenExpired);
				}
			}

			// prettier-ignore
			this.client.bearerToken = this.token;
			this.client.call(
				method,
				params,
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

/**
 * Client handles connection, authentication and
 * invocation of methods of an RPC service
 *
 * @export
 * @class Client
 */
export class Client {
	/**
	 * Create a Client from the given options
	 *
	 * @static
	 * @param {ConnectOptions} opts
	 * @returns {Client}
	 * @memberof Client
	 */
	public static fromOptions(opts: ConnectOptions): Client {
		const c = new Client();
		c.opts = opts;
		return c;
	}

	/**
	 * Bearer token to use
	 *
	 * @type {string}
	 * @memberof Client
	 */
	public bearerToken: string = "";

	/**
	 * Connection options
	 *
	 * @private
	 * @type {ConnectOptions}
	 * @memberof Client
	 */
	private opts: ConnectOptions;

	/**
	 * Call an RPC method
	 *
	 * @param {string} method The method to be called
	 * @param {any} params The parameter to pass to the method
	 * @param {(err: any, result: any) => void} cb Callback to be invoked on success/failure
	 * @memberof Client
	 */
	public call(method: string, params: any, cb: (err: any, result: any) => void) {
		const id = uuidv4();
		const obj = this.makeRequest(method, id, params);
		const opts: request.Options = {
			uri: {
				hostname: this.opts.host,
				port: this.opts.port.toString(),
				protocol: this.opts.https ? "https:" : "http:",
				path: this.opts.path,
			},
			timeout: 15000,
			json: obj,
		};

		// Use bearer token if provided
		if (this.bearerToken) {
			opts.auth = {
				bearer: this.bearerToken,
			};
		}

		// prettier-ignore
		request.post(opts,
			(err, resp, body) => {
				if (err) {
					return cb(err, null);
				} else if (resp.statusCode !== 200) {
					const msg = JSON.stringify(resp.body);
					const customErr: any = new Error(msg);
					customErr.data = msg;
					customErr.statusCode = resp.statusCode;
					return cb(customErr, null);
				}
				return cb(null, body.result);
			},
		);
	}

	/**
	 * Create JSON-RPC 2.0 request
	 *
	 * @private
	 * @param {string} method
	 * @param {string} id
	 * @param {*} params
	 * @memberof Client
	 */
	private makeRequest(method: string, id: string, params: any) {
		return {
			jsonrpc: "2.0",
			id: id ? id : uuidv4(),
			method,
			params,
		};
	}
}
