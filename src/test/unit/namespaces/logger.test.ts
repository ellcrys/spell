import chai = require("chai");
import { describe } from "mocha";
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import { HttpCallOption } from "../../../..";
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Logger", () => {
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

	describe("#debugLogger", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.logger.debugLogger();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("logger_debug", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(new Error("error setting debug logger"), 1234);

			spell.logger.debugLogger().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("logger_debug", null);
				expect(err.message).to.be.eq("error setting debug logger");
				done();
			});
		});
	});

	describe("#debugLogger", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.logger.defaultLogger();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("logger_default", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(new Error("error setting default logger"), 1234);

			spell.logger.defaultLogger().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("logger_default", null);
				expect(err.message).to.be.eq("error setting default logger");
				done();
			});
		});
	});
});
