"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const spell_1 = __importDefault(require("../../../lib/spell"));
const expect = chai.expect;
chai.use(sinonChai);
describe("#State", () => {
    let spell;
    let client;
    function makeClientStub(err, resp) {
        return sinon.stub(client.client, "call").callsArgWith(1, err, resp);
    }
    beforeEach((done) => {
        spell = new spell_1.default();
        client = spell.rpcClient;
        client.client = {
            call: (option, cb) => {
                cb(null, null);
            },
        };
        done();
    });
    it("should return result on successful call", () => __awaiter(this, void 0, void 0, function* () {
        const expectedResult = { header: { number: 1 } };
        const mock = makeClientStub("", { result: expectedResult });
        const result = yield spell.state.getBlock(1);
        expect(mock).to.have.been.callCount(1);
        expect(result).to.be.deep.eq(expectedResult);
    }));
    it("should return error and data when call returns an error", (done) => {
        const expectedResult = { header: { number: 1 } };
        const mock = makeClientStub("block unknown", 1234);
        spell.state.getBlock(1).catch((err) => {
            expect(err.message).to.be.eq("method returned an error -> block unknown");
            expect(err.data).to.eq(1234);
            done();
        });
    });
});
