"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const random_number_1 = __importDefault(require("random-number"));
const errors_1 = __importStar(require("./errors"));
/**
 * RPCClient connects to given host and port
 * of an Ellcrys node.
 *
 * @export
 * @class RPCClient
 */
class RPCClient {
    /**
     * Creates an instance of RPCClient.
     *
     * @param {*} client The underlying JSON-RPC 2.0 client
     * @memberof RPCClient
     */
    constructor(client) {
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
    call(method, params) {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                return reject(errors_1.default.ClientNotInitialized);
            }
            this.client.call({
                method,
                params,
                jsonrpc: "2.0",
                id: random_number_1.default({ integer: true, min: 10000, max: 999999999999 }),
            }, (err, res) => {
                if (err) {
                    const customErr = errors_1.wrapErr(errors_1.default.RPCCallError, err);
                    customErr.data = JSON.parse(res);
                    return reject(customErr);
                }
                return resolve(res);
            });
        });
    }
}
exports.default = RPCClient;
