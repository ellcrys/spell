import chai = require("chai");
import Decimal from "decimal.js";
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import { HttpCallOption, Transaction } from "../../../..";
import { Address, PrivateKey } from "../../../lib";
import {
	NumDecimals,
	TxBalanceBuilder,
	TxPayloadVersion,
} from "../../../lib/builders/transaction_builder";
import errors from "../../../lib/errors";
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const b58 = require("bs58check");

const expect = chai.expect;
chai.use(sinonChai);

describe("#TransactionBuilder", () => {
	let spell: Spell;
	let client: RPCClient;
	let pk: PrivateKey;
	let testTx: Transaction;

	function makeClientStub(err: Error | null, resp: any) {
		return sinon.stub(client.client, "call" as never).callsArgWith(3, err, resp);
	}

	class WrappedTxBalanceBuilder extends TxBalanceBuilder {
		constructor(mClient?: RPCClient) {
			super(mClient);
		}
		public getClient(): RPCClient | undefined {
			return this.client;
		}
		public getData(): Transaction {
			return this.data;
		}
		public setData(tx: Transaction) {
			this.data = tx;
		}
		public finalize(sk?: PrivateKey): Promise<string> {
			return super.finalize(sk);
		}
	}

	beforeEach(() => {
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

		pk = PrivateKey.from(
			"wntaQsep5UAL3WAsThJx3jtJ2Ge79fjuzVvisKBhBrA4ps24o" +
				"stkmKA9egwH3o7nUYxB37Kn9Ac23UEym8u81AmgUn6Zuq",
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

	describe("TxBalanceBuilder", () => {
		describe(".constructor", () => {
			it("should set client", () => {
				const b = new WrappedTxBalanceBuilder(client);
				expect(b.getClient()).to.not.be.undefined;
			});

			it("should set type to 0x1", () => {
				const b = new WrappedTxBalanceBuilder(client);
				expect(b.getData().type).to.eql(0x1);
			});
		});

		describe(".from", () => {
			it("should set `from` field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW";
				b.from(data);
				expect(b.getData().from).to.eq(data);
			});

			specify("when Address is provided, it should set from field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = Address.from("e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW");
				b.from(data.toString());
				expect(b.getData().from).to.eq(data.toString());
			});
		});

		describe(".to", () => {
			it("should set `to` field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW";
				b.to(data);
				expect(b.getData().to).to.eq(data);
			});

			specify("when Address is provided, it should set to field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = Address.from("e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW");
				b.to(data.toString());
				expect(b.getData().to).to.eq(data.toString());
			});
		});

		describe(".nonce", () => {
			it("should set `nonce` field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = 10;
				b.nonce(data);
				expect(b.getData().nonce).to.eq(data);
			});
		});

		describe(".value", () => {
			it("should set `value` field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = "10.40";
				b.value(data);
				expect(b.getData().value).to.eq(data);
			});

			specify("when Decimal is provided, it should set `value` field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = new Decimal("10.40");
				b.value(data);
				expect(b.getData().value).to.eq(data.toFixed(NumDecimals));
			});
		});

		describe(".fee", () => {
			it("should set `fee` field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = "10.40";
				b.fee(data);
				expect(b.getData().fee).to.eq(data);
			});

			specify("when Decimal is provided, it should set `fee` field", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = new Decimal("10.40");
				b.fee(data);
				expect(b.getData().fee).to.eq(data.toFixed(NumDecimals));
			});
		});

		describe(".reset", () => {
			it("should set internal data to zero value (empty object)", () => {
				const b = new WrappedTxBalanceBuilder(client);
				const data = "10.40";
				b.fee(data);
				b.value(data);
				expect(b.getData().fee).to.eq(data);
				expect(b.getData().value).to.eq(data);
				b.reset();
				expect(b.getData()).to.be.empty;
			});
		});

		describe(".finalize", () => {
			it("should throw RequirePrivateKey error when private key is not provided", () => {
				const b = new WrappedTxBalanceBuilder(client);
				b.finalize().catch((e) => {
					expect(e).to.eq(errors.RequirePrivateKey);
				});
			});

			describe("when key is provided", () => {
				describe("when nonce field is not set", () => {
					it("should throw ClientNotInitialized error when client is not initialized", () => {
						const b = new WrappedTxBalanceBuilder();
						delete testTx.nonce;
						b.setData(testTx);

						b.finalize(pk).catch((e) => {
							expect(e).to.eq(errors.ClientNotInitialized);
						});
					});

					it(
						"should throw UnknownSenderAccount error when sender " +
							"account is not known",
						async () => {
							const b = new WrappedTxBalanceBuilder(client);
							delete testTx.nonce;
							b.setData(testTx);

							makeClientStub(
								{
									data: `{ "error": { "code": 30001 }}`,
									statusCode: 400,
								} as any,
								null,
							);

							b.finalize(pk).catch((e) => {
								expect(e).to.eq(errors.UnknownSenderAccount);
							});
						},
					);

					it("should successfully call finalize()", async () => {
						makeClientStub(null, 2);

						const b = new WrappedTxBalanceBuilder(client);
						delete testTx.nonce;
						b.setData(testTx);

						const hash = await b.finalize(pk);

						const data = b.getData();
						expect(data.timestamp).to.not.be.undefined;
						expect(data.nonce).to.eq(2);
						expect(data.hash).to.not.undefined;
						expect(data.sig).to.not.undefined;
						expect(data.hash).to.eq(hash);
					});
				});
			});
		});

		describe(".payload", () => {
			it("should return object", async () => {
				const b = new WrappedTxBalanceBuilder(client);
				expect(b.getData().timestamp).to.be.undefined;
				const data = await b.payload();
				expect(data.timestamp).to.not.be.undefined;
			});
		});

		describe(".send", () => {
			it(
				"should throw ClientNotInitialized error when client is" +
					" not initialized",
				(done) => {
					const b = new WrappedTxBalanceBuilder();
					b.setData(testTx);

					b.send(pk).catch((e) => {
						expect(e.message).to.equal(errors.ClientNotInitialized.message);
						done();
					});
				},
			);

			it("should successfully send signed transaction data", async () => {
				const b = new WrappedTxBalanceBuilder(client);
				b.setData(testTx);

				const mock = makeClientStub(null, {
					id: "0x000",
				});

				const res = await b.send(pk);
				expect(res.id).to.equal("0x000");
				expect(mock).to.have.been.calledWith("ell_send", b.getData());
			});
		});

		describe(".packed", () => {
			it(
				"should successfully return a valid base58 serialized " +
					"version of the transaction",
				async () => {
					const b = new WrappedTxBalanceBuilder(client);
					b.setData(testTx);
					const res = await b.packed(pk);
					const decoded = b58.decode(res);
					expect(decoded[0]).to.eql(TxPayloadVersion[0]);
					const tx = JSON.parse(decoded.slice(1).toString());
					expect(b.getData()).to.deep.eq(tx);
				},
			);
		});
	});
});
