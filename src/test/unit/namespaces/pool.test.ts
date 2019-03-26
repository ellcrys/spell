import chai = require("chai");
import { describe } from "mocha";
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Pool", () => {
	let spell: Spell;
	let client: RPCClient;

	function stubClient(err: Error | null, resp: any) {
		return sinon.stub(client.client, "call" as never).callsArgWith(2, err, resp);
	}

	beforeEach((done) => {
		spell = new Spell();
		client = spell.rpcClient;
		client.client = {
			call: (method: string, params: any, cb: (err: any, res: any) => {}): any => {
				cb(null, null);
			},
		};
		done();
	});

	describe("#getSize", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.pool.getSize();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("pool_getSize", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error"), 1234);

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
			const expectedResult: any[] = [];
			const mock = stubClient(null, expectedResult);
			const result = await spell.pool.getAll();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("pool_getAll", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error"), 1234);

			spell.pool.getAll().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("pool_getAll", null);
				expect(err.message).to.be.eq("error");
				done();
			});
		});
	});
});
