"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonrpc = require("yo-jsonrpc2");
var errors_1 = __importStar(require("./errors"));
var state_1 = __importDefault(require("./namespaces/state"));
var rpcclient_1 = __importDefault(require("./rpcclient"));
var node_1 = __importDefault(require("./namespaces/node"));
var auth_1 = __importDefault(require("./namespaces/auth"));
var pool_1 = __importDefault(require("./namespaces/pool"));
var miner_1 = __importDefault(require("./namespaces/miner"));
var net_1 = __importDefault(require("./namespaces/net"));
/**
 * Spell provides access to a client
 * RPC functionality.
 *
 * @export
 * @class Spell
 */
var Spell = /** @class */ (function () {
    /**
     * Creates an instance of Spell.
     * @memberof Spell
     */
    function Spell() {
        this.rpcClient = new rpcclient_1.default();
        this.state = new state_1.default(this.rpcClient);
        this.node = new node_1.default(this.rpcClient);
        this.auth = new auth_1.default(this.rpcClient);
        this.pool = new pool_1.default(this.rpcClient);
        this.miner = new miner_1.default(this.rpcClient);
        this.net = new net_1.default(this.rpcClient);
    }
    /**
     * provideClient attempts to connect to an
     * Ellcrys JSON-RPC server. If it succeeds,
     * it will use the connection in future RPC
     * method calls.
     */
    Spell.prototype.provideClient = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var client = jsonrpc.Client.$create(options.port, options.host);
            client.call("rpc_echo", "hi", options, function (err, res) {
                if (err) {
                    return reject(errors_1.default.ClientConnect);
                }
                _this.rpcClient.client = client;
                _this.rpcClient.clientOpts = options;
                // Attempt to request for a session token from the node
                // if username and password are provided
                if (options.username && options.password) {
                    _this.authenticate(options.username, options.password)
                        .then(function () {
                        return resolve(_this.rpcClient);
                    })
                        .catch(reject);
                    return;
                }
                return resolve(_this.rpcClient);
            });
        });
    };
    /**
     * Request for a session token from the node.
     *
     * @returns
     * @memberof Spell
     */
    Spell.prototype.authenticate = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth
                .authenticate(username, password)
                .then(function (token) {
                _this.rpcClient.setToken(token);
                return resolve(token);
            })
                .catch(function (err) {
                return reject(errors_1.wrapErr(errors_1.default.AuthError, err.message));
            });
        });
    };
    return Spell;
}());
exports.default = Spell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGliL3NwZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF3QztBQUN4QyxpREFBMkM7QUFDM0MsNkRBQXVDO0FBQ3ZDLDBEQUFvQztBQUNwQywyREFBcUM7QUFDckMsMkRBQXFDO0FBQ3JDLDJEQUFxQztBQUNyQyw2REFBdUM7QUFDdkMseURBQW1DO0FBQ25DOzs7Ozs7R0FNRztBQUNIO0lBeURDOzs7T0FHRztJQUNIO1FBQ0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSw2QkFBYSxHQUFwQixVQUFxQixPQUF1QjtRQUE1QyxpQkF5QkM7UUF4QkEsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBQyxHQUFRLEVBQUUsR0FBUTtnQkFDekQsSUFBSSxHQUFHLEVBQUU7b0JBQ1IsT0FBTyxNQUFNLENBQUMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDcEM7Z0JBRUQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUMvQixLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7Z0JBRXBDLHVEQUF1RDtnQkFDdkQsd0NBQXdDO2dCQUN4QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtvQkFDekMsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7eUJBQ25ELElBQUksQ0FBQzt3QkFDTCxPQUFPLE9BQU8sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2hCLE9BQU87aUJBQ1A7Z0JBRUQsT0FBTyxPQUFPLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw0QkFBWSxHQUFaLFVBQWEsUUFBZ0IsRUFBRSxRQUFnQjtRQUEvQyxpQkFZQztRQVhBLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNsQyxLQUFJLENBQUMsSUFBSTtpQkFDUCxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztpQkFDaEMsSUFBSSxDQUFDLFVBQUMsS0FBYTtnQkFDbkIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQyxHQUFVO2dCQUNqQixPQUFPLE1BQU0sQ0FBQyxnQkFBTyxDQUFDLGdCQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YsWUFBQztBQUFELENBQUMsQUEzSEQsSUEySEMifQ==