"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const namespace_1 = __importDefault(require("./namespace"));
/**
 * Read the state of the Ellcrys blockchain
 * on a client.
 *
 * @export
 * @class State
 */
class State extends namespace_1.default {
    /**
     * Creates an instance of State.
     *
     * @param {RPCClient} client
     * @memberof State
     */
    constructor(client) {
        super();
        this.client = client;
    }
    /**
     * Get a block by number
     *
     * @param {number} num The block number/height
     * @returns {Promise<Block>}
     * @memberof State
     */
    getBlock(num) {
        return new Promise((resolve, reject) => {
            this.client.call("state_getBlock", num).then((res) => {
                return resolve(res.result);
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}
exports.default = State;
