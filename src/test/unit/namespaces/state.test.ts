import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
import { describe } from "mocha";
const expect = chai.expect;
chai.use(sinonChai);

describe("#State", () => {
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

	// it("should return result on successful call", async () => {
	// 	const expectedResult = { header: { number: 1 } };
	// 	const mock = makeClientStub(null, expectedResult);
	// 	const result = await spell.state.getBlock(1);
	// 	expect(mock).to.have.been.callCount(1);
	// 	expect(result).to.be.deep.eq(expectedResult);
	// });

	// it("should return error and data when call returns an error", (done) => {
	// 	const expectedResult = { header: { number: 1 } };
	// 	const mock = makeClientStub(new Error("block unknown"), 1234);
	// 	spell.state.getBlock(1).catch((err) => {
	// 		expect(err.message).to.be.eq("block unknown");
	// 		done();
	// 	});
	// });

	describe("#getBlock", () => {
		it("should return result on successful call", async () => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.state.getBlock(1);
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(new Error("block unknown"), 1234);
			spell.state.getBlock(1).catch((err) => {
				expect(err.message).to.be.eq("block unknown");
				done();
			});
		});
	});

	describe("#getBlockByHash", () => {
		it("should return result on successful call", async () => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.state.getBlockByHash(
				"0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977be3970c2599c7a",
			);
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = "block unknown";
			makeClientStub(new Error("block unknown"), 1234);
			spell.state
				.getBlockByHash(
					"0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977b",
				)
				.catch((err) => {
					expect(err.message).to.be.eq(expectedResult);
					done();
				});
		});
	});

	describe("#getAccountNonce", () => {
		it("should return result on successful call", async () => {
			const expectedResult = { header: { number: 789 } };
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.state.getAccountNonce(
				"e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61",
			);
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = "account not found";
			makeClientStub(new Error("account not found"), 1234);
			spell.state
				.getAccountNonce(
					"0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977b",
				)
				.catch((err) => {
					expect(err.message).to.be.eq(expectedResult);
					done();
				});
		});
	});

	describe("#getAccount", () => {
		it("should return result on successful call", async () => {
			const expectedResult = {
				header: {
					address: "e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61",
					balance: "50000.0000000000000",
					nonce: 0,
					type: 0,
				},
			};
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.state.getAccount(
				"e9aJ9NGEgQFLmViSpAz5XVsevn3vwskZ61",
			);
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = "account not found";
			makeClientStub(new Error("account not found"), 1234);
			spell.state
				.getAccount(
					"0x96aa8888b1d78e55faed2e196d7383a5e37bcdb119fa5fb977b",
				)
				.catch((err) => {
					expect(err.message).to.be.eq("account not found");
					done();
				});
		});
	});

	describe("#getBestChain", () => {
		it("should return result on successful call", async () => {
			const expectedResult = {
				header: {
					height: "0x5f30",
					id: "0x230c200a400b2e2b37",
					timestamp: "0x15703a2f883ddd85",
					totalDifficulty: "0x13ce7c2312e",
				},
			};
			const mock = makeClientStub(null, expectedResult);
			const result = await spell.state.getBestChain();
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = {
				header: {
					height: "0x000",
					id: "0x230c200a400b2e2b37",
					timestamp: "0x0000",
					totalDifficulty: "0x0000",
				},
			};

			makeClientStub(null, expectedResult);

			spell.state.getBestChain().then((res: any) => {
				expect(res.header.height).to.be.eq("0x000");
				expect(res.header.timestamp).to.be.eq("0x0000");
				expect(res.header.totalDifficulty).to.be.eq("0x0000");
				done();
			});
		});
	});

	describe("#getBranches", () => {
		it("should return result on successful call", async () => {
			const expectedResult = {
				header: [
					{
						height: "0x5f30",
						isBranch: "0x230c200a400b2e2b37",
					},
					{
						height: "0x5f30",
						isBranch: "0x230c200a400b2e2b37",
					},
				],
			};
			const mock = makeClientStub(null, expectedResult);
			const result: any = await spell.state.getBranches();
			expect(mock).to.have.been.callCount(1);
			expect(result.header.length).to.eq(2);
		});

		it("should return empty result", (done) => {
			const expectedResult = {
				header: [],
			};

			makeClientStub(null, expectedResult);

			spell.state.getBranches().then((res: any) => {
				expect(res.header.length).to.eq(0);
				done();
			});
		});
	});

	describe("#getDifficulty", () => {
		it("should return result on successful call", async () => {
			const expectedResult = {
				header: {
					difficulty: "0x25af650",
					totalDifficulty: "0x13d06685d7b",
				},
			};
			const mock = makeClientStub(null, expectedResult);
			const result: any = await spell.state.getDifficulty();
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(new Error("invalid request"), 1234);
			spell.state.getDifficulty().catch((err) => {
				expect(err.message).to.be.eq("invalid request");
				done();
			});
		});
	});

	describe("#getOrphans", () => {
		it("should return result on successful call", async () => {
			const expectedResult = { header: { number: 1 } };

			const mock = makeClientStub(null, expectedResult);
			const result: any = await spell.state.getOrphans();
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(new Error("error encountered"), 1234);
			spell.state.getOrphans().catch((err) => {
				expect(err.message).to.be.eq("error encountered");
				done();
			});
		});
	});

	describe("#getReOrgs", () => {
		it("should return result on successful call", async () => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(null, expectedResult);
			const result: any = await spell.state.getReOrgs();
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(new Error("error encountered"), 1234);
			spell.state.getReOrgs().catch((err) => {
				expect(err.message).to.be.eq("error encountered");
				done();
			});
		});
	});

	describe("#getTransaction", () => {
		it("should return result on successful call", async () => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(null, expectedResult);
			const result: any = await spell.state.getTransaction("eoxjdjdjdnd");
			expect(mock).to.have.been.callCount(1);
			expect(result).to.be.deep.eq(expectedResult);
		});

		it("should return error and data when call returns an error", (done) => {
			const expectedResult = { header: { number: 1 } };
			const mock = makeClientStub(new Error("error encountered"), 1234);
			spell.state.getTransaction("oxjdjdjdnd").catch((err) => {
				expect(err.message).to.be.eq("error encountered");
				done();
			});
		});
	});
});
