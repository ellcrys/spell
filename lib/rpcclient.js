"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __importDefault(require("./errors"));
var jwt = require("jsonwebtoken");
var moment = require("moment");
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
            // We can't make any call if client has not been initiated
            if (!_this.client) {
                return reject(errors_1.default.ClientNotInitialized);
            }
            // Add bearer token to the client option if available
            if (_this.token && _this.clientOpts) {
                // Decode the token to check whether it has expired.
                // If expired, return SessionTokenExpired error
                var decoded = jwt.decode(_this.token, { complete: true });
                var expUtc = moment(decoded.payload.exp).utc();
                if (expUtc.isBefore(moment().utc())) {
                    return reject(errors_1.default.SessionTokenExpired);
                }
                _this.clientOpts.bearerToken = _this.token;
            }
            _this.client.call(method, params, _this.clientOpts, function (err, res) {
                if (err) {
                    if (err.statusCode == 401) {
                        return reject(errors_1.default.AuthRequired);
                    }
                    return reject(err);
                }
                return resolve(res);
            });
        });
    };
    /**
     * Set the session token
     *
     * @param {string} token
     * @memberof RPCClient
     */
    RPCClient.prototype.setToken = function (token) {
        this.token = token;
    };
    return RPCClient;
}());
exports.default = RPCClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYi9ycGNjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBOEI7QUFDOUIsa0NBQXFDO0FBQ3JDLCtCQUFrQztBQUVsQzs7Ozs7O0dBTUc7QUFDSDtJQTZCQzs7Ozs7T0FLRztJQUNILG1CQUFZLE1BQXNCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksd0JBQUksR0FBWCxVQUFZLE1BQWMsRUFBRSxNQUFXO1FBQXZDLGlCQW1DQztRQWxDQSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDbEMsMERBQTBEO1lBQzFELElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNqQixPQUFPLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDM0M7WUFFRCxxREFBcUQ7WUFDckQsSUFBSSxLQUFJLENBQUMsS0FBSyxJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xDLG9EQUFvRDtnQkFDcEQsK0NBQStDO2dCQUMvQyxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFFLE9BQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzFELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO29CQUNwQyxPQUFPLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7aUJBQzFDO2dCQUVELEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUM7YUFDekM7WUFFRCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUksQ0FBQyxVQUFVLEVBQ2YsVUFBQyxHQUFRLEVBQUUsR0FBUTtnQkFDbEIsSUFBSSxHQUFHLEVBQUU7b0JBQ1IsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTt3QkFDMUIsT0FBTyxNQUFNLENBQUMsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDbkM7b0JBQ0QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25CO2dCQUNELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FDRCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCw0QkFBUSxHQUFSLFVBQVMsS0FBYTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBN0ZELElBNkZDIn0=