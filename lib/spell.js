"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_rpc2_1 = __importDefault(require("node-json-rpc2"));
const random_number_1 = __importDefault(require("random-number"));
const errors_1 = __importDefault(require("./errors"));
const state_1 = __importDefault(require("./namespaces/state"));
const rpcclient_1 = __importDefault(require("./rpcclient"));
/**
 * Spell provides access to a client
 * RPC functionality.
 *
 * @export
 * @class Spell
 */
class Spell {
    constructor() {
        this.rpcClient = new rpcclient_1.default();
        this.state = new state_1.default(this.rpcClient);
    }
    /**
     * provideClient attempts to connect to an
     * Ellcrys JSON-RPC server. If it succeeds,
     * it will use the connection in future RPC
     * method calls.
     */
    provideClient(options) {
        return new Promise((resolve, reject) => {
            const client = new node_json_rpc2_1.default.Client({
                host: options.host,
                protocol: (options.https) ? "https" : "http",
                path: "/rpc",
                port: options.port,
            });
            client.call({
                method: "rpc_echo",
                params: "hi",
                jsonrpc: "2.0",
                id: random_number_1.default({ integer: true, min: 10000, max: 999999999999 }),
            }, (err, res) => {
                if (err) {
                    return reject(errors_1.default.ClientConnect);
                }
                this.rpcClient.client = client;
                return resolve(this.rpcClient);
            });
        });
    }
}
exports.default = Spell;
