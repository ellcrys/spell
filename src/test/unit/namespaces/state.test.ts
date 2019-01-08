import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const expect = chai.expect;
chai.use(sinonChai);

describe("#State", () => {

	let spell: Spell;
	let client: RPCClient;

	function makeClientStub(err: string, resp: any) {
		return sinon.stub(client.client, "call" as never).callsArgWith(1, err, resp);
	}

	beforeEach((done) => {
		spell = new Spell();
		client = spell.rpcClient
		client.client = {
			call: (option: HttpCallOption, cb: (err: any, res: any) => {}) => {
				cb(null, null);
			},
		}
		done();
	});

	it("should return result on successful call", async () => {
		const expectedResult = { header: { number: 1 } };
		const mock = makeClientStub("", { result: expectedResult });
		const result = await spell.state.getBlock(1);
		expect(mock).to.have.been.callCount(1);
		expect(result).to.be.deep.eq(expectedResult);
	});

	it("should return error and data when call returns an error", (done) => {
		const expectedResult = { header: { number: 1 } };
		const mock = makeClientStub("block unknown", 1234);
		spell.state.getBlock(1).catch((err) => {
			expect(err.message).to.be.eq("method returned an error -> block unknown");
			expect(err.data).to.eq(1234);
			done();
		});
	});
});
