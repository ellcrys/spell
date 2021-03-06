/**
 * @module Logger
 */
import RPCClient from "../rpcclient";
import Namespace from "./namespace";

/**
 * Manage the logger activities
 *
 * @export
 * @class Logger
 * @extends {Namespace}
 */
export default class Logger extends Namespace {
	/**
	 * Creates an instance of Logger.
	 * @param {RPCClient} client
	 * @memberof Logger
	 */
	constructor(client: RPCClient) {
		super();
		this.client = client;
	}

	/**
	 * Set the log level to DEBUG.
	 *
	 * @public
	 * @returns {Promise<boolean>}
	 * @memberof Logger
	 */
	public debugLogger(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("logger_debug", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Set the logger to default logger
	 *
	 * @public
	 * @returns {Promise<boolean>}
	 * @memberof Logger
	 */
	public defaultLogger(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.client
				.call("logger_default", null)
				.then((res) => {
					return resolve(res);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
