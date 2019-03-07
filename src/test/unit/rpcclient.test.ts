import chai = require("chai");
import jwt = require("jsonwebtoken");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import { HttpCallOption } from "../../..";
import RPCClient from "../../lib/rpcclient";
const expect = chai.expect;
chai.use(sinonChai);

describe("#RPCClient", () => {
	describe(".constructor", () => {
		it("should set member:client to undefined when initialized with no client", () => {
			const c = new RPCClient();
			expect(c.client).to.be.undefined;
		});

		it("should set member:client to the client argument passed", () => {
			const c = new RPCClient({
				call: (
					method: string,
					params: any,
					option: HttpCallOption,
					cb: (err: any, res: any) => {},
				): any => {
					return null;
				},
			});
			expect(c.client).to.not.be.undefined;
		});
	});

	describe(".call", () => {
		it("should return error when JSON-RPC 2.0 client has not been set", () => {
			const c = new RPCClient();
			c.call("method", null).catch((err) => {
				expect(err).to.be.an.instanceOf(Error);
				expect(err.message).to.be.equal("RPC client not initialized");
			});
		});

		describe("with client", () => {
			let client: RPCClient;

			function makeClientStub(err: Error | null, resp: any) {
				return sinon
					.stub(client.client, "call" as never)
					.callsArgWith(3, err, resp);
			}

			beforeEach((done) => {
				client = new RPCClient();
				client.client = {
					call: (
						method: string,
						params: any,
						option: HttpCallOption,
						cb: (err: any, res: any) => {},
					): any => {
						cb(null, null);
					},
				};
				done();
			});

			it("should return error when token expires", (done) => {
				const token = jwt.sign({}, "secret", { expiresIn: "-5h" });
				client.clientOpts = {};
				client.setToken(token);
				client.call("", {}).catch((err) => {
					expect(err.message).to.eq("Session token has expired");
					done();
				});
			});

			it("should return error when rpc method call fails", (done) => {
				makeClientStub(new Error("bad thing"), null);
				client.call("", {}).catch((err) => {
					expect(err.message).to.eq("bad thing");
					done();
				});
			});

			it("should return successfully when rpc method call succeeds", (done) => {
				makeClientStub(null, { result: 2 });
				client.call("", {}).then((res) => {
					expect(res).to.deep.eq({ result: 2 });
					done();
				});
			});
		});
	});
});
