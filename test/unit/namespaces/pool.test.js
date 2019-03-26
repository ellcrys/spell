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
var mocha_1 = require("mocha");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var spell_1 = __importDefault(require("../../../lib/spell"));
var expect = chai.expect;
chai.use(sinonChai);
mocha_1.describe("#Pool", function () {
    var spell;
    var client;
    function stubClient(err, resp) {
        return sinon.stub(client.client, "call").callsArgWith(2, err, resp);
    }
    beforeEach(function (done) {
        spell = new spell_1.default();
        client = spell.rpcClient;
        client.client = {
            call: function (method, params, cb) {
                cb(null, null);
            },
        };
        done();
    });
    mocha_1.describe("#getSize", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = true;
                        mock = stubClient(null, expectedResult);
                        return [4 /*yield*/, spell.pool.getSize()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("pool_getSize", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = stubClient(new Error("error"), 1234);
            spell.pool.getSize().catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("pool_getSize", null);
                expect(err.message).to.be.eq("error");
                done();
            });
        });
    });
    mocha_1.describe("#getAll", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = [];
                        mock = stubClient(null, expectedResult);
                        return [4 /*yield*/, spell.pool.getAll()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("pool_getAll", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = stubClient(new Error("error"), 1234);
            spell.pool.getAll().catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("pool_getAll", null);
                expect(err.message).to.be.eq("error");
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9uYW1lc3BhY2VzL3Bvb2wudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkF3RUE7O0FBeEVBLDJCQUE4QjtBQUM5QiwrQkFBaUM7QUFDakMsNkJBQWdDO0FBQ2hDLHNDQUF5QztBQUV6Qyw2REFBdUM7QUFDdkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXBCLGdCQUFRLENBQUMsT0FBTyxFQUFFO0lBQ2pCLElBQUksS0FBWSxDQUFDO0lBQ2pCLElBQUksTUFBaUIsQ0FBQztJQUV0QixTQUFTLFVBQVUsQ0FBQyxHQUFpQixFQUFFLElBQVM7UUFDL0MsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUFDLElBQUk7UUFDZixLQUFLLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztRQUNwQixNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFVBQUMsTUFBYyxFQUFFLE1BQVcsRUFBRSxFQUE4QjtnQkFDakUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDO1NBQ0QsQ0FBQztRQUNGLElBQUksRUFBRSxDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7SUFFSCxnQkFBUSxDQUFDLFVBQVUsRUFBRTtRQUNwQixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7O3dCQUN2QyxjQUFjLEdBQVksSUFBSSxDQUFDO3dCQUMvQixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDL0IscUJBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQW5DLE1BQU0sR0FBRyxTQUEwQjt3QkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7YUFDN0MsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLFVBQUMsSUFBSTtZQUNsRSxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxnQkFBUSxDQUFDLFNBQVMsRUFBRTtRQUNuQixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7O3dCQUN2QyxjQUFjLEdBQVUsRUFBRSxDQUFDO3dCQUMzQixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDL0IscUJBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQWxDLE1BQU0sR0FBRyxTQUF5Qjt3QkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzFELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7YUFDN0MsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLFVBQUMsSUFBSTtZQUNsRSxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9