import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
import { describe } from "mocha";
import { HttpCallOption } from "../../../..";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Pool", () => {
	let spell: Spell;
	let client: RPCClient;

	function makeClientStub(err: Error | null, resp: any) {
		return sinon
			.stub(client.client, "call" as never)
			.callsArgWith(3, err, resp);
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

	describe("#getSize", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.pool.getSize();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("pool_getSize", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(new Error("error"), 1234);

			spell.pool.getSize().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("pool_getSize", null);
				expect(err.message).to.be.eq("error");
				done();
			});
		});
	});

	describe("#getAll", () => {
		it("should return result on successful call", async () => {
			const expectedResult: Array<any> = [];
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.pool.getAll();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("pool_getAll", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(new Error("error"), 1234);

			spell.pool.getAll().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("pool_getAll", null);
				expect(err.message).to.be.eq("error");
				done();
			});
		});
	});
});
