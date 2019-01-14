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
var mocha_1 = require("mocha");
var expect = chai.expect;
chai.use(sinonChai);
mocha_1.describe("#State", function () {
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
    // it("should return result on successful call", async () => {
    // 	const expectedResult = { header: { number: 1 } };
    // 	const mock = makeClientStub(null, expectedResult);
    // 	const result = await spell.state.getBlock(1);
    // 	expect(mock).to.have.been.callCount(1);
    // 	expect(result).to.be.deep.eq(expectedResult);
    // });
    // it("should return error and data when call returns an error", (done) => {
    // 	const expectedResult = { header: { number: 1 } };
    // 	const mock = makeClientStub(new Error("block unknown"), 1234);
    // 	spell.state.getBlock(1).catch((err) => {
    // 		expect(err.message).to.be.eq("block unknown");
    // 		done();
    // 	});
    // });
    mocha_1.describe("#getBlock", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getBlock(1)];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = { header: { number: 1 } };
            var mock = makeClientStub(new Error("block unknown"), 1234);
            spell.state.getBlock(1).catch(function (err) {
                expect(err.message).to.be.eq("block unknown");
                done();
            });
        });
    });
    mocha_1.describe("#getBlockByHash", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getBlockByHash("0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977be3970c2599c7a")];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = "block unknown";
            makeClientStub(new Error("block unknown"), 1234);
            spell.state
                .getBlockByHash("0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977b")
                .catch(function (err) {
                expect(err.message).to.be.eq(expectedResult);
                done();
            });
        });
    });
    mocha_1.describe("#getAccountNonce", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 789 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getAccountNonce("e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61")];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = "account not found";
            makeClientStub(new Error("account not found"), 1234);
            spell.state
                .getAccountNonce("0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977b")
                .catch(function (err) {
                expect(err.message).to.be.eq(expectedResult);
                done();
            });
        });
    });
    mocha_1.describe("#getAccount", function () {
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
                        return [4 /*yield*/, spell.state.getAccount("e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61")];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = "account not found";
            makeClientStub(new Error("account not found"), 1234);
            spell.state
                .getAccount("0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977b")
                .catch(function (err) {
                expect(err.message).to.be.eq("account not found");
                done();
            });
        });
    });
    mocha_1.describe("#getBestChain", function () {
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
            makeClientStub(null, expectedResult);
            spell.state.getBestChain().then(function (res) {
                expect(res.header.height).to.be.eq("0x000");
                expect(res.header.timestamp).to.be.eq("0x0000");
                expect(res.header.totalDifficulty).to.be.eq("0x0000");
                done();
            });
        });
    });
    mocha_1.describe("#getBranches", function () {
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
                        expect(result.header.length).to.eq(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return empty result", function (done) {
            var expectedResult = {
                header: [],
            };
            makeClientStub(null, expectedResult);
            spell.state.getBranches().then(function (res) {
                expect(res.header.length).to.eq(0);
                done();
            });
        });
    });
    mocha_1.describe("#getDifficulty", function () {
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
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = { header: { number: 1 } };
            var mock = makeClientStub(new Error("invalid request"), 1234);
            spell.state.getDifficulty().catch(function (err) {
                expect(err.message).to.be.eq("invalid request");
                done();
            });
        });
    });
    mocha_1.describe("#getOrphans", function () {
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
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = { header: { number: 1 } };
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.getOrphans().catch(function (err) {
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
    mocha_1.describe("#getReOrgs", function () {
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
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = { header: { number: 1 } };
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.getReOrgs().catch(function (err) {
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
    mocha_1.describe("#getTransaction", function () {
        it("should return result on successful call", function () { return __awaiter(_this, void 0, void 0, function () {
            var expectedResult, mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedResult = { header: { number: 1 } };
                        mock = makeClientStub(null, expectedResult);
                        return [4 /*yield*/, spell.state.getTransaction("eoxjdjdjdnd")];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(result).to.be.deep.eq(expectedResult);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return error and data when call returns an error", function (done) {
            var expectedResult = { header: { number: 1 } };
            var mock = makeClientStub(new Error("error encountered"), 1234);
            spell.state.getTransaction("oxjdjdjdnd").catch(function (err) {
                expect(err.message).to.be.eq("error encountered");
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L3VuaXQvbmFtZXNwYWNlcy9zdGF0ZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQWtUQTs7QUFsVEEsMkJBQThCO0FBQzlCLDZCQUFnQztBQUNoQyxzQ0FBeUM7QUFFekMsNkRBQXVDO0FBQ3ZDLCtCQUFpQztBQUNqQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFcEIsZ0JBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDbEIsSUFBSSxLQUFZLENBQUM7SUFDakIsSUFBSSxNQUFpQixDQUFDO0lBRXRCLFNBQVMsY0FBYyxDQUFDLEdBQWlCLEVBQUUsSUFBUztRQUNuRCxPQUFPLEtBQUs7YUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFlLENBQUM7YUFDcEMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUFDLElBQUk7UUFDZixLQUFLLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztRQUNwQixNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFVBQ0wsTUFBYyxFQUNkLE1BQVcsRUFDWCxNQUFzQixFQUN0QixFQUE4QjtnQkFFOUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDO1NBQ0QsQ0FBQztRQUNGLElBQUksRUFBRSxDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7SUFFSCw4REFBOEQ7SUFDOUQscURBQXFEO0lBQ3JELHNEQUFzRDtJQUN0RCxpREFBaUQ7SUFDakQsMkNBQTJDO0lBQzNDLGlEQUFpRDtJQUNqRCxNQUFNO0lBRU4sNEVBQTRFO0lBQzVFLHFEQUFxRDtJQUNyRCxrRUFBa0U7SUFDbEUsNENBQTRDO0lBQzVDLG1EQUFtRDtJQUNuRCxZQUFZO0lBQ1osT0FBTztJQUNQLE1BQU07SUFFTixnQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7O3dCQUN2QyxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDM0MsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7d0JBQ25DLHFCQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFBOzt3QkFBdEMsTUFBTSxHQUFHLFNBQTZCO3dCQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O2FBQzdDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxVQUFDLElBQUk7WUFDbEUsSUFBTSxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztnQkFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxnQkFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzNCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTs7Ozs7d0JBQ3ZDLGNBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUMzQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDbkMscUJBQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQzlDLG9FQUFvRSxDQUNwRSxFQUFBOzt3QkFGSyxNQUFNLEdBQUcsU0FFZDt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O2FBQzdDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxVQUFDLElBQUk7WUFDbEUsSUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLGNBQWMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRCxLQUFLLENBQUMsS0FBSztpQkFDVCxjQUFjLENBQ2QsdURBQXVELENBQ3ZEO2lCQUNBLEtBQUssQ0FBQyxVQUFDLEdBQUc7Z0JBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxnQkFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzVCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTs7Ozs7d0JBQ3ZDLGNBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO3dCQUM3QyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDbkMscUJBQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQy9DLG9DQUFvQyxDQUNwQyxFQUFBOzt3QkFGSyxNQUFNLEdBQUcsU0FFZDt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O2FBQzdDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxVQUFDLElBQUk7WUFDbEUsSUFBTSxjQUFjLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsY0FBYyxDQUFDLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLEtBQUs7aUJBQ1QsZUFBZSxDQUNmLHVEQUF1RCxDQUN2RDtpQkFDQSxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdDLElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0JBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdkIsRUFBRSxDQUFDLHlDQUF5QyxFQUFFOzs7Ozt3QkFDdkMsY0FBYyxHQUFHOzRCQUN0QixNQUFNLEVBQUU7Z0NBQ1AsT0FBTyxFQUFFLG9DQUFvQztnQ0FDN0MsT0FBTyxFQUFFLHFCQUFxQjtnQ0FDOUIsS0FBSyxFQUFFLENBQUM7Z0NBQ1IsSUFBSSxFQUFFLENBQUM7NkJBQ1A7eUJBQ0QsQ0FBQzt3QkFDSSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDbkMscUJBQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQzFDLG9DQUFvQyxDQUNwQyxFQUFBOzt3QkFGSyxNQUFNLEdBQUcsU0FFZDt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O2FBQzdDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxVQUFDLElBQUk7WUFDbEUsSUFBTSxjQUFjLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsY0FBYyxDQUFDLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLEtBQUs7aUJBQ1QsVUFBVSxDQUNWLHVEQUF1RCxDQUN2RDtpQkFDQSxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxnQkFBUSxDQUFDLGVBQWUsRUFBRTtRQUN6QixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7O3dCQUN2QyxjQUFjLEdBQUc7NEJBQ3RCLE1BQU0sRUFBRTtnQ0FDUCxNQUFNLEVBQUUsUUFBUTtnQ0FDaEIsRUFBRSxFQUFFLHNCQUFzQjtnQ0FDMUIsU0FBUyxFQUFFLG9CQUFvQjtnQ0FDL0IsZUFBZSxFQUFFLGVBQWU7NkJBQ2hDO3lCQUNELENBQUM7d0JBQ0ksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7d0JBQ25DLHFCQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUE7O3dCQUF6QyxNQUFNLEdBQUcsU0FBZ0M7d0JBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7YUFDN0MsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLFVBQUMsSUFBSTtZQUNsRSxJQUFNLGNBQWMsR0FBRztnQkFDdEIsTUFBTSxFQUFFO29CQUNQLE1BQU0sRUFBRSxPQUFPO29CQUNmLEVBQUUsRUFBRSxzQkFBc0I7b0JBQzFCLFNBQVMsRUFBRSxRQUFRO29CQUNuQixlQUFlLEVBQUUsUUFBUTtpQkFDekI7YUFDRCxDQUFDO1lBRUYsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVyQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0JBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDeEIsRUFBRSxDQUFDLHlDQUF5QyxFQUFFOzs7Ozt3QkFDdkMsY0FBYyxHQUFHOzRCQUN0QixNQUFNLEVBQUU7Z0NBQ1A7b0NBQ0MsTUFBTSxFQUFFLFFBQVE7b0NBQ2hCLFFBQVEsRUFBRSxzQkFBc0I7aUNBQ2hDO2dDQUNEO29DQUNDLE1BQU0sRUFBRSxRQUFRO29DQUNoQixRQUFRLEVBQUUsc0JBQXNCO2lDQUNoQzs2QkFDRDt5QkFDRCxDQUFDO3dCQUNJLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO3dCQUM5QixxQkFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFBOzt3QkFBN0MsTUFBTSxHQUFRLFNBQStCO3dCQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O2FBQ3RDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxVQUFDLElBQUk7WUFDckMsSUFBTSxjQUFjLEdBQUc7Z0JBQ3RCLE1BQU0sRUFBRSxFQUFFO2FBQ1YsQ0FBQztZQUVGLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFckMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFRO2dCQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLEVBQUUsQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILGdCQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDMUIsRUFBRSxDQUFDLHlDQUF5QyxFQUFFOzs7Ozt3QkFDdkMsY0FBYyxHQUFHOzRCQUN0QixNQUFNLEVBQUU7Z0NBQ1AsVUFBVSxFQUFFLFdBQVc7Z0NBQ3ZCLGVBQWUsRUFBRSxlQUFlOzZCQUNoQzt5QkFDRCxDQUFDO3dCQUNJLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO3dCQUM5QixxQkFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBL0MsTUFBTSxHQUFRLFNBQWlDO3dCQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O2FBQzdDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxVQUFDLElBQUk7WUFDbEUsSUFBTSxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRSxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7Z0JBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxnQkFBUSxDQUFDLGFBQWEsRUFBRTtRQUN2QixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7O3dCQUN2QyxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFFM0MsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7d0JBQzlCLHFCQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUE7O3dCQUE1QyxNQUFNLEdBQVEsU0FBOEI7d0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7YUFDN0MsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLFVBQUMsSUFBSTtZQUNsRSxJQUFNLGNBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pELElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xFLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztnQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEVBQUUsQ0FBQztZQUNSLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILGdCQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3RCLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTs7Ozs7d0JBQ3ZDLGNBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUMzQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDOUIscUJBQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQTNDLE1BQU0sR0FBUSxTQUE2Qjt3QkFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7OzthQUM3QyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseURBQXlELEVBQUUsVUFBQyxJQUFJO1lBQ2xFLElBQU0sY0FBYyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakQsSUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEUsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xELElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsZ0JBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMzQixFQUFFLENBQUMseUNBQXlDLEVBQUU7Ozs7O3dCQUN2QyxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDM0MsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7d0JBQzlCLHFCQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFBOzt3QkFBN0QsTUFBTSxHQUFRLFNBQStDO3dCQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O2FBQzdDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxVQUFDLElBQUk7WUFDbEUsSUFBTSxjQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRSxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xELElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==