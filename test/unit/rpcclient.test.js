"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
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
                return sinon.stub(client.client, "call").callsArgWith(3, err, resp);
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
            it("should return error when rpc method call fails", function (done) {
                var mock = makeClientStub(new Error("bad thing"), null);
                client.call("", {}).catch(function (err) {
                    expect(err.message).to.eq("bad thing");
                    done();
                });
            });
            it("should return successfully when rpc method call succeeds", function (done) {
                var mock = makeClientStub("", { result: 2 });
                client.call("", {}).then(function (res) {
                    expect(res).to.deep.eq({ result: 2 });
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjY2xpZW50LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC91bml0L3JwY2NsaWVudC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLDZCQUFnQztBQUNoQyxzQ0FBeUM7QUFDekMsa0VBQTRDO0FBRTVDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVwQixRQUFRLENBQUMsWUFBWSxFQUFFO0lBRXRCLFFBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDeEIsRUFBRSxDQUFDLHVFQUF1RSxFQUFFO1lBQzNFLElBQU0sQ0FBQyxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsd0RBQXdELEVBQUU7WUFDNUQsSUFBTSxDQUFDLEdBQUcsSUFBSSxtQkFBUyxDQUFDO2dCQUN2QixJQUFJLEVBQUUsVUFBQyxNQUFjLEVBQUUsTUFBVyxFQUFFLE1BQXNCLEVBQUUsRUFBOEI7b0JBQ3pGLE9BQU8sSUFBSSxDQUFDO2dCQUNiLENBQUM7YUFDRCxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUVqQixFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDbkUsSUFBTSxDQUFDLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztnQkFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksTUFBaUIsQ0FBQztZQUV0QixTQUFTLGNBQWMsQ0FBQyxHQUFVLEVBQUUsSUFBUztnQkFDNUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUUsQ0FBQztZQUVELFVBQVUsQ0FBQyxVQUFDLElBQUk7Z0JBQ2YsTUFBTSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO2dCQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHO29CQUNmLElBQUksRUFBRSxVQUFDLE1BQWMsRUFBRSxNQUFXLEVBQUUsTUFBc0IsRUFBRSxFQUE4Qjt3QkFDekYsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDaEIsQ0FBQztpQkFDRCxDQUFBO2dCQUNELElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7WUFHSCxFQUFFLENBQUMsZ0RBQWdELEVBQUUsVUFBQyxJQUFJO2dCQUN6RCxJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7b0JBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQTtZQUVGLEVBQUUsQ0FBQywwREFBMEQsRUFBRSxVQUFDLElBQUk7Z0JBQ25FLElBQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztvQkFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2dCQUNSLENBQUMsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==