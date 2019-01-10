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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGliL3NwZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF3QztBQUN4QyxpREFBMkM7QUFDM0MsNkRBQXVDO0FBQ3ZDLDBEQUFvQztBQUNwQywyREFBcUM7QUFDckMsMkRBQXFDO0FBQ3JDLDJEQUFxQztBQUNyQyw2REFBdUM7QUFDdkM7Ozs7OztHQU1HO0FBQ0g7SUFpREM7OztPQUdHO0lBQ0g7UUFDQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDZCQUFhLEdBQXBCLFVBQXFCLE9BQXVCO1FBQTVDLGlCQXlCQztRQXhCQSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFDLEdBQVEsRUFBRSxHQUFRO2dCQUN6RCxJQUFJLEdBQUcsRUFBRTtvQkFDUixPQUFPLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUNwQztnQkFFRCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFFcEMsdURBQXVEO2dCQUN2RCx3Q0FBd0M7Z0JBQ3hDLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUN6QyxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQzt5QkFDbkQsSUFBSSxDQUFDO3dCQUNMLE9BQU8sT0FBTyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEMsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDaEIsT0FBTztpQkFDUDtnQkFFRCxPQUFPLE9BQU8sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDRCQUFZLEdBQVosVUFBYSxRQUFnQixFQUFFLFFBQWdCO1FBQS9DLGlCQVlDO1FBWEEsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLEtBQUksQ0FBQyxJQUFJO2lCQUNQLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2lCQUNoQyxJQUFJLENBQUMsVUFBQyxLQUFhO2dCQUNuQixLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFDLEdBQVU7Z0JBQ2pCLE9BQU8sTUFBTSxDQUFDLGdCQUFPLENBQUMsZ0JBQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRixZQUFDO0FBQUQsQ0FBQyxBQWxIRCxJQWtIQyJ9