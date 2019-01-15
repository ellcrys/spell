import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
import {
	TxBalanceBuilder,
	NumDecimals,
	TxPayloadVersion,
} from "../../../lib/builders/transaction_builder";
import { Address, PrivateKey } from "../../../lib";
import Decimal from "decimal.js";
import errors from "../../../lib/errors";
import b58 = require("bs58check");

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
		constructor(client?: RPCClient) {
			super(client);
		}
		public getClient(): RPCClient | undefined {
			return this.client;
		}
		getData(): Transaction {
			return this.data;
		}
		setData(tx: Transaction) {
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

	describe("TxBalanceBuilder", () => {
		describe(".constructor", () => {
			it("should set client", () => {
				let b = new WrappedTxBalanceBuilder(client);
				expect(b.getClient()).to.not.be.undefined;
			});

			it("should set type to 0x1", () => {
				let b = new WrappedTxBalanceBuilder(client);
				expect(b.getData().type).to.eql(0x1);
			});
		});

		describe(".from", () => {
			it("should set `from` field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW";
				b.from(data);
				expect(b.getData().from).to.eq(data);
			});

			specify("when Address is provided, it should set from field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = Address.from("e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW");
				b.from(data.toString());
				expect(b.getData().from).to.eq(data.toString());
			});
		});

		describe(".to", () => {
			it("should set `to` field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = "e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW";
				b.to(data);
				expect(b.getData().to).to.eq(data);
			});

			specify("when Address is provided, it should set to field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = Address.from("e4hbAT45QeddPj3XpJiSHxb9APhuQHcMUW");
				b.to(data.toString());
				expect(b.getData().to).to.eq(data.toString());
			});
		});

		describe(".nonce", () => {
			it("should set `nonce` field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = 10;
				b.nonce(data);
				expect(b.getData().nonce).to.eq(data);
			});
		});

		describe(".value", () => {
			it("should set `value` field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = "10.40";
				b.value(data);
				expect(b.getData().value).to.eq(data);
			});

			specify("when Decimal is provided, it should set `value` field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = new Decimal("10.40");
				b.value(data);
				expect(b.getData().value).to.eq(data.toFixed(NumDecimals));
			});
		});

		describe(".fee", () => {
			it("should set `fee` field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = "10.40";
				b.fee(data);
				expect(b.getData().fee).to.eq(data);
			});

			specify("when Decimal is provided, it should set `fee` field", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = new Decimal("10.40");
				b.fee(data);
				expect(b.getData().fee).to.eq(data.toFixed(NumDecimals));
			});
		});

		describe(".reset", () => {
			it("should set internal data to zero value (empty object)", () => {
				let b = new WrappedTxBalanceBuilder(client);
				let data = "10.40";
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
				let b = new WrappedTxBalanceBuilder(client);
				b.finalize().catch((e) => {
					expect(e).to.eq(errors.RequirePrivateKey);
				});
			});

			describe("when key is provided", () => {
				describe("when nonce field is not set", () => {
					it("should throw ClientNotInitialized error when client is not initialized", () => {
						let b = new WrappedTxBalanceBuilder();
						delete testTx.nonce;
						b.setData(testTx);

						b.finalize(pk).catch((e) => {
							expect(e).to.eq(errors.ClientNotInitialized);
						});
					});

					it("should throw UnknownSenderAccount error when sender account is not known", async () => {
						let b = new WrappedTxBalanceBuilder(client);
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
					});

					it("should successfully call finalize()", async () => {
						makeClientStub(null, {
							nonce: 2,
						});

						let b = new WrappedTxBalanceBuilder(client);
						delete testTx.nonce;
						b.setData(testTx);

						let hash = await b.finalize(pk);

						let data = b.getData();
						expect(data.timestamp).to.not.be.undefined;
						expect(data.nonce).to.eq(3);
						expect(data.hash).to.not.undefined;
						expect(data.sig).to.not.undefined;
						expect(data.hash).to.eq(hash);
					});
				});
			});
		});

		describe(".payload", () => {
			it("should return object", async () => {
				let b = new WrappedTxBalanceBuilder(client);
				expect(b.getData().timestamp).to.be.undefined;
				let data = await b.payload();
				expect(data.timestamp).to.not.be.undefined;
			});
		});

		describe(".send", () => {
			it("should throw ClientNotInitialized error when client is not initialized", (done) => {
				let b = new WrappedTxBalanceBuilder();
				b.setData(testTx);

				b.send(pk).catch((e) => {
					expect(e.message).to.equal(errors.ClientNotInitialized.message);
					done();
				});
			});

			it("should successfully send signed transaction data", async () => {
				let b = new WrappedTxBalanceBuilder(client);
				b.setData(testTx);

				const mock = makeClientStub(null, {
					id: "0x000",
				});

				let res = await b.send(pk);
				expect(res.id).to.equal("0x000");
				expect(mock).to.have.been.calledWith("ell_send", b.getData());
			});
		});

		describe(".packed", () => {
			it("should successfully return a valid base58 serialized version of the transaction", async () => {
				let b = new WrappedTxBalanceBuilder(client);
				b.setData(testTx);
				let res = await b.packed(pk);
				let decoded = b58.decode(res);
				expect(decoded[0]).to.eql(TxPayloadVersion[0]);
				let tx = JSON.parse(decoded.slice(1).toString());
				expect(b.getData()).to.deep.eq(tx);
			});
		});
	});
});
