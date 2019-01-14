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
var logger_1 = __importDefault(require("./namespaces/logger"));
var ell_1 = __importDefault(require("./namespaces/ell"));
var rpc_1 = __importDefault(require("./namespaces/rpc"));
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
        this.logger = new logger_1.default(this.rpcClient);
        this.ell = new ell_1.default(this.rpcClient);
        this.rpc = new rpc_1.default(this.rpcClient);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGliL3NwZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF3QztBQUN4QyxpREFBMkM7QUFDM0MsNkRBQXVDO0FBQ3ZDLDBEQUFvQztBQUNwQywyREFBcUM7QUFDckMsMkRBQXFDO0FBQ3JDLDJEQUFxQztBQUNyQyw2REFBdUM7QUFDdkMseURBQW1DO0FBQ25DLCtEQUF5QztBQUN6Qyx5REFBbUM7QUFDbkMseURBQW1DO0FBRW5DOzs7Ozs7R0FNRztBQUNIO0lBeUVDOzs7T0FHRztJQUNIO1FBQ0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZ0JBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksNkJBQWEsR0FBcEIsVUFBcUIsT0FBdUI7UUFBNUMsaUJBeUJDO1FBeEJBLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQUMsR0FBUSxFQUFFLEdBQVE7Z0JBQ3pELElBQUksR0FBRyxFQUFFO29CQUNSLE9BQU8sTUFBTSxDQUFDLGdCQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQ3BDO2dCQUVELEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO2dCQUVwQyx1REFBdUQ7Z0JBQ3ZELHdDQUF3QztnQkFDeEMsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7b0JBQ3pDLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDO3lCQUNuRCxJQUFJLENBQUM7d0JBQ0wsT0FBTyxPQUFPLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNoQyxDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQixPQUFPO2lCQUNQO2dCQUVELE9BQU8sT0FBTyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsNEJBQVksR0FBWixVQUFhLFFBQWdCLEVBQUUsUUFBZ0I7UUFBL0MsaUJBWUM7UUFYQSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsS0FBSSxDQUFDLElBQUk7aUJBQ1AsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7aUJBQ2hDLElBQUksQ0FBQyxVQUFDLEtBQWE7Z0JBQ25CLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBVTtnQkFDakIsT0FBTyxNQUFNLENBQUMsZ0JBQU8sQ0FBQyxnQkFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNGLFlBQUM7QUFBRCxDQUFDLEFBOUlELElBOElDIn0=