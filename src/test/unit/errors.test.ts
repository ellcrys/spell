import { wrapErr } from "../../lib/errors"
import chai = require("chai");
const expect = chai.expect;

describe("errors.js", () => {
	it("should return expected message", () => {
		const e = { message: "bad thing", code: "123" }
		const err = wrapErr(e, "another bad thing")
		expect(err.message).to.be.eql("bad thing -> another bad thing");
	})
})
