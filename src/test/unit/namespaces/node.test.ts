import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Node", () => {
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

	describe(".getTransactionStatus", () => {
		it("should return 'unknown' when transaction hash is not known", async () => {
			const hash =
				"0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
			const mock = makeClientStub(null, { status: "unknown" });
			const result = await spell.node.getTransactionStatus(hash);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
			expect(result).to.be.eq("unknown");
		});

		it("should return 'error' when method returns error", async () => {
			const hash =
				"0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
			const mock = makeClientStub(new Error("bad hash"), null);
			spell.node.getTransactionStatus(hash).catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
				expect(err.message).to.be.eq("bad hash");
			});
		});
	});

	describe(".getSyncStat", () => {
		it("should return sync state", async () => {
			let expected = {
				currentChainHeight: 100,
				currentTotalDifficulty: 100,
				progressPercent: 100,
				targetChainHeight: 100,
				targetTotalDifficulty: 22999999,
			};
			const mock = makeClientStub(null, expected);
			const result = await spell.node.getSyncStat();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_getSyncStat", null);
			expect(result).to.be.deep.eq(expected);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = makeClientStub(new Error("bad method"), null);
			spell.node.getSyncStat().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_getSyncStat", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".isSyncing", () => {
		it("should return sync status", async () => {
			let expected = false;
			const mock = makeClientStub(null, expected);
			const result = await spell.node.isSyncing();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_isSyncing", null);
			expect(result).to.be.deep.eq(expected);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = makeClientStub(new Error("bad method"), null);
			spell.node.isSyncing().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_isSyncing", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".info", () => {
		it("should call method", async () => {
			const mock = makeClientStub(null, {});
			const result = await spell.node.info();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_info", null);
			expect(result).to.be.deep.eq({});
		});

		it("should return 'error' when method returns error", async () => {
			const mock = makeClientStub(new Error("bad method"), null);
			spell.node.info().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_info", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".config", () => {
		it("should call method", async () => {
			const mock = makeClientStub(null, {});
			const result = await spell.node.config();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_config", null);
			expect(result).to.be.deep.eq({});
		});

		it("should return 'error' when method returns error", async () => {
			const mock = makeClientStub(new Error("bad method"), null);
			spell.node.config().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_config", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});
});
