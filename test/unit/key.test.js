"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var crypto = require("crypto");
var key_1 = require("../../lib/key");
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
            it("should instantiate 2 PrivateKeys with the same seed and " +
                "get same PrivateKey", function () {
                var mSeed = crypto.randomBytes(32);
                var pk = new key_1.PrivateKey(mSeed);
                var pk2 = new key_1.PrivateKey(mSeed);
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
                var key = "wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysEPUcAPcCTQ7zF2HDF9k8rGcnddF9V9GJ" +
                    "HmTrazYTMgYh3EK9wAWEJ3qvXixnd";
                var pk = key_1.PrivateKey.from(key);
                expect(pk.toBase58()).to.eql(key);
            });
            it("should successfully return expected key", function () {
                var key = "wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysEPUcAPcCTQ7zF2HDF9k8rGcnddF9V9GJ" +
                    "HmTrazYTMgYh3EK9wAWEJ3qvXixnd";
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
            it("should throw InvalidPublicKeyChecksum when public key fail base58" +
                " checksum check", function () {
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
                it("should return false when the address does not have expected " +
                    "address version", function () {
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
                it("should return InvalidAddressVersion when the address does not" +
                    " have address version", function () {
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
    describe("#Address", function () {
        describe(".from", function () {
            it("should throw InvalidAddress error if address is invalid", function () {
                expect(function () {
                    key_1.Address.from("abc");
                }).to.throw("Address is not valid");
            });
        });
    });
    describe("#HDKey", function () {
        describe(".derive", function () {
            it("should throw error when path is invalid", function () {
                expect(function () {
                    return key_1.HDKey.fromMasterSeed(Buffer.from("ahdhhd")).derive("xyz");
                }).to.throw("Invalid derivation path");
            });
            it("should not throw error", function () {
                expect(key_1.HDKey.fromMasterSeed(Buffer.from("ahdhhd")).derive("m/0'")).to.be.instanceOf(key_1.HDKey);
            });
        });
        // tslint:disable-next-line:max-line-length
        // https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-1-for-ed25519
        describe("vector 1", function () {
            var vector1Seed = "000102030405060708090a0b0c0d0e0f";
            var vector1 = [
                {
                    path: "m/0'",
                    chainCode: "8b59aa11380b624e81507a27fedda59fea6d0b779a778918a2fd3590e16e9c69",
                    key: "68e0fe46dfb67e368c75379acec591dad19df3cde26e63b93a8e704f1dade7a3",
                    publicKey: "48r8J9w1pX6qSHiUf3ZFHNdqY2MVRbaeQTjigrULhm4nGWxDQsF",
                },
                {
                    path: "m/0'/1'",
                    chainCode: "a320425f77d1b5c2505a6b1b27382b37368ee640e3557c315416801243552f14",
                    key: "b1d0bad404bf35da785a64ca1ac54b2617211d2777696fbffaf208f746ae84f2",
                    publicKey: "47yL3xthVPfibaWkChqLfhTUZ5NQGSuBVMx9opMgnRaAqqdXeC7",
                },
                {
                    path: "m/0'/1'/2'",
                    chainCode: "2e69929e00b5ab250f49c3fb1c12f252de4fed2c1db88387094a0f8c4c9ccd6c",
                    key: "92a5b23c0b8a99e37d07df3fb9966917f5d06e02ddbd909c7e184371463e9fc9",
                    publicKey: "4978DRppNZH82mB9KkuZHGLWBfkpBZMveQFV7pDWqRFgc8HNXvX",
                },
                {
                    path: "m/0'/1'/2'/2'",
                    chainCode: "8f6d87f93d750e0efccda017d662a1b31a266e4a6f5993b15f5c1f07f74dd5cc",
                    key: "30d1dc7e5fc04c31219ab25a27ae00b50f6fd66622f6e9c913253d6511d1e662",
                    publicKey: "48qL5ZEHxoWSJjuVtAuwqMG6NMWNnmzjtSzWnoAY8RtgJ6QsBRk",
                },
                {
                    path: "m/0'/1'/2'/2'/1000000000'",
                    chainCode: "68789923a0cac2cd5a29172a475fe9e0fb14cd6adb5ad98a3fa70333e7afa230",
                    key: "8f94d394a8e8fd6b1bc2f3f49f5c47e385281d5c17e65324b0f62483e37e8793",
                    publicKey: "48EihmFPt4vfFvfmvvA2PwmGk1HHdEGrWHWwrxcDH7EtPY52oM1",
                },
            ];
            vector1.forEach(function (vector) {
                it("should valid for " + vector.path, function () {
                    var hdKey = key_1.HDKey.fromMasterSeed(Buffer.from(vector1Seed, "hex"));
                    var derived = hdKey.derive(vector.path);
                    expect({
                        path: vector.path,
                        key: derived.key().toString("hex"),
                        chainCode: derived.chainCode().toString("hex"),
                        publicKey: derived
                            .privateKey()
                            .publicKey()
                            .toBase58(),
                    }).to.deep.equal(vector);
                });
            });
        });
        describe("vector 2", function () {
            // tslint:disable-next-line:max-line-length
            // https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-2-for-ed25519
            var vector2Seed = "fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29" +
                "f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542";
            var vector2 = [
                {
                    path: "m/0'",
                    chainCode: "0b78a3226f915c082bf118f83618a618ab6dec793752624cbeb622acb562862d",
                    key: "1559eb2bbec5790b0c65d8693e4d0875b1747f4970ae8b650486ed7470845635",
                    publicKey: "48ogGovUb27TDgpbMAVbxFPve6a7hkABZQj2Be1bQeLutTkNCqz",
                },
                {
                    path: "m/0'/2147483647'",
                    chainCode: "138f0b2551bcafeca6ff2aa88ba8ed0ed8de070841f0c4ef0165df8181eaad7f",
                    key: "ea4f5bfe8694d8bb74b7b59404632fd5968b774ed545e810de9c32a4fb4192f4",
                    publicKey: "48UbDWRqWih7asE3HhNXQga938P5KeVKxguJtmccL72ZuhnxsZJ",
                },
                {
                    path: "m/0'/2147483647'/1'",
                    chainCode: "73bd9fff1cfbde33a1b846c27085f711c0fe2d66fd32e139d3ebc28e5a4a6b90",
                    key: "3757c7577170179c7868353ada796c839135b3d30554bbb74a4b1e4a5a58505c",
                    publicKey: "488ffCAEuPeohnEbMUiwVcMd4EN3fm1gTDPqKGLBmwsWqY43Fs6",
                },
                {
                    path: "m/0'/2147483647'/1'/2147483646'",
                    chainCode: "0902fe8a29f9140480a00ef244bd183e8a13288e4412d8389d140aac1794825a",
                    key: "5837736c89570de861ebc173b1086da4f505d4adb387c6a1b1342d5e4ac9ec72",
                    publicKey: "49WJowzXRaxyKLoxAnsmdsukWgpYyKXVmrVdV6mQkJUNtvsXBHk",
                },
                {
                    path: "m/0'/2147483647'/1'/2147483646'/2'",
                    chainCode: "5d70af781f3a37b829f0d060924d5e960bdc02e85423494afc0b1a41bbe196d4",
                    key: "551d333177df541ad876a60ea71f00447931c0a9da16f227c11ea080d7391b8d",
                    publicKey: "48KY7AMCKaY37727JU9iTv8M1P7nKw3EDhggdjNuivTK9N1fpP3",
                },
            ];
            vector2.forEach(function (vector) {
                it("should valid for " + vector.path, function () {
                    var hdKey = key_1.HDKey.fromMasterSeed(Buffer.from(vector2Seed, "hex"));
                    var derived = hdKey.derive(vector.path);
                    expect({
                        path: vector.path,
                        key: derived.key().toString("hex"),
                        chainCode: derived.chainCode().toString("hex"),
                        publicKey: derived
                            .privateKey()
                            .publicKey()
                            .toBase58(),
                    }).to.deep.equal(vector);
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC91bml0L2tleS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLCtCQUFrQztBQUNsQyxxQ0FRdUI7QUFDdkIsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLDREQUFzQztBQUN0QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBRTNCLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFDbEIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDdkIsa0VBQWtFLEVBQ2xFLEtBQUssQ0FDTCxDQUFDO0lBRUYsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUN2QixRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxxRUFBcUUsRUFBRTtnQkFDekUsSUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBVSxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FDRCwwREFBMEQ7Z0JBQ3pELHFCQUFxQixFQUN0QjtnQkFDQyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQyxJQUFNLEVBQUUsR0FBRyxJQUFJLGdCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksZ0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZ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