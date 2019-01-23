import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
import { describe } from "mocha";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Miner", () => {
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
				option: Spell.HttpCallOption,
				cb: (err: any, res: any) => {},
			): any => {
				cb(null, null);
			},
		};
		done();
	});

	describe("#start", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.miner.start();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("miner_start", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(
				new Error("error starting miner"),
				1234,
			);
			spell.miner.start().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("miner_start", null);
				expect(err.message).to.be.eq("error starting miner");
				done();
			});
		});
	});

	describe("#stop", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.miner.stop();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("miner_stop", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(
				new Error("error stopping miner"),
				1234,
			);
			spell.miner.stop().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("miner_stop", null);
				expect(err.message).to.be.eq("error stopping miner");
				done();
			});
		});
	});

	describe("#isMining", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.miner.isMining();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("miner_isMining", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(
				new Error("error getting miner status"),
				1234,
			);
			spell.miner.isMining().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("miner_isMining", null);
				expect(err.message).to.be.eq("error getting miner status");
				done();
			});
		});
	});

	describe("#getHashrate", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.miner.getHashrate();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("miner_getHashrate", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(
				new Error("error getting miner hashrate"),
				1234,
			);
			spell.miner.getHashrate().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("miner_getHashrate", null);
				expect(err.message).to.be.eq("error getting miner hashrate");
				done();
			});
		});
	});

	describe("#numThreads", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.miner.numThreads();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("miner_numThreads", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(
				new Error("error getting miner threads"),
				1234,
			);
			spell.miner.numThreads().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("miner_numThreads", null);
				expect(err.message).to.be.eq("error getting miner threads");
				done();
			});
		});
	});

	describe("#setThreads", () => {
		const minerThreads: number = 2;
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.miner.setThreads(minerThreads);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith(
				"miner_setThreads",
				minerThreads,
			);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = makeClientStub(
				new Error("error setting miner threads"),
				1234,
			);
			spell.miner.setThreads(minerThreads).catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith(
					"miner_setThreads",
					minerThreads,
				);
				expect(err.message).to.be.eq("error setting miner threads");
				done();
			});
		});
	});
});
