"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const rpcclient_1 = __importDefault(require("../../lib/rpcclient"));
const expect = chai.expect;
chai.use(sinonChai);
describe("#RPCClient", () => {
    describe(".constructor", () => {
        it("should set member:client to undefined when initialized with no client", () => {
            const c = new rpcclient_1.default();
            expect(c.client).to.be.undefined;
        });
        it("should set member:client to the client argument passed", () => {
            const c = new rpcclient_1.default({
                call: (option, cb) => {
                    return null;
                },
            });
            expect(c.client).to.not.be.undefined;
        });
    });
    describe(".call", () => {
        it("should return error when JSON-RPC 2.0 client has not been set", () => {
            const c = new rpcclient_1.default();
            c.call("method", null).catch((err) => {
                expect(err).to.be.an.instanceOf(Error);
                expect(err.message).to.be.equal("RPC client not initialized");
            });
        });
        describe("with client", () => {
            let client;
            function makeClientStub(err, resp) {
                return sinon.stub(client.client, "call").callsArgWith(1, err, resp);
            }
            beforeEach((done) => {
                client = new rpcclient_1.default();
                client.client = {
                    call: (option, cb) => {
                        cb(null, null);
                    },
                };
                done();
            });
            it("should return error when rpc method call fails", (done) => {
                const mock = makeClientStub("bad thing", null);
                client.call("", {}).catch((err) => {
                    expect(err.message).to.eq("method returned an error -> bad thing");
                    done();
                });
            });
            it("should return successfully when rpc method call succeeds", (done) => {
                const mock = makeClientStub("", { result: 2 });
                client.call("", {}).then((res) => {
                    expect(res).to.deep.eq({ result: 2 });
                    done();
                });
            });
        });
    });
});
