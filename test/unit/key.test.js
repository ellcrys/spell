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
describe("key.js", function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC91bml0L2tleS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLHFDQU91QjtBQUN2QiwrQkFBa0M7QUFDbEMsK0JBQWtDO0FBQ2xDLDREQUFzQztBQUN0QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBRTNCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDbEIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDdkIsa0VBQWtFLEVBQ2xFLEtBQUssQ0FDTCxDQUFDO0lBRUYsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUN2QixRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtnQkFDekUsSUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBVSxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw2RUFBNkUsRUFBRTtnQkFDakYsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEMsSUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLGdCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFFB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