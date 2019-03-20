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
var decimal_js_1 = __importDefault(require("decimal.js"));
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var lib_1 = require("../../../lib");
var transaction_builder_1 = require("../../../lib/builders/transaction_builder");
var errors_1 = __importDefault(require("../../../lib/errors"));
var spell_1 = __importDefault(require("../../../lib/spell"));
var b58 = require("bs58check");
var expect = chai.expect;
chai.use(sinonChai);
describe("#TransactionBuilder", function () {
    var spell;
    var client;
    var pk;
    var testTx;
    function makeClientStub(err, resp) {
        return sinon.stub(client.client, "call").callsArgWith(3, err, resp);
    }
    var WrappedTxBalanceBuilder = /** @class */ (function (_super) {
        __extends(WrappedTxBalanceBuilder, _super);
        function WrappedTxBalanceBuilder(mClient) {
            return _super.call(this, mClient) || this;
        }
        WrappedTxBalanceBuilder.prototype.getClient = function () {
            return this.client;
        };
        WrappedTxBalanceBuilder.prototype.getData = function () {
            return this.data;
        };
        WrappedTxBalanceBuilder.prototype.setData = function (tx) {
            this.data = tx;
        };
        WrappedTxBalanceBuilder.prototype.finalize = function (sk) {
            return _super.prototype.finalize.call(this, sk);
        };
        return WrappedTxBalanceBuilder;
    }(transaction_builder_1.TxBalanceBuilder));
    beforeEach(function () {
        spell = new spell_1.default();
        client = spell.rpcClient;
        client.client = {
            call: function (method, params, option, cb) {
                cb(null, null);
            },
        };
        pk = lib_1.PrivateKey.from("wntaQsep5UAL3WAsThJx3jtJ2Ge79fjuzVvisKBhBrA4ps24o" +
            "stkmKA9egwH3o7nUYxB37Kn9Ac23UEym8u81AmgUn6Zuq");
        testTx = {
            from: "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW",
            to: "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW",
            type: 1,
            senderPubKey: pk.publicKey().toBase58(),
            value: "1",
            fee: "1",
            timestamp: 1547285790,
            nonce: 1,
        };
    });
    describe("TxBalanceBuilder", function () {
        describe(".constructor", function () {
            it("should set client", function () {
                var b = new WrappedTxBalanceBuilder(client);
                expect(b.getClient()).to.not.be.undefined;
            });
            it("should set type to 0x1", function () {
                var b = new WrappedTxBalanceBuilder(client);
                expect(b.getData().type).to.eql(0x1);
            });
        });
        describe(".from", function () {
            it("should set `from` field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW";
                b.from(data);
                expect(b.getData().from).to.eq(data);
            });
            specify("when Address is provided, it should set from field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = lib_1.Address.from("e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW");
                b.from(data.toString());
                expect(b.getData().from).to.eq(data.toString());
            });
        });
        describe(".to", function () {
            it("should set `to` field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW";
                b.to(data);
                expect(b.getData().to).to.eq(data);
            });
            specify("when Address is provided, it should set to field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = lib_1.Address.from("e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW");
                b.to(data.toString());
                expect(b.getData().to).to.eq(data.toString());
            });
        });
        describe(".nonce", function () {
            it("should set `nonce` field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = 10;
                b.nonce(data);
                expect(b.getData().nonce).to.eq(data);
            });
        });
        describe(".value", function () {
            it("should set `value` field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = "10.40";
                b.value(data);
                expect(b.getData().value).to.eq(data);
            });
            specify("when Decimal is provided, it should set `value` field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = new decimal_js_1.default("10.40");
                b.value(data);
                expect(b.getData().value).to.eq(data.toFixed(transaction_builder_1.NumDecimals));
            });
        });
        describe(".fee", function () {
            it("should set `fee` field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = "10.40";
                b.fee(data);
                expect(b.getData().fee).to.eq(data);
            });
            specify("when Decimal is provided, it should set `fee` field", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = new decimal_js_1.default("10.40");
                b.fee(data);
                expect(b.getData().fee).to.eq(data.toFixed(transaction_builder_1.NumDecimals));
            });
        });
        describe(".reset", function () {
            it("should set internal data to zero value (empty object)", function () {
                var b = new WrappedTxBalanceBuilder(client);
                var data = "10.40";
                b.fee(data);
                b.value(data);
                expect(b.getData().fee).to.eq(data);
                expect(b.getData().value).to.eq(data);
                b.reset();
                expect(b.getData()).to.be.empty;
            });
        });
        describe(".finalize", function () {
            it("should throw RequirePrivateKey error when private key is not provided", function () {
                var b = new WrappedTxBalanceBuilder(client);
                b.finalize().catch(function (e) {
                    expect(e).to.eq(errors_1.default.RequirePrivateKey);
                });
            });
            describe("when key is provided", function () {
                describe("when nonce field is not set", function () {
                    it("should throw ClientNotInitialized error when client is not initialized", function () {
                        var b = new WrappedTxBalanceBuilder();
                        delete testTx.nonce;
                        b.setData(testTx);
                        b.finalize(pk).catch(function (e) {
                            expect(e).to.eq(errors_1.default.ClientNotInitialized);
                        });
                    });
                    it("should throw UnknownSenderAccount error when sender " +
                        "account is not known", function () { return __awaiter(_this, void 0, void 0, function () {
                        var b;
                        return __generator(this, function (_a) {
                            b = new WrappedTxBalanceBuilder(client);
                            delete testTx.nonce;
                            b.setData(testTx);
                            makeClientStub({
                                data: "{ \"error\": { \"code\": 30001 }}",
                                statusCode: 400,
                            }, null);
                            b.finalize(pk).catch(function (e) {
                                expect(e).to.eq(errors_1.default.UnknownSenderAccount);
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    it("should successfully call finalize()", function () { return __awaiter(_this, void 0, void 0, function () {
                        var b, hash, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    makeClientStub(null, 2);
                                    b = new WrappedTxBalanceBuilder(client);
                                    delete testTx.nonce;
                                    b.setData(testTx);
                                    return [4 /*yield*/, b.finalize(pk)];
                                case 1:
                                    hash = _a.sent();
                                    data = b.getData();
                                    expect(data.timestamp).to.not.be.undefined;
                                    expect(data.nonce).to.eq(2);
                                    expect(data.hash).to.not.undefined;
                                    expect(data.sig).to.not.undefined;
                                    expect(data.hash).to.eq(hash);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            });
        });
        describe(".payload", function () {
            it("should return object", function () { return __awaiter(_this, void 0, void 0, function () {
                var b, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            b = new WrappedTxBalanceBuilder(client);
                            expect(b.getData().timestamp).to.be.undefined;
                            return [4 /*yield*/, b.payload()];
                        case 1:
                            data = _a.sent();
                            expect(data.timestamp).to.not.be.undefined;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe(".send", function () {
            it("should throw ClientNotInitialized error when client is" +
                " not initialized", function (done) {
                var b = new WrappedTxBalanceBuilder();
                b.setData(testTx);
                b.send(pk).catch(function (e) {
                    expect(e.message).to.equal(errors_1.default.ClientNotInitialized.message);
                    done();
                });
            });
            it("should successfully send signed transaction data", function () { return __awaiter(_this, void 0, void 0, function () {
                var b, mock, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            b = new WrappedTxBalanceBuilder(client);
                            b.setData(testTx);
                            mock = makeClientStub(null, {
                                id: "0x000",
                            });
                            return [4 /*yield*/, b.send(pk)];
                        case 1:
                            res = _a.sent();
                            expect(res.id).to.equal("0x000");
                            expect(mock).to.have.been.calledWith("ell_send", b.getData());
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe(".packed", function () {
            it("should successfully return a valid base58 serialized " +
                "version of the transaction", function () { return __awaiter(_this, void 0, void 0, function () {
                var b, res, decoded, tx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            b = new WrappedTxBalanceBuilder(client);
                            b.setData(testTx);
                            return [4 /*yield*/, b.packed(pk)];
                        case 1:
                            res = _a.sent();
                            decoded = b58.decode(res);
                            expect(decoded[0]).to.eql(transaction_builder_1.TxPayloadVersion[0]);
                            tx = JSON.parse(decoded.slice(1).toString());
                            expect(b.getData()).to.deep.eq(tx);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfYnVpbGRlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9idWlsZGVycy90eF9idWlsZGVyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXFTQTs7QUFyU0EsMkJBQThCO0FBQzlCLDBEQUFpQztBQUNqQyw2QkFBZ0M7QUFDaEMsc0NBQXlDO0FBRXpDLG9DQUFtRDtBQUNuRCxpRkFJbUQ7QUFDbkQsK0RBQXlDO0FBRXpDLDZEQUF1QztBQUN2QyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtJQUMvQixJQUFJLEtBQVksQ0FBQztJQUNqQixJQUFJLE1BQWlCLENBQUM7SUFDdEIsSUFBSSxFQUFjLENBQUM7SUFDbkIsSUFBSSxNQUFtQixDQUFDO0lBRXhCLFNBQVMsY0FBYyxDQUFDLEdBQWlCLEVBQUUsSUFBUztRQUNuRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7UUFBc0MsMkNBQWdCO1FBQ3JELGlDQUFZLE9BQW1CO21CQUM5QixrQkFBTSxPQUFPLENBQUM7UUFDZixDQUFDO1FBQ00sMkNBQVMsR0FBaEI7WUFDQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEIsQ0FBQztRQUNNLHlDQUFPLEdBQWQ7WUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbEIsQ0FBQztR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