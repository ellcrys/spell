"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var jwt = require("jsonwebtoken");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var rpcclient_1 = __importDefault(require("../../lib/rpcclient"));
var expect = chai.expect;
chai.use(sinonChai);
describe("#RPCClient", function () {
    describe(".constructor", function () {
        it("should set member:client to undefined when initialized with no client", function () {
            var c = new rpcclient_1.default();
            expect(c.client).to.be.undefined;
        });
        it("should set member:client to the client argument passed", function () {
            var c = new rpcclient_1.default({
                call: function (method, params, option, cb) {
                    return null;
                },
            });
            expect(c.client).to.not.be.undefined;
        });
    });
    describe(".call", function () {
        it("should return error when JSON-RPC 2.0 client has not been set", function () {
            var c = new rpcclient_1.default();
            c.call("method", null).catch(function (err) {
                expect(err).to.be.an.instanceOf(Error);
                expect(err.message).to.be.equal("RPC client not initialized");
            });
        });
        describe("with client", function () {
            var client;
            function makeClientStub(err, resp) {
                return sinon
                    .stub(client.client, "call")
                    .callsArgWith(3, err, resp);
            }
            beforeEach(function (done) {
                client = new rpcclient_1.default();
                client.client = {
                    call: function (method, params, option, cb) {
                        cb(null, null);
                    },
                };
                done();
            });
            it("should return error when token expires", function (done) {
                var token = jwt.sign({}, "secret", { expiresIn: "-5h" });
                client.clientOpts = {};
                client.setToken(token);
                client.call("", {}).catch(function (err) {
                    expect(err.message).to.eq("Session token has expired");
                    done();
                });
            });
            it("should return error when rpc method call fails", function (done) {
                makeClientStub(new Error("bad thing"), null);
                client.call("", {}).catch(function (err) {
                    expect(err.message).to.eq("bad thing");
                    done();
                });
            });
            it("should return successfully when rpc method call succeeds", function (done) {
                makeClientStub(null, { result: 2 });
                client.call("", {}).then(function (res) {
                    expect(res).to.deep.eq({ result: 2 });
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjY2xpZW50LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC91bml0L3JwY2NsaWVudC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLGtDQUFxQztBQUNyQyw2QkFBZ0M7QUFDaEMsc0NBQXlDO0FBRXpDLGtFQUE0QztBQUM1QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFcEIsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUN0QixRQUFRLENBQUMsY0FBYyxFQUFFO1FBQ3hCLEVBQUUsQ0FBQyx1RUFBdUUsRUFBRTtZQUMzRSxJQUFNLENBQUMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztZQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO1lBQzVELElBQU0sQ0FBQyxHQUFHLElBQUksbUJBQVMsQ0FBQztnQkFDdkIsSUFBSSxFQUFFLFVBQ0wsTUFBYyxFQUNkLE1BQVcsRUFDWCxNQUFzQixFQUN0QixFQUE4QjtvQkFFOUIsT0FBTyxJQUFJLENBQUM7Z0JBQ2IsQ0FBQzthQUNELENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ2pCLEVBQUUsQ0FBQywrREFBK0QsRUFBRTtZQUNuRSxJQUFNLENBQUMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUMs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