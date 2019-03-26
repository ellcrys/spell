import chai = require("chai");
import { describe } from "mocha";
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Net", () => {
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

	describe("#getActivePeers", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.net.getActivePeers();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_getActivePeers", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error getting active peers"), 1234);
			spell.net.getActivePeers().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_getActivePeers", null);
				expect(err.message).to.be.eq("error getting active peers");
				done();
			});
		});
	});

	describe("#getPeers", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.net.getPeers();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_getPeers", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error getting peers"), 1234);
			spell.net.getPeers().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_getPeers", null);
				expect(err.message).to.be.eq("error getting peers");
				done();
			});
		});
	});

	describe("#getBroadcasters", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.net.getBroadcasters();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_broadcasters", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error getting broadcaster"), 1234);
			spell.net.getBroadcasters().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_broadcasters", null);
				expect(err.message).to.be.eq("error getting broadcaster");
				done();
			});
		});
	});

	describe("#getStats", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.net.getStats();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_stats", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error getting stat"), 1234);
			spell.net.getStats().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_stats", null);
				expect(err.message).to.be.eq("error getting stat");
				done();
			});
		});
	});

	describe("#addPeer", () => {
		const peerAddress: string = "odfnknfkenfegfjbefjebfkenlfhioekgbkqf";
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.net.addPeer(peerAddress);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_addPeer", peerAddress);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error adding peer"), 1234);
			spell.net.addPeer(peerAddress).catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_addPeer", peerAddress);
				expect(err.message).to.be.eq("error adding peer");
				done();
			});
		});
	});

	describe("#dumpPeers", () => {
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.net.dumpPeers();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_dumpPeers", null);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error dumping peers"), 1234);
			spell.net.dumpPeers().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_dumpPeers", null);
				expect(err.message).to.be.eq("error dumping peers");
				done();
			});
		});
	});

	describe("#join", () => {
		const peerAddr: string[] = ["ghdfjgkhlvjcvkb"];
		it("should return result on successful call", async () => {
			const expectedResult: boolean = true;
			const mock = stubClient(null, expectedResult);
			const result = await spell.net.join(peerAddr);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_join", peerAddr);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("error dumping peers"), 1234);
			spell.net.join(peerAddr).catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_join", peerAddr);
				expect(err.message).to.be.eq("error dumping peers");
				done();
			});
		});
	});

	describe("#noNet", () => {
		it("should return result on successful call", async () => {
			const mock = stubClient(null, true);
			const result = await spell.net.noNet();
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("net_noNet", null);
			expect(result).to.be.deep.eq(true);
		});

		it("should return error and data when call returns an error", (done) => {
			const mock = stubClient(new Error("bad method"), 1234);
			spell.net.noNet().catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("net_noNet", null);
				expect(err.message).to.be.eq("bad method");
				done();
			});
		});
	});
});
