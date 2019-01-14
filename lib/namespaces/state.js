"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var namespace_1 = __importDefault(require("./namespace"));
/**
 * Read the state of the Ellcrys blockchain
 * on a client.
 *
 * @export
 * @class State
 */
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    /**
     * Creates an instance of State.
     *
     * @param {RPCClient} client
     * @memberof State
     */
    function State(client) {
        var _this = _super.call(this) || this;
        _this.client = client;
        return _this;
    }
    /**
     * Get a block by number
     *
     * @param {number} num The block number/height
     * @returns {Promise<Block>}
     * @memberof State
     */
    State.prototype.getBlock = function (num) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getBlock", num)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get a block by block Hash
     *
     * @param {string} blockHash The hash of the block.
     * @returns {Promise<Block>}
     * @memberof State
     */
    State.prototype.getBlockByHash = function (blockHash) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getBlockByHash", blockHash)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get the current difficulty and total difficulty
     * of the network.
     *
     * @returns
     * @memberof State
     */
    State.prototype.getDifficulty = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getDifficulty", null)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get all the account on the network
     *
     * @returns {Promise<Account[]>}
     * @memberof State
     */
    State.prototype.listAccounts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_listAccounts", null)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get a list of re-organization events
     * that have occurred from the node's
     * perspective
     *
     * @returns {Promise<ReOrgInfo[]>}
     * @memberof State
     */
    State.prototype.getReOrgs = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getReOrgs", null)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get a list of top accounts on the network.
     *
     * @param {number} limit The maximum number of top accounts to return
     * @returns {Promise<Account[]>}
     * @memberof State
     */
    State.prototype.listTopAccounts = function (limit) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_listTopAccounts", limit)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get a specific account on the network
     *
     * @param {string} address The address of the accounts
     * @returns {Promise<Account>}
     * @memberof State
     */
    State.prototype.getAccount = function (address) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getAccount", address)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get the nonce of a given address
     *
     * @param {string} address The address whose nonce will be fetched
     * @returns {Promise<number>}
     * @memberof State
     */
    State.prototype.getAccountNonce = function (address) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getAccountNonce", address)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get a transaction by its hash
     *
     * @param {string} txHash The transaction's hash
     * @returns {Promise<Transaction>}
     * @memberof State
     */
    State.prototype.getTransaction = function (txHash) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getTransaction", txHash)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get all the known branches on the node
     *
     * @returns {Promise<Branches[]>}
     * @memberof State
     */
    State.prototype.getBranches = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getBranches", null)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get orphan blocks on the node
     *
     * @returns {Promise<Block>}
     * @memberof State
     */
    State.prototype.getOrphans = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getOrphans", null)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get the best chain on the node
     *
     * @returns {Promise<Chain>}
     * @memberof State
     */
    State.prototype.getBestChain = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getBestChain", null)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Returns raw db objects (Debug only)
     *
     * @param {JSON} filter Filter parameters
     * @returns {Promise<any>}
     * @memberof State
     */
    State.prototype.getObjects = function (filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getObjects", filter)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    return State;
}(namespace_1.default));
exports.default = State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL25hbWVzcGFjZXMvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQW9DO0FBRXBDOzs7Ozs7R0FNRztBQUNIO0lBQW1DLHlCQUFTO0lBQzNDOzs7OztPQUtHO0lBQ0gsZUFBWSxNQUFpQjtRQUE3QixZQUNDLGlCQUFPLFNBRVA7UUFEQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLHdCQUFRLEdBQWYsVUFBZ0IsR0FBVztRQUEzQixpQkFXQztRQVZBLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNsQyxLQUFJLENBQUMsTUFBTTtpQkFDVCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDO2lCQUMzQixJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNULE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNWLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksOEJBQWMsR0FBckIsVUFBc0IsU0FBaUI7UUFBdkMsaUJBV0M7UUFWQSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsS0FBSSxDQUFDLE1BQU07aUJBQ1QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FBQztpQkFDdkMsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDVCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBRztnQkFD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