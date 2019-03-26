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

	describe("#getTransactionStatus", () => {
		it("should return 'unknown' when transaction hash is not known", async () => {
			const hash =
				"0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
			const mock = stubClient(null, { status: "unknown" });
			const result = await spell.node.getTransactionStatus(hash);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
			expect(result).to.be.eq("unknown");
		});

		it("should return 'error' when method returns error", async () => {
			const hash =
				"0xe89d14674e80cd612c597b486279ba1c5599db5acce327305b2b73c4565440fd";
			const mock = stubClient(new Error("bad hash"), null);
			spell.node.getTransactionStatus(hash).catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_getTransactionStatus", hash);
				expect(err.message).to.be.eq("bad hash");
			});
		});
	});

	describe("#getSyncStat", () => {
		it("should return sync state", async () => {
			const expected = {
				currentChainHeight: 100,
				currentTotalDifficulty: 100,
				progressPercent: 100,
				targetChainHeight: 100,
				targetTotalDifficulty: 22999999,
			};
			const mock = stubClient(null, expected);
			const result = await spell.node.getSyncStat();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_getSyncStat", null);
			expect(result).to.be.deep.eq(expected);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.getSyncStat().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_getSyncStat", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe("#isSyncing", () => {
		it("should return sync status", async () => {
			const expected = false;
			const mock = stubClient(null, expected);
			const result = await spell.node.isSyncing();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_isSyncing", null);
			expect(result).to.be.deep.eq(expected);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.isSyncing().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_isSyncing", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".isSyncEnabled", () => {
		it("should return sync status", async () => {
			const expected = false;
			const mock = stubClient(null, expected);
			const result = await spell.node.isSyncEnabled();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_isSyncEnabled", null);
			expect(result).to.be.deep.eq(expected);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.isSyncEnabled().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_isSyncEnabled", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".disableSync", () => {
		it("should return sync status", async () => {
			const expected = false;
			const mock = stubClient(null, expected);
			const result = await spell.node.disableSync();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_disableSync", null);
			expect(result).to.be.deep.eq(expected);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.disableSync().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_disableSync", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".enableSync", () => {
		it("should return sync status", async () => {
			const expected = false;
			const mock = stubClient(null, expected);
			const result = await spell.node.enableSync();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_enableSync", null);
			expect(result).to.be.deep.eq(expected);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.enableSync().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_enableSync", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe("#info", () => {
		it("should call method", async () => {
			const mock = stubClient(null, {});
			const result = await spell.node.info();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_info", null);
			expect(result).to.be.deep.eq({});
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.info().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_info", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe("#config", () => {
		it("should call method", async () => {
			const mock = stubClient(null, {});
			const result = await spell.node.config();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_config", null);
			expect(result).to.be.deep.eq({});
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.config().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_config", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe("#basic", () => {
		it("should call method", async () => {
			const mock = stubClient(null, {});
			const result = await spell.node.basic();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_basic", null);
			expect(result).to.be.deep.eq({});
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.node.basic().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("node_basic", null);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe("#getTransactionFromPool", () => {
		const txHash = "0x48b9bff17fffe090e707bd90910f58bd";

		it("should return result on successful call", async () => {
			const expectedResult = { header: { number: 1 } };
			const mock = stubClient(null, expectedResult);
			const result = await spell.node.getTransactionFromPool(txHash);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("node_getTransactionFromPool", txHash);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("unknown transaction"), 1234);
			spell.node.getTransactionFromPool(txHash).catch((err) => {
				expect(err.message).to.be.eq("unknown transaction");
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith(
					"node_getTransactionFromPool",
					txHash,
				);
				done();
			});
		});
	});
});
