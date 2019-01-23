"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var spell_1 = __importDefault(require("../../../lib/spell"));
var expect = chai.expect;
chai.use(sinonChai);
describe("#Auth", function () {
    var spell;
    var client;
    function makeClientStub(err, resp) {
        return sinon.stub(client.client, "call").callsArgWith(3, err, resp);
    }
    beforeEach(function (done) {
        spell = new spell_1.default();
        client = spell.rpcClient;
        client.client = {
            call: function (method, params, option, cb) {
                cb(null, null);
            },
        };
        done();
    });
    describe(".authenticate", function () {
        it("should return error when username or password are not set", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                spell.auth.authenticate("", "").catch(function (err) {
                    expect(err.message).to.be.eq("Username and password are required");
                });
                return [2 /*return*/];
            });
        }); });
        it("should return result when succeed", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(null, "token_abc");
                spell.auth.authenticate("user", "pass").then(function (token) {
                    expect(mock).to.have.been.callCount(1);
                    expect(token).to.be.eq("token_abc");
                });
                return [2 /*return*/];
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.auth.authenticate("user", "pass").catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9uYW1lc3BhY2VzL2F1dGgudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkF3REE7O0FBeERBLDJCQUE4QjtBQUM5Qiw2QkFBZ0M7QUFDaEMsc0NBQXlDO0FBRXpDLDZEQUF1QztBQUN2QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFcEIsUUFBUSxDQUFDLE9BQU8sRUFBRTtJQUNqQixJQUFJLEtBQVksQ0FBQztJQUNqQixJQUFJLE1BQWlCLENBQUM7SUFFdEIsU0FBUyxjQUFjLENBQUMsR0FBaUIsRUFBRSxJQUFTO1FBQ25ELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBQyxJQUFJO1FBQ2YsS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7UUFDcEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDekIsTUFBTSxDQUFDLE1BQU0sR0FBRztZQUNmLElBQUksRUFBRSxVQUNMLE1BQWMsRUFDZCxNQUFXLEVBQ1gsTUFBNEIsRUFDNUIsRUFBOEI7Z0JBRTlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQztTQUNELENBQUM7UUFDRixJQUFJLEVBQUUsQ0FBQztJQUNSLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN6QixFQUFFLENBQUMsMkRBQTJELEVBQUU7O2dCQUMvRCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztvQkFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsQ0FBQzs7O2FBQ0gsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG1DQUFtQyxFQUFFOzs7Z0JBQ2pDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSztvQkFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQzs7O2FBQ0gsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFOzs7Z0JBQy9DLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO29CQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQzs7O2FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9