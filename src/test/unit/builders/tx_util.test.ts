import chai = require("chai");
import { TxUtility, PrivateKey } from "../../../lib";
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
				"990101d922653468624154343551656464506a3358704a695348786239415068755148634d5557d93334384733434c3367477142453259686e426a5651746e514d554845424e4468774e41786f4e4c5258437256544e657a7a33436ad922653468624154343551656464506a3358704a695348786239415068755148634d5557a131a131ce5c39b51ec0",
				"hex",
			);
			expect(buf.equals(expected)).to.be.true;
		});
	});

	describe(".hash", () => {
		it("should return expected hash prefixed with 0x", () => {
			const hash = txUtil.hash(testTx);
			expect(hash).to.eql(
				"0x0ff41542e5fa70e518a36e27a0a6c1d259a661eda7876fe598d9f917b0f44a14",
			);
		});

		specify(
			"that when prefix='', it should return expected hash without 0x prefix",
			() => {
				const hash = txUtil.hash(testTx, "");
				expect(hash).to.eql(
					"0ff41542e5fa70e518a36e27a0a6c1d259a661eda7876fe598d9f917b0f44a14",
				);
			},
		);
	});

	describe(".sign", () => {
		it("should return expected signature prefixed with 0x", () => {
			const sig = txUtil.sign(testTx, pk);
			expect(sig).to.eq(
				"0x7c51efa63c5cabc6081c1a3d6044885e673252f5c7fdb3c2f075edddef3040ad62ebc2814ad15a97ebe637a967287432a22e94796d23fe176bf5568d2a88cd08",
			);
		});

		specify(
			"that when prefix='', it should return expected signature without 0x prefix",
			() => {
				const sig = txUtil.sign(testTx, pk, "");
				expect(sig).to.eq(
					"7c51efa63c5cabc6081c1a3d6044885e673252f5c7fdb3c2f075edddef3040ad62ebc2814ad15a97ebe637a967287432a22e94796d23fe176bf5568d2a88cd08",
				);
			},
		);
	});
});
