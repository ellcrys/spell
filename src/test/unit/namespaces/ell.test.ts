import chai = require("chai");
import Decimal from "decimal.js";
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import { Transaction } from "../../../..";
import { PrivateKey } from "../../../lib";
import { TxBalanceBuilder } from "../../../lib/builders/transaction_builder";
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Ell", () => {
	let spell: Spell;
	let client: RPCClient;
	let pk: PrivateKey;
	let testTx: Transaction;

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

		pk = PrivateKey.from(
			"wntaQsep5UAL3WAsThJx3jtJ2Ge79fjuzVvisKBhBrA4ps24ostkmKA9egw" +
				"H3o7nUYxB37Kn9Ac23UEym8u81AmgUn6Zuq",
		);
		testTx = {
			from: "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW",
			to: "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW",
			type: 1,
			senderPubKey: pk.publicKey().toBase58(),
			value: "1",
			fee: "1",
			timestamp: 1547285790,
			nonce: 1,
		};

		done();
	});

	describe(".send", () => {
		it("should call method ell_send", async () => {
			const mock = stubClient(null, {});
			await spell.ell.send(testTx);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("ell_send", testTx);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.ell.send(testTx).catch((err: Error) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("ell_send", testTx);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".send", () => {
		it("should call method ell_getBalance and return Decimal", async () => {
			const mock = stubClient(null, "10.20");
			const result = await spell.ell.getBalance(pk.toAddress().toString());
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith(
				"ell_getBalance",
				pk.toAddress().toString(),
			);
			expect(result).to.be.an.instanceOf(Decimal);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.ell.getBalance(pk.toAddress().toString()).catch((err: Error) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith(
					"ell_getBalance",
					pk.toAddress().toString(),
				);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});

	describe(".balance", () => {
		it("should return an instance of TxBalanceBuilder", () => {
			expect(spell.ell.balance()).to.be.an.instanceOf(TxBalanceBuilder);
		});
	});

	describe(".sendRaw", () => {
		const encodedTx: string = "0xdsdhdjd";
		it("should call method ell_send", async () => {
			const mock = stubClient(null, "111");
			await spell.ell.sendRaw(encodedTx);
			expect(mock).to.have.been.callCount(1);
			expect(mock).to.have.been.calledWith("ell_sendRaw", encodedTx);
		});

		it("should return 'error' when method returns error", async () => {
			const mock = stubClient(new Error("bad method"), null);
			spell.ell.sendRaw(encodedTx).catch((err: Error) => {
				expect(mock).to.have.been.callCount(1);
				expect(mock).to.have.been.calledWith("ell_sendRaw", encodedTx);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});
});
