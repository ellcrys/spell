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
describe("#State", function () {
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
    describe("#getBlock", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var blockNumber, expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockNumber = 1;
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getBlock(blockNumber)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getBlock", blockNumber);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var blockNumber = 1;
            var mock = makeClientStub(new Error("block unknown"), 1234);
            spell.state.getBlock(blockNumber).catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getBlock", blockNumber);
                expect(err.message).to.be.eq("block unknown");
                done();
            });
        });
    });
    describe("#getBlockByHash", function () {
        var blockHash = "0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977be3970c2599c7a";
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getBlockByHash(blockHash)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getBlockByHash", blockHash);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("block unknown"), 1234);
            spell.state.getBlockByHash(blockHash).catch(function (err) {
                expect(err.message).to.be.eq("block unknown");
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getBlockByHash", blockHash);
                done();
            });
        });
    });
    describe("#getAccountNonce", function () {
        var address = "e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61";
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 789 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getAccountNonce(address)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getAccountNonce", address);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = "account not found";
            var mock = makeClientStub(new Error("account not found"), 1234);
            spell.state.getAccountNonce(address).catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getAccountNonce", address);
                expect(err.message).to.be.eq(expectedResult);
                done();
            });
        });
    });
    describe("#getAccount", function () {
        var address = "e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61";
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = {
                            header: {
                                address: "e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61",
                                balance: "50000.0000000000000",
                                nonce: 0,
                                type: 0,
                            },
                        };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getAccount(address)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getAccount", address);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("account not found"), 1234);
            spell.state.getAccount(address).catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getAccount", address);
                expect(err.message).to.be.eq("account not found");
                done();
            });
        });
    });
    describe("#getBestChain", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = {
                            header: {
                                height: "0x5f30",
                                id: "0x230c200a400b2e2b37",
                                timestamp: "0x15703a2f883ddd85",
                                totalDifficulty: "0x13ce7c2312e",
                            },
                        };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getBestChain()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getBestChain", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = {
                header: {
                    height: "0x000",
                    id: "0x230c200a400b2e2b37",
                    timestamp: "0x0000",
                    totalDifficulty: "0x0000",
                },
            };
            var mock = makeClientStub(null, expectedResult);
            spell.state.getBestChain().then(function (res) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getBestChain", null);
                expect(res.header.height).to.be.eq("0x000");
                expect(res.header.timestamp).to.be.eq("0x0000");
                expect(res.header.totalDifficulty).to.be.eq("0x0000");
                done();
            });
        });
    });
    describe("#getBranches", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = {
                            header: [
                                {
                                    height: "0x5f30",
                                    isBranch: "0x230c200a400b2e2b37",
                                },
                                {
                                    height: "0x5f30",
                                    isBranch: "0x230c200a400b2e2b37",
                                },
                            ],
                        };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getBranches()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getBranches", null);
                        expect(result.header.length).to.eq(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return empty result", function (done) {
            var expectedResult = {
                header: [],
            };
            var mock = makeClientStub(null, expectedResult);
            spell.state.getBranches().then(function (res) {
                expect(mock).to.have.been.calledWith("state_getBranches", null);
                expect(mock).to.have.been.callCount(1);
                expect(res.header.length).to.eq(0);
                done();
            });
        });
    });
    describe("#getDifficulty", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = {
                            header: {
                                difficulty: "0x25af650",
                                totalDifficulty: "0x13d06685d7b",
                            },
                        };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getDifficulty()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getDifficulty", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("invalid request"), 1234);
            spell.state.getDifficulty().catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getDifficulty", null);
                expect(err.message).to.be.eq("invalid request");
                done();
            });
        });
    });
    describe("#getOrphans", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getOrphans()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getOrphans", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.getOrphans().catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getOrphans", null);
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
    describe("#getReOrgs", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getReOrgs()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getReOrgs", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.getReOrgs().catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getReOrgs", null);
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
    describe("#getTransaction", function () {
        var txHash = "eoxjdjdjdnd";
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getTransaction(txHash)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getTransaction", txHash);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.getTransaction(txHash).catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getTransaction", txHash);
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
    describe("#listAccounts", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.listAccounts()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_listAccounts", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.listAccounts().catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_listAccounts", null);
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
    describe("#listTopAccounts", function () {
        var numOfResult = 2;
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.listTopAccounts(numOfResult)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_listTopAccounts", numOfResult);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.listTopAccounts(2).catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_listTopAccounts", numOfResult);
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
    describe("#getTipBlock", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getTipBlock()];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("state_getTipBlock", null);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.getTipBlock().catch(function (err) {
                expect(mock).to.have.been.callCount(1);
                expect(mock).to.have.been.calledWith("state_getTipBlock", null);
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L3VuaXQvbmFtZXNwYWNlcy9zdGF0ZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQTRaQTs7QUE1WkEsMkJBQThCO0FBQzlCLDZCQUFnQztBQUNoQyxzQ0FBeUM7QUFFekMsNkRBQXVDO0FBRXZDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVwQixRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2xCLElBQUksS0FBWSxDQUFDO0lBQ2pCLElBQUksTUFBaUIsQ0FBQztJQUV0QixTQUFTLGNBQWMsQ0FBQyxHQUFpQixFQUFFLElBQVM7UUFDbkQsT0FBTyxLQUFLO2FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBZSxDQUFDO2FBQ3BDLFlBQVksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxVQUFVLENBQUMsVUFBQyxJQUFJO1FBQ2YsS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7UUFDcEIsTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDekIsTUFBTSxDQUFDLE1BQU0sR0FBRztZQUNmLElBQUksRUFBRSxVQUNMLE1BQWMsRUFDZCxNQUFXLEVBQ1gsTUFBc0IsRUFDdEIsRUFBOEI7Z0JBRTlCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQztTQUNELENBQUM7UUFDRixJQUFJLEVBQUUsQ0FBQztJQUNSLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7O3dCQUN2QyxX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