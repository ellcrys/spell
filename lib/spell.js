"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonrpc = require("yo-jsonrpc2");
var errors_1 = __importDefault(require("./errors"));
var state_1 = __importDefault(require("./namespaces/state"));
var rpcclient_1 = __importDefault(require("./rpcclient"));
var node_1 = __importDefault(require("./namespaces/node"));
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
                return resolve(_this.rpcClient);
            });
        });
    };
    return Spell;
}());
exports.default = Spell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbGliL3NwZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQXdDO0FBRXhDLG9EQUEyQztBQUMzQyw2REFBdUM7QUFDdkMsMERBQW9DO0FBQ3BDLDJEQUFxQztBQUVyQzs7Ozs7O0dBTUc7QUFDSDtJQTBCQzs7O09BR0c7SUFDSDtRQUNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksNkJBQWEsR0FBcEIsVUFBcUIsT0FBdUI7UUFBNUMsaUJBVUM7UUFUQSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFDLEdBQVEsRUFBRSxHQUFRO2dCQUN6RCxJQUFJLEdBQUcsRUFBRTtvQkFBRSxPQUFPLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUFFO2dCQUNqRCxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDcEMsT0FBTyxPQUFPLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YsWUFBQztBQUFELENBQUMsQUFyREQsSUFxREMifQ==