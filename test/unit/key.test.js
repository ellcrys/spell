"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var key_1 = require("../../lib/key");
var crypto = require("crypto");
var b58 = require("bs58check");
var errors_1 = __importDefault(require("../../lib/errors"));
var expect = chai.expect;
describe.only("key.js", function () {
    var seed = Buffer.from("88d77c155018020e13d206f5f31c22d096e64a6a75c2498fec4d64e927c017e0", "hex");
    describe("#PrivateKey", function () {
        describe(".constructor", function () {
            it("should instantiate a PrivateKey without an explicitly provided seed", function () {
                var pk = new key_1.PrivateKey();
                expect(pk).to.not.eq(undefined);
            });
            it("should instantiate 2 PrivateKeys with the same seed and get same PrivateKey", function () {
                var seed = crypto.randomBytes(32);
                var pk = new key_1.PrivateKey(seed);
                var pk2 = new key_1.PrivateKey(seed);
                expect(pk.toBuffer().equals(pk2.toBuffer())).to.be.true;
            });
        });
        describe(".sign", function () {
            it("should successfully sign a message and return 64 bytes signature", function () {
                var pk = new key_1.PrivateKey();
                var msg = Buffer.from("hello");
                var sig = pk.sign(msg);
                expect(sig).to.have.lengthOf(64);
            });
        });
        describe(".toAddress", function () {
            it("should return expected address", function () {
                var pk = new key_1.PrivateKey(seed);
                expect(pk.toAddress().toString()).to.eq("eACBPYvf434jVcZoHfKs3b7fxcbs5N41eJ");
            });
        });
        describe(".publicKey", function () {
            it("should return a public key", function () {
                var pk = new key_1.PrivateKey(seed);
                expect(pk.publicKey()).to.not.be.undefined;
            });
        });
        describe(".toBase58", function () {
            var actual;
            beforeEach(function () {
                var pk = new key_1.PrivateKey(seed);
                actual = pk.toBase58();
            });
            it("should return a valid base58 string of length 65", function () {
                expect(b58.decode(actual)).to.have.lengthOf(65);
            });
            it("should have the 0th index equal the private key version", function () {
                expect(b58.decode(actual)[0]).to.eql(key_1.PrivateKeyVersion[0]);
            });
        });
        describe(".toBuffer", function () {
            var actual;
            beforeEach(function () {
                var pk = new key_1.PrivateKey(seed);
                actual = pk.toBuffer();
            });
            it("should return a length 65", function () {
                expect(actual).to.have.lengthOf(65);
            });
            it("should have the 0th index equal the private key version", function () {
                expect(actual[0]).to.eql(key_1.PrivateKeyVersion[0]);
            });
        });
        describe(".from", function () {
            it("should throw InvalidPrivateKeyChecksum when base58checksum fails", function () {
                var invalid = "wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysd";
                expect(function () {
                    key_1.PrivateKey.from(invalid);
                }).to.throw(errors_1.default.InvalidPrivateKeyChecksum);
            });
            it("should throw InvalidPrivateKeyVersion when private key version is missing", function () {
                var invalid = b58.encode(Buffer.from("missing_version_prefix"));
                expect(function () {
                    key_1.PrivateKey.from(invalid);
                }).to.throw(errors_1.default.InvalidPrivateKeyVersion);
            });
            it("should throw InvalidPrivateKeySize when key not 65 bytes", function () {
                var invalid = b58.encode(Buffer.concat([key_1.PrivateKeyVersion, Buffer.from([49, 49])]));
                expect(function () {
                    key_1.PrivateKey.from(invalid);
                }).to.throw(errors_1.default.InvalidPrivateKeySize);
            });
            it("should successfully return expected key", function () {
                var key = "wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysEPUcAPcCTQ7zF2HDF9k8rGcnddF9V9GJHmTrazYTMgYh3EK9wAWEJ3qvXixnd";
                var pk = key_1.PrivateKey.from(key);
                expect(pk.toBase58()).to.eql(key);
            });
            it("should successfully return expected key", function () {
                var key = "wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysEPUcAPcCTQ7zF2HDF9k8rGcnddF9V9GJHmTrazYTMgYh3EK9wAWEJ3qvXixnd";
                var pk = key_1.PrivateKey.from(key);
                expect(pk.toBase58()).to.eql(key);
            });
        });
        describe(".fromBuffer", function () {
            it("should throw InvalidPrivateKeyVersion when private key version is missing", function () {
                var invalid = Buffer.from("missing_version_prefix");
                expect(function () {
                    key_1.PrivateKey.fromBuffer(invalid);
                }).to.throw(errors_1.default.InvalidPrivateKeyVersion);
            });
            it("should throw InvalidPrivateKeySize when key not 65 bytes", function () {
                var invalid = Buffer.concat([key_1.PrivateKeyVersion, Buffer.from([49, 39])]);
                expect(function () {
                    key_1.PrivateKey.fromBuffer(invalid);
                }).to.throw(errors_1.default.InvalidPrivateKeySize);
            });
            it("should successfully return expected key", function () {
                var buf = new key_1.PrivateKey(seed).toBuffer();
                var pk = key_1.PrivateKey.fromBuffer(buf);
                expect(pk.toBuffer().equals(buf)).to.be.true;
            });
        });
    });
    describe("#PublicKey", function () {
        describe(".toBase58", function () {
            it("should return valid base58 with length of 51", function () {
                var pubKey = new key_1.PrivateKey().publicKey();
                var result = pubKey.toBase58();
                expect(result).to.have.lengthOf(51);
            });
            specify("that the decoded base58 public key should have length of 33", function () {
                var pubKey = new key_1.PrivateKey().publicKey();
                var result = pubKey.toBase58();
                var decoded = b58.decode(result);
                expect(decoded).to.have.lengthOf(33);
            });
            specify("that the decoded base58 public key should 0th index equal public key version", function () {
                var pubKey = new key_1.PrivateKey().publicKey();
                var result = pubKey.toBase58();
                var decoded = b58.decode(result);
                expect(decoded[0]).to.eql(key_1.PublicKeyVersion[0]);
            });
        });
        describe(".toBuffer", function () {
            it("should have size of 33", function () {
                var pubKey = new key_1.PrivateKey().publicKey();
                var buf = pubKey.toBuffer();
                expect(buf).to.have.lengthOf(33);
            });
            specify("that the decoded the 0th index equal public key version", function () {
                var pubKey = new key_1.PrivateKey().publicKey();
                var buf = pubKey.toBuffer();
                expect(buf[0]).to.eql(key_1.PublicKeyVersion[0]);
            });
        });
        describe(".toAddress", function () {
            it("should return expected address", function () {
                var pubKey = new key_1.PrivateKey(seed).publicKey();
                var addr = pubKey.toAddress();
                expect(addr.toString()).to.eql("eACBPYvf434jVcZoHfKs3b7fxcbs5N41eJ");
            });
        });
        describe(".verify", function () {
            it("should successfully verify signature", function () {
                var privKey = new key_1.PrivateKey(seed);
                var pubKey = new key_1.PrivateKey(seed).publicKey();
                var msg = Buffer.from("hello");
                var sig = privKey.sign(msg);
                expect(pubKey.verify(msg, sig)).to.be.true;
            });
        });
        describe(".fromBuffer", function () {
            it("should throw InvalidPublicKeyVersion when public key version is missing", function () {
                var invalid = Buffer.from("missing_version_prefix");
                expect(function () {
                    key_1.PublicKey.fromBuffer(invalid);
                }).to.throw(errors_1.default.InvalidPublicKeyVersion);
            });
            it("should throw InvalidPublicKeySize when public key version is missing", function () {
                var invalid = Buffer.concat([key_1.PublicKeyVersion, Buffer.from([49, 39])]);
                expect(function () {
                    key_1.PublicKey.fromBuffer(invalid);
                }).to.throw(errors_1.default.InvalidPublicKeySize);
            });
            it("should successfully return a public key instance", function () {
                var key = new key_1.PrivateKey(seed);
                var pk = key.publicKey().toBuffer();
                var pk2 = key_1.PublicKey.fromBuffer(pk);
                expect(pk.equals(pk2.toBuffer())).to.be.true;
            });
        });
        describe(".from", function () {
            it("should throw InvalidPublicKeyChecksum when public key fail base58 checksum check", function () {
                var invalid = "invalid_base58";
                expect(function () {
                    key_1.PublicKey.from(invalid);
                }).to.throw(errors_1.default.InvalidPublicKeyChecksum);
            });
            it("should throw InvalidPublicKeyVersion when public key version is missing", function () {
                var invalid = b58.encode(Buffer.from("missing_version_prefix"));
                expect(function () {
                    key_1.PublicKey.from(invalid);
                }).to.throw(errors_1.default.InvalidPublicKeyVersion);
            });
            it("should throw InvalidPublicKeySize when public key version is missing", function () {
                var invalid = b58.encode(Buffer.concat([key_1.PublicKeyVersion, Buffer.from([49, 39])]));
                expect(function () {
                    key_1.PublicKey.from(invalid);
                }).to.throw(errors_1.default.InvalidPublicKeySize);
            });
            it("should successfully return a public key instance", function () {
                var key = new key_1.PrivateKey(seed);
                var pk = b58.encode(key.publicKey().toBuffer());
                var pk2 = key_1.PublicKey.from(pk);
                expect(pk2.toBase58()).to.eql(pk);
            });
        });
        describe("#Address", function () {
            describe(".isValid", function () {
                it("should return false when the address format is invalid", function () {
                    var valid = key_1.Address.isValid("abc_invalid");
                    expect(valid).to.be.false;
                });
                it("should return false when the address does not have expected address version", function () {
                    var addr = b58.encode(Buffer.from("invalid"));
                    var valid = key_1.Address.isValid(addr);
                    expect(valid).to.be.false;
                });
                it("should return false when the address decoded size is not 21", function () {
                    var addr = b58.encode(Buffer.concat([key_1.AddressVersion, Buffer.from([34, 56])]));
                    var valid = key_1.Address.isValid(addr);
                    expect(valid).to.be.false;
                });
                it("should return true when the address is valid", function () {
                    var valid = key_1.Address.isValid("eFisKfHuMY5mYyTbLMq9aLSUL7obyRwDsb");
                    expect(valid).to.be.true;
                });
            });
            describe(".getValidationError", function () {
                it("should return InvalidAddressFormat when the address format is invalid", function () {
                    var err = key_1.Address.getValidationError("abc_invalid");
                    expect(err).to.eql(errors_1.default.InvalidAddressFormat);
                });
                it("should return InvalidAddressVersion when the address does not have address version", function () {
                    var addr = b58.encode(Buffer.from("invalid"));
                    var err = key_1.Address.getValidationError(addr);
                    expect(err).to.eql(errors_1.default.InvalidAddressVersion);
                });
                it("should return InvalidAddressSize when the address decoded size is not 21", function () {
                    var addr = b58.encode(Buffer.concat([key_1.AddressVersion, Buffer.from([34, 56])]));
                    var err = key_1.Address.getValidationError(addr);
                    expect(err).to.eql(errors_1.default.InvalidAddressSize);
                });
                it("should return null when address is valid", function () {
                    var addr = "eFisKfHuMY5mYyTbLMq9aLSUL7obyRwDsb";
                    var err = key_1.Address.getValidationError(addr);
                    expect(err).to.eql(null);
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC91bml0L2tleS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLHFDQU91QjtBQUN2QiwrQkFBa0M7QUFDbEMsK0JBQWtDO0FBQ2xDLDREQUFzQztBQUN0QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBRTNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ3ZCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQ3ZCLGtFQUFrRSxFQUNsRSxLQUFLLENBQ0wsQ0FBQztJQUVGLFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdkIsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN4QixFQUFFLENBQUMscUVBQXFFLEVBQUU7Z0JBQ3pFLElBQU0sRUFBRSxHQUFHLElBQUksZ0JBQVUsRUFBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsNkVBQTZFLEVBQUU7Z0JBQ2pGLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLElBQU0sRUFBRSxHQUFHLElBQUksZ0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxnQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENB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