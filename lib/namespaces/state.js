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
            _this.client.call("state_getBlock", num).then(function (res) {
                return resolve(res);
            }).catch(function (err) {
                return reject(err);
            });
        });
    };
    return State;
}(namespace_1.default));
exports.default = State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL25hbWVzcGFjZXMvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsMERBQW9DO0FBRXBDOzs7Ozs7R0FNRztBQUNIO0lBQW1DLHlCQUFTO0lBRTNDOzs7OztPQUtHO0lBQ0gsZUFBWSxNQUFpQjtRQUE3QixZQUNDLGlCQUFPLFNBRVA7UUFEQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLHdCQUFRLEdBQWYsVUFBZ0IsR0FBVztRQUEzQixpQkFRQztRQVBBLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNsQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNoRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNaLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YsWUFBQztBQUFELENBQUMsQUE3QkQsQ0FBbUMsbUJBQVMsR0E2QjNDIn0=