"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhfYnVpbGRlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Rlc3QvdW5pdC9idWlsZGVycy90eF9idWlsZGVyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQTBSQTs7QUExUkEsMkJBQThCO0FBQzlCLDZCQUFnQztBQUNoQyxzQ0FBeUM7QUFFekMsNkRBQXVDO0FBQ3ZDLGlGQUltRDtBQUNuRCxvQ0FBbUQ7QUFDbkQsMERBQWlDO0FBQ2pDLCtEQUF5QztBQUV6QyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtJQUMvQixJQUFJLEtBQVksQ0FBQztJQUNqQixJQUFJLE1BQWlCLENBQUM7SUFDdEIsSUFBSSxFQUFjLENBQUM7SUFDbkIsSUFBSSxNQUFtQixDQUFDO0lBRXhCLFNBQVMsY0FBYyxDQUFDLEdBQWlCLEVBQUUsSUFBUztRQUNuRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7UUFBc0MsMkNBQWdCO1FBQ3JELGlDQUFZLE1BQWtCO21CQUM3QixrQkFBTSxNQUFNLENBQUM7UUFDZCxDQUFDO1FBQ00sMkNBQVMsR0FBaEI7WUFDQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEIsQ0FBQztRQUNELHlDQUFPLEdBQVA7WUFDQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbEIsQ0FBQztR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