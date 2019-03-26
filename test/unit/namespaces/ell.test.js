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
var decimal_js_1 = __importDefault(require("decimal.js"));
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var lib_1 = require("../../../lib");
var transaction_builder_1 = require("../../../lib/builders/transaction_builder");
var spell_1 = __importDefault(require("../../../lib/spell"));
var expect = chai.expect;
chai.use(sinonChai);
describe("#Ell", function () {
    var spell;
    var client;
    var pk;
    var testTx;
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
        pk = lib_1.PrivateKey.from("wntaQsep5UAL3WAsThJx3jtJ2Ge79fjuzVvisKBhBrA4ps24ostkmKA9egw" +
            "H3o7nUYxB37Kn9Ac23UEym8u81AmgUn6Zuq");
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
        done();
    });
    describe(".send", function () {
        it("should call method ell_send", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = stubClient(null, {});
                        return [4 /*yield*/, spell.ell.send(testTx)];
                    case 1:
                        _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("ell_send", testTx);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = stubClient(new Error("bad method"), null);
                spell.ell.send(testTx).catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("ell_send", testTx);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe(".send", function () {
        it("should call method ell_getBalance and return Decimal", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = stubClient(null, "10.20");
                        return [4 /*yield*/, spell.ell.getBalance(pk.toAddress().toString())];
                    case 1:
                        result = _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("ell_getBalance", pk.toAddress().toString());
                        expect(result).to.be.an.instanceOf(decimal_js_1.default);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = stubClient(new Error("bad method"), null);
                spell.ell.getBalance(pk.toAddress().toString()).catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("ell_getBalance", pk.toAddress().toString());
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe(".balance", function () {
        it("should return an instance of TxBalanceBuilder", function () {
            expect(spell.ell.balance()).to.be.an.instanceOf(transaction_builder_1.TxBalanceBuilder);
        });
    });
    describe(".sendRaw", function () {
        var encodedTx = "0xdsdhdjd";
        it("should call method ell_send", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mock = stubClient(null, "111");
                        return [4 /*yield*/, spell.ell.sendRaw(encodedTx)];
                    case 1:
                        _a.sent();
                        expect(mock).to.have.been.callCount(1);
                        expect(mock).to.have.been.calledWith("ell_sendRaw", encodedTx);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should return 'error' when method returns error", function () { return __awaiter(_this, void 0, void 0, function () {
            var mock;
            return __generator(this, function (_a) {
                mock = stubClient(new Error("bad method"), null);
                spell.ell.sendRaw(encodedTx).catch(function (err) {
                    expect(mock).to.have.been.callCount(1);
                    expect(mock).to.have.been.calledWith("ell_sendRaw", encodedTx);
                    expect(err.message).to.be.eq("bad method");
                });
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxsLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdC91bml0L25hbWVzcGFjZXMvZWxsLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBcUhBOztBQXJIQSwyQkFBOEI7QUFDOUIsMERBQWlDO0FBQ2pDLDZCQUFnQztBQUNoQyxzQ0FBeUM7QUFFekMsb0NBQTBDO0FBQzFDLGlGQUE2RTtBQUU3RSw2REFBdUM7QUFDdkMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRXBCLFFBQVEsQ0FBQyxNQUFNLEVBQUU7SUFDaEIsSUFBSSxLQUFZLENBQUM7SUFDakIsSUFBSSxNQUFpQixDQUFDO0lBQ3RCLElBQUksRUFBYyxDQUFDO0lBQ25CLElBQUksTUFBbUIsQ0FBQztJQUV4QixTQUFTLFVBQVUsQ0FBQyxHQUFpQixFQUFFLElBQVM7UUFDL0MsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUFDLElBQUk7UUFDZixLQUFLLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztRQUNwQixNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHO1lBQ2YsSUFBSSxFQUFFLFVBQUMsTUFBYyxFQUFFLE1BQVcsRUFBRSxFQUE4QjtnQkFDakUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDO1NBQ0QsQ0FBQztRQUVGLEVBQUUsR0FBRyxnQkFBVSxDQUFDLElBQUksQ0FDbkIsNkRB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