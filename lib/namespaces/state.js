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
     * Get the difficulty & totalDifficulty
     * of the Ellcrys blockchain protocol.
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
     * Get all the account on the Ellcrys blockchain
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
     * Get the ReOrg chains available on the Ellcrys protocol
     *
     * @returns {Promise<Chain[]>}
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
     * Get the Top n account on the Ellcrys Blockchain protocol
     *
     * @param {number} topNumber the total number of accounts to be
     * returned from the Ellcrys blockchain protocol
     *
     * @returns {Promise<Account[]>}
     * @memberof State
     */
    State.prototype.listTopAccounts = function (topNumber) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_listTopAccounts", topNumber)
                .then(function (res) {
                return resolve(res);
            })
                .catch(function (err) {
                return reject(err);
            });
        });
    };
    /**
     * Get a specific account on the Ellcrys Blockchain Protocol
     * based on the address specified
     *
     * @param {string} address is the address of an account to be returned
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
     * Get the nonce of a specific address on the
     * Ellcrys Blockchain protocol
     *
     * @param {string} address is the address of an account to be returned
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
     * Get a specific transaction on the Ellcrys Blockchain protocol
     *
     * @param {string} txHash is the hash of the transaction we want to get
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
     * Get all the branches available on the Ellcrys Blockchain protocol
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
     * gets the blocks that are considered as
     * orphan blocks on the Ellcrys network
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
     * get the best chain on the Ellcrys Blockchain protocol
     *
     * @returns {Promise<BestChain>}
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
     * getObjects returns the logs which is used for debugging on the Ellcrys network
     *
     * @param {JSON} jsonParameter is the parameter feed into the rpc method
     * @returns {Promise<any>}
     * @memberof State
     */
    State.prototype.getObjects = function (jsonParameter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client
                .call("state_getObjects", jsonParameter)
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