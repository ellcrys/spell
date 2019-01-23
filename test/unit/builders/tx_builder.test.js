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
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var spell_1 = __importDefault(require("../../../lib/spell"));
var transaction_builder_1 = require("../../../lib/builders/transaction_builder");
var lib_1 = require("../../../lib");
var decimal_js_1 = __importDefault(require("decimal.js"));
var errors_1 = __importDefault(require("../../../lib/errors"));
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
        function WrappedTxBalanceBuilder(client) {
            return _super.call(this, client) || this;
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
        pk = lib_1.PrivateKey.from("wntaQsep5UAL3WAsThJx3jtJ2Ge79fjuzVvisKBhBrA4ps24ostkmKA9egwH3o7nUYxB37Kn9Ac23UEym8u81AmgUn6Zuq");
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
                    it("should throw UnknownSenderAccount error when sender account is not known", function () { return __awaiter(_this, void 0, void 0, function () {
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
                                    makeClientStub(null, {
                                        nonce: 2,
                                    });
                                    b = new WrappedTxBalanceBuilder(client);
                                    delete testTx.nonce;
                                    b.setData(testTx);
                                    return [4 /*yield*/, b.finalize(pk)];
                                case 1:
                                    hash = _a.sent();
                                    data = b.getData();
                                    expect(data.timestamp).to.not.be.undefined;
                                    expect(data.nonce).to.eq(3);
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
            it("should throw ClientNotInitialized error when client is not initialized", function (done) {
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
            it("should successfully return a valid base58 serialized version of the transaction", function () { return __awaiter(_this, void 0, void 0, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfYnVpbGRlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9idWlsZGVycy90eF9idWlsZGVyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXlSQTs7QUF6UkEsMkJBQThCO0FBQzlCLDZCQUFnQztBQUNoQyxzQ0FBeUM7QUFFekMsNkRBQXVDO0FBQ3ZDLGlGQUltRDtBQUNuRCxvQ0FBbUQ7QUFDbkQsMERBQWlDO0FBQ2pDLCtEQUF5QztBQUN6QyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtJQUMvQixJQUFJLEtBQVksQ0FBQztJQUNqQixJQUFJLE1BQWlCLENBQUM7SUFDdEIsSUFBSSxFQUFjLENBQUM7SUFDbkIsSUFBSSxNQUF5QixDQUFDO0lBRTlCLFNBQVMsY0FBYyxDQUFDLEdBQWlCLEVBQUUsSUFBUztRQUNuRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7UUFBc0MsMkNBQWdCO1FBQ3JELGlDQUFZLE1BQWtCO21CQUM3QixrQkFBTSxNQUFNLENBQUM7UUFDZCxDQUFDO1FBQ00sMkNBQVMsR0FBaEI7WUFDQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEIsQ0FBQztRQUNELHlDQUFPLEdBQVA7WUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbEIsQ0FBQztR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