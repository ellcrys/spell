import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
import { describe } from "mocha";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Rpc", () => {
	let spell: Spell;
	let client: RPCClient;

	function makeClientStub(err: Error | null, resp: any) {
		return sinon.stub(client.client, "call" as never).callsArgWith(3, err, resp);
	}

	beforeEach((done) => {
		spell = new Spell();
		client = spell.rpcClient;
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

	describe("#stop", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.rpc.stop();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("rpc_stop", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(new Error("error stopping rpc"), 1234);
			spell.rpc.stop().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("rpc_stop", null);
				expect(err.message).to.be.eq("error stopping rpc");
				done();
			});
		});
	});

	describe("#echo", () => {
		const echoMessage: string = "Hi";
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.rpc.echo(echoMessage);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("rpc_echo", echoMessage);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(new Error("error testing echoing"), 1234);
			spell.rpc.echo(echoMessage).catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("rpc_echo", echoMessage);
				expect(err.message).to.be.eq("error testing echoing");
				done();
			});
		});
	});

	describe("#methods", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.rpc.methods();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("rpc_methods", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(new Error("error getting rpc methods"), 1234);
			spell.rpc.methods().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("rpc_methods", null);
				expect(err.message).to.be.eq("error getting rpc methods");
				done();
			});
		});
	});
});
