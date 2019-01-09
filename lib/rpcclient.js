"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __importDefault(require("./errors"));
/**
 * RPCClient connects to given host and port
 * of an Ellcrys node.
 *
 * @export
 * @class RPCClient
 */
var RPCClient = /** @class */ (function () {
    /**
     * Creates an instance of RPCClient.
     *
     * @param {*} client The underlying JSON-RPC 2.0 client
     * @memberof RPCClient
     */
    function RPCClient(client) {
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
    RPCClient.prototype.call = function (method, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.client) {
                return reject(errors_1.default.ClientNotInitialized);
            }
            _this.client.call(method, params, _this.clientOpts, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    };
    return RPCClient;
}());
exports.default = RPCClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYi9ycGNjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxvREFBMkM7QUFFM0M7Ozs7OztHQU1HO0FBQ0g7SUFvQkM7Ozs7O09BS0c7SUFDSCxtQkFBWSxNQUFzQjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLHdCQUFJLEdBQVgsVUFBWSxNQUFjLEVBQUUsTUFBVztRQUF2QyxpQkFjQztRQWJBLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUVsQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsT0FBTyxNQUFNLENBQUMsZ0JBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQzNDO1lBRUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBUSxFQUFFLEdBQVE7Z0JBQ3BFLElBQUksR0FBRyxFQUFFO29CQUNSLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtnQkFDRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQXJERCxJQXFEQyJ9