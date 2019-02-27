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
describe("#Node", function () {
    var spell;
    var client;
    function makeClientStub(err, resp) {
        return sinon
            .stub(client.client, "call")
            .callsArgWith(3, err, resp);
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
    describe("#getTransactionStatus", function () {
        it("should return 'unknown' when transaction hash is not known", function () { return __awaiter(_this, void 0, void 0, function () {
            var hash, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = "0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
                        mock = makeClientStub(null, { status: "unknown" });
                        return [4 /*yield*/, spell.node.getTransactionStatus(hash)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
                        expect(result).to.be.eq("unknown");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var hash, mock;
            return __generator(this, function (_a) {
                hash = "0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
                mock = makeClientStub(new Error("bad hash"), null);
                spell.node.getTransactionStatus(hash).catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
                    expect(err.message).to.be.eq("bad hash");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#getSyncStat", function () {
        it("should return sync state", function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = {
                            currentChainHeight: 100,
                            currentTotalDifficulty: 100,
                            progressPercent: 100,
                            targetChainHeight: 100,
                            targetTotalDifficulty: 22999999,
                        };
                        mock = makeClientStub(null, expected);
                        return [4 /*yield*/, spell.node.getSyncStat()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_getSyncStat", null);
                        expect(result).to.be.deep.eq(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.getSyncStat().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_getSyncStat", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#isSyncing", function () {
        it("should return sync status", function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = false;
                        mock = makeClientStub(null, expected);
                        return [4 /*yield*/, spell.node.isSyncing()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_isSyncing", null);
                        expect(result).to.be.deep.eq(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.isSyncing().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_isSyncing", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#info", function () {
        it("should call method", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, {});
                        return [4 /*yield*/, spell.node.info()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_info", null);
                        expect(result).to.be.deep.eq({});
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.info().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_info", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#config", function () {
        it("should call method", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, {});
                        return [4 /*yield*/, spell.node.config()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_config", null);
                        expect(result).to.be.deep.eq({});
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.config().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_config", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#basic", function () {
        it("should call method", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = makeClientStub(null, {});
                        return [4 /*yield*/, spell.node.basic()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_basic", null);
                        expect(result).to.be.deep.eq({});
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = makeClientStub(new Error("bad method"), null);
                spell.node.basic().catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("node_basic", null);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("#getTransactionFromPool", function () {
        var txHash = "0x48b9bff17fffe090e707bd90910f58bd";
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.node.getTransactionFromPool(txHash)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("node_getTransactionFromPool", txHash);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("unknown transaction"), 1234);
            spell.node.getTransactionFromPool(txHash).catch(function (err) {
                expect(err.message).to.be.eq("unknown transaction");
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("node_getTransactionFromPool", txHash);
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9uYW1lc3BhY2VzL25vZGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFvTUE7O0FBcE1BLDJCQUE4QjtBQUM5Qiw2QkFBZ0M7QUFDaEMsc0NBQXlDO0FBRXpDLDZEQUF1QztBQUV2QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFcEIsUUFBUSxDQUFDLE9BQU8sRUFBRTtJQUNqQixJQUFJLEtBQVksQ0FBQztJQUNqQixJQUFJLE1BQWlCLENBQUM7SUFFdEIsU0FBUyxjQUFjLENBQUMsR0FBaUIsRUFBRSxJQUFTO1FBQ25ELE9BQU8sS0FBSzthQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQWUsQ0FBQzthQUNwQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVSxDQUFDLFVBQUMsSUFBSTtRQUNmLEtBQUssR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1FBQ3BCLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxNQUFNLEdBQUc7WUFDZixJQUFJLEVBQUUsVUFDTCxNQUFjLEVBQ2QsTUFBVyxFQUNYLE1BQXNCLEVBQ3RCLEVBQThCO2dCQUU5QixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUM7U0FDRCxDQUFDO1FBQ0YsSUFBSSxFQUFFLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUNqQyxFQUFFLENBQUMsNERBQTRELEVBQUU7Ozs7O3dCQUMxRCxJ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