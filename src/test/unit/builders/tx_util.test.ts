import chai = require("chai");
import { TxUtility, PrivateKey } from "../../../lib";
import { Transaction } from "../../../..";
const expect = chai.expect;

describe("#TxUtility", () => {
	let txUtil: TxUtility;
	let pk: PrivateKey;
	let testTx: Transaction;

	beforeEach(() => {
		txUtil = new TxUtility();
		pk = PrivateKey.from(
			"wntaQsep5UAL3WAsThJx3jtJ2Ge79fjuzVvisKBhBrA4ps24ostkmKA9egwH3o7nUYxB37Kn9Ac23UEym8u81AmgUn6Zuq",
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
	});

	describe(".getBytesNoHashAndSig", () => {
		it("should return expected bytes", () => {
			const buf = txUtil.getBytesNoHashAndSig(testTx);
			const expected = Buffer.from(
				"99a131d922653468624154343551656464506a3358704a695348786239415068755148634d5557c001d93334384733434c3367477142453259686e426a5651746e514d554845424e4468774e41786f4e4c5258437256544e657a7a33436ace5c39b51ed922653468624154343551656464506a3358704a695348786239415068755148634d555701a131",
				"hex",
			);
			expect(buf.equals(expected)).to.be.true;
		});
	});

	describe(".hash", () => {
		it("should return expected hash prefixed with 0x", () => {
			const hash = txUtil.hash(testTx);
			expect(hash).to.eql(
				"0x2ff55967884145c271caea9cca0b1fd23e0aed0847eafc89e95d0956602e045b",
			);
		});

		specify(
			"that when prefix='', it should return expected hash without 0x prefix",
			() => {
				const hash = txUtil.hash(testTx, "");
				expect(hash).to.eql(
					"2ff55967884145c271caea9cca0b1fd23e0aed0847eafc89e95d0956602e045b",
				);
			},
		);
	});

	describe(".sign", () => {
		it("should return expected signature prefixed with 0x", () => {
			const sig = txUtil.sign(testTx, pk);
			expect(sig).to.eq(
				"0xa3a72abd606d03804d959cf5c6899b2e785bbf228dbc8e1943a188c8b36f69505a95323820c1261e693ac8689bfa55eb47c55b9b8b5491d9b992ed6cc1913a02",
			);
		});

		specify(
			"that when prefix='', it should return expected signature without 0x prefix",
			() => {
				const sig = txUtil.sign(testTx, pk, "");
				expect(sig).to.eq(
					"a3a72abd606d03804d959cf5c6899b2e785bbf228dbc8e1943a188c8b36f69505a95323820c1261e693ac8689bfa55eb47c55b9b8b5491d9b992ed6cc1913a02",
				);
			},
		);
	});
});
