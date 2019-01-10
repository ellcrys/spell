import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import RPCClient from "../../../lib/rpcclient";
import Spell from "../../../lib/spell";
const expect = chai.expect;
chai.use(sinonChai);

describe("#Auth", () => {
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

	describe(".authenticate", () => {
		it("should return error when username or password are not set", async () => {
			spell.auth.authenticate("", "").catch((err) => {
				expect(err.message).to.be.eq("Username and password are required");
			});
		});

		it("should return result when succeed", async () => {
			const mock = makeClientStub(null, "token_abc");
			spell.auth.authenticate("user", "pass").then((token) => {
				expect(mock).to.have.been.callCount(1);
				expect(token).to.be.eq("token_abc");
			});
		});

		it("should return 'error' when method returns error", async () => {
			const mock = makeClientStub(new Error("bad method"), null);
			spell.auth.authenticate("user", "pass").catch((err) => {
				expect(mock).to.have.been.callCount(1);
				expect(err.message).to.be.eq("bad method");
			});
		});
	});
});
