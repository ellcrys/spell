import chai = require("chai");
import crypto = require("crypto");
import {
	Address,
	AddressVersion,
	HDKey,
	PrivateKey,
	PrivateKeyVersion,
	PublicKey,
	PublicKeyVersion,
} from "../../lib/key";
const b58 = require("bs58check");
import errors from "../../lib/errors";
const expect = chai.expect;

describe("key.js", () => {
	const seed = Buffer.from(
		"88d77c155018020e13d206f5f31c22d096e64a6a75c2498fec4d64e927c017e0",
		"hex",
	);

	describe("#PrivateKey", () => {
		describe(".constructor", () => {
			it("should instantiate a PrivateKey without an explicitly provided seed", () => {
				const pk = new PrivateKey();
				expect(pk).to.not.eq(undefined);
			});

			it("should instantiate 2 PrivateKeys with the same seed and get same PrivateKey", () => {
				const seed = crypto.randomBytes(32);
				const pk = new PrivateKey(seed);
				const pk2 = new PrivateKey(seed);
				expect(pk.toBuffer().equals(pk2.toBuffer())).to.be.true;
			});
		});

		describe(".sign", () => {
			it("should successfully sign a message and return 64 bytes signature", () => {
				const pk = new PrivateKey();
				const msg = Buffer.from("hello");
				const sig = pk.sign(msg);
				expect(sig).to.have.lengthOf(64);
			});
		});

		describe(".toAddress", () => {
			it("should return expected address", () => {
				const pk = new PrivateKey(seed);
				expect(pk.toAddress().toString()).to.eq(
					"eACBPYvf434jVcZoHfKs3b7fxcbs5N41eJ",
				);
			});
		});

		describe(".publicKey", () => {
			it("should return a public key", () => {
				const pk = new PrivateKey(seed);
				expect(pk.publicKey()).to.not.be.undefined;
			});
		});

		describe(".toBase58", () => {
			let actual: string;

			beforeEach(() => {
				const pk = new PrivateKey(seed);
				actual = pk.toBase58();
			});

			it("should return a valid base58 string of length 65", () => {
				expect(b58.decode(actual)).to.have.lengthOf(65);
			});

			it("should have the 0th index equal the private key version", () => {
				expect(b58.decode(actual)[0]).to.eql(PrivateKeyVersion[0]);
			});
		});

		describe(".toBuffer", () => {
			let actual: Buffer;

			beforeEach(() => {
				const pk = new PrivateKey(seed);
				actual = pk.toBuffer();
			});

			it("should return a length 65", () => {
				expect(actual).to.have.lengthOf(65);
			});

			it("should have the 0th index equal the private key version", () => {
				expect(actual[0]).to.eql(PrivateKeyVersion[0]);
			});
		});

		describe(".from", () => {
			it("should throw InvalidPrivateKeyChecksum when base58checksum fails", () => {
				const invalid = "wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysd";
				expect(() => {
					PrivateKey.from(invalid);
				}).to.throw(errors.InvalidPrivateKeyChecksum);
			});

			it("should throw InvalidPrivateKeyVersion when private key version is missing", () => {
				const invalid = b58.encode(Buffer.from("missing_version_prefix"));
				expect(() => {
					PrivateKey.from(invalid);
				}).to.throw(errors.InvalidPrivateKeyVersion);
			});

			it("should throw InvalidPrivateKeySize when key not 65 bytes", () => {
				const invalid = b58.encode(
					Buffer.concat([PrivateKeyVersion, Buffer.from([49, 49])]),
				);
				expect(() => {
					PrivateKey.from(invalid);
				}).to.throw(errors.InvalidPrivateKeySize);
			});

			it("should successfully return expected key", () => {
				const key =
					"wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysEPUcAPcCTQ7zF2HDF9k8rGcnddF9V9GJHmTrazYTMgYh3EK9wAWEJ3qvXixnd";
				const pk = PrivateKey.from(key);
				expect(pk.toBase58()).to.eql(key);
			});

			it("should successfully return expected key", () => {
				const key =
					"wbAELmhPDqRg9dkdiyBgcN44bTZxSv4ysEPUcAPcCTQ7zF2HDF9k8rGcnddF9V9GJHmTrazYTMgYh3EK9wAWEJ3qvXixnd";
				const pk = PrivateKey.from(key);
				expect(pk.toBase58()).to.eql(key);
			});
		});

		describe(".fromBuffer", () => {
			it("should throw InvalidPrivateKeyVersion when private key version is missing", () => {
				const invalid = Buffer.from("missing_version_prefix");
				expect(() => {
					PrivateKey.fromBuffer(invalid);
				}).to.throw(errors.InvalidPrivateKeyVersion);
			});

			it("should throw InvalidPrivateKeySize when key not 65 bytes", () => {
				const invalid = Buffer.concat([PrivateKeyVersion, Buffer.from([49, 39])]);
				expect(() => {
					PrivateKey.fromBuffer(invalid);
				}).to.throw(errors.InvalidPrivateKeySize);
			});

			it("should successfully return expected key", () => {
				const buf = new PrivateKey(seed).toBuffer();
				const pk = PrivateKey.fromBuffer(buf);
				expect(pk.toBuffer().equals(buf)).to.be.true;
			});
		});
	});

	describe("#PublicKey", () => {
		describe(".toBase58", () => {
			it("should return valid base58 with length of 51", () => {
				const pubKey = new PrivateKey().publicKey();
				const result = pubKey.toBase58();
				expect(result).to.have.lengthOf(51);
			});

			specify("that the decoded base58 public key should have length of 33", () => {
				const pubKey = new PrivateKey().publicKey();
				const result = pubKey.toBase58();
				const decoded = b58.decode(result);
				expect(decoded).to.have.lengthOf(33);
			});

			specify(
				"that the decoded base58 public key should 0th index equal public key version",
				() => {
					const pubKey = new PrivateKey().publicKey();
					const result = pubKey.toBase58();
					const decoded = b58.decode(result);
					expect(decoded[0]).to.eql(PublicKeyVersion[0]);
				},
			);
		});

		describe(".toBuffer", () => {
			it("should have size of 33", () => {
				const pubKey = new PrivateKey().publicKey();
				const buf = pubKey.toBuffer();
				expect(buf).to.have.lengthOf(33);
			});

			specify("that the decoded the 0th index equal public key version", () => {
				const pubKey = new PrivateKey().publicKey();
				const buf = pubKey.toBuffer();
				expect(buf[0]).to.eql(PublicKeyVersion[0]);
			});
		});

		describe(".toAddress", () => {
			it("should return expected address", () => {
				const pubKey = new PrivateKey(seed).publicKey();
				const addr = pubKey.toAddress();
				expect(addr.toString()).to.eql("eACBPYvf434jVcZoHfKs3b7fxcbs5N41eJ");
			});
		});

		describe(".verify", () => {
			it("should successfully verify signature", () => {
				const privKey = new PrivateKey(seed);
				const pubKey = new PrivateKey(seed).publicKey();
				const msg = Buffer.from("hello");
				const sig = privKey.sign(msg);
				expect(pubKey.verify(msg, sig)).to.be.true;
			});
		});

		describe(".fromBuffer", () => {
			it("should throw InvalidPublicKeyVersion when public key version is missing", () => {
				const invalid = Buffer.from("missing_version_prefix");
				expect(() => {
					PublicKey.fromBuffer(invalid);
				}).to.throw(errors.InvalidPublicKeyVersion);
			});

			it("should throw InvalidPublicKeySize when public key version is missing", () => {
				const invalid = Buffer.concat([PublicKeyVersion, Buffer.from([49, 39])]);
				expect(() => {
					PublicKey.fromBuffer(invalid);
				}).to.throw(errors.InvalidPublicKeySize);
			});

			it("should successfully return a public key instance", () => {
				const key = new PrivateKey(seed);
				const pk = key.publicKey().toBuffer();
				const pk2 = PublicKey.fromBuffer(pk);
				expect(pk.equals(pk2.toBuffer())).to.be.true;
			});
		});

		describe(".from", () => {
			it("should throw InvalidPublicKeyChecksum when public key fail base58 checksum check", () => {
				const invalid = "invalid_base58";
				expect(() => {
					PublicKey.from(invalid);
				}).to.throw(errors.InvalidPublicKeyChecksum);
			});

			it("should throw InvalidPublicKeyVersion when public key version is missing", () => {
				const invalid = b58.encode(Buffer.from("missing_version_prefix"));
				expect(() => {
					PublicKey.from(invalid);
				}).to.throw(errors.InvalidPublicKeyVersion);
			});

			it("should throw InvalidPublicKeySize when public key version is missing", () => {
				const invalid = b58.encode(
					Buffer.concat([PublicKeyVersion, Buffer.from([49, 39])]),
				);
				expect(() => {
					PublicKey.from(invalid);
				}).to.throw(errors.InvalidPublicKeySize);
			});

			it("should successfully return a public key instance", () => {
				const key = new PrivateKey(seed);
				const pk = b58.encode(key.publicKey().toBuffer());
				const pk2 = PublicKey.from(pk);
				expect(pk2.toBase58()).to.eql(pk);
			});
		});

		describe("#Address", () => {
			describe(".isValid", () => {
				it("should return false when the address format is invalid", () => {
					const valid = Address.isValid("abc_invalid");
					expect(valid).to.be.false;
				});

				it("should return false when the address does not have expected address version", () => {
					const addr = b58.encode(Buffer.from("invalid"));
					const valid = Address.isValid(addr);
					expect(valid).to.be.false;
				});

				it("should return false when the address decoded size is not 21", () => {
					const addr = b58.encode(
						Buffer.concat([AddressVersion, Buffer.from([34, 56])]),
					);
					const valid = Address.isValid(addr);
					expect(valid).to.be.false;
				});

				it("should return true when the address is valid", () => {
					const valid = Address.isValid("eFisKfHuMY5mYyTbLMq9aLSUL7obyRwDsb");
					expect(valid).to.be.true;
				});
			});

			describe(".getValidationError", () => {
				it("should return InvalidAddressFormat when the address format is invalid", () => {
					const err = Address.getValidationError("abc_invalid");
					expect(err).to.eql(errors.InvalidAddressFormat);
				});

				it("should return InvalidAddressVersion when the address does not have address version", () => {
					const addr = b58.encode(Buffer.from("invalid"));
					const err = Address.getValidationError(addr);
					expect(err).to.eql(errors.InvalidAddressVersion);
				});

				it("should return InvalidAddressSize when the address decoded size is not 21", () => {
					const addr = b58.encode(
						Buffer.concat([AddressVersion, Buffer.from([34, 56])]),
					);
					const err = Address.getValidationError(addr);
					expect(err).to.eql(errors.InvalidAddressSize);
				});

				it("should return null when address is valid", () => {
					const addr = "eFisKfHuMY5mYyTbLMq9aLSUL7obyRwDsb";
					const err = Address.getValidationError(addr);
					expect(err).to.eql(null);
				});
			});
		});
	});

	describe("#Address", () => {
		describe(".from", () => {
			it("should throw InvalidAddress error if address is invalid", () => {
				expect(() => {
					Address.from("abc");
				}).to.throw("Address is not valid");
			});
		});
	});

	describe("#HDKey", () => {
		describe(".derive", () => {
			it("should throw error when path is invalid", () => {
				expect(() =>
					HDKey.fromMasterSeed(Buffer.from("ahdhhd")).derive("xyz"),
				).to.throw("Invalid derivation path");
			});

			it("should not throw error", () => {
				expect(
					HDKey.fromMasterSeed(Buffer.from("ahdhhd")).derive("m/0'"),
				).to.be.instanceOf(HDKey);
			});
		});

		// tslint:disable-next-line:max-line-length
		// https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-1-for-ed25519
		describe("vector 1", () => {
			const vector1Seed = "000102030405060708090a0b0c0d0e0f";
			const vector1 = [
				{
					path: "m/0'",
					chainCode:
						"8b59aa11380b624e81507a27fedda59fea6d0b779a778918a2fd3590e16e9c69",
					key:
						"68e0fe46dfb67e368c75379acec591dad19df3cde26e63b93a8e704f1dade7a3",
					publicKey: "48r8J9w1pX6qSHiUf3ZFHNdqY2MVRbaeQTjigrULhm4nGWxDQsF",
				},
				{
					path: "m/0'/1'",
					chainCode:
						"a320425f77d1b5c2505a6b1b27382b37368ee640e3557c315416801243552f14",
					key:
						"b1d0bad404bf35da785a64ca1ac54b2617211d2777696fbffaf208f746ae84f2",
					publicKey: "47yL3xthVPfibaWkChqLfhTUZ5NQGSuBVMx9opMgnRaAqqdXeC7",
				},
				{
					path: "m/0'/1'/2'",
					chainCode:
						"2e69929e00b5ab250f49c3fb1c12f252de4fed2c1db88387094a0f8c4c9ccd6c",
					key:
						"92a5b23c0b8a99e37d07df3fb9966917f5d06e02ddbd909c7e184371463e9fc9",
					publicKey: "4978DRppNZH82mB9KkuZHGLWBfkpBZMveQFV7pDWqRFgc8HNXvX",
				},
				{
					path: "m/0'/1'/2'/2'",
					chainCode:
						"8f6d87f93d750e0efccda017d662a1b31a266e4a6f5993b15f5c1f07f74dd5cc",
					key:
						"30d1dc7e5fc04c31219ab25a27ae00b50f6fd66622f6e9c913253d6511d1e662",
					publicKey: "48qL5ZEHxoWSJjuVtAuwqMG6NMWNnmzjtSzWnoAY8RtgJ6QsBRk",
				},
				{
					path: "m/0'/1'/2'/2'/1000000000'",
					chainCode:
						"68789923a0cac2cd5a29172a475fe9e0fb14cd6adb5ad98a3fa70333e7afa230",
					key:
						"8f94d394a8e8fd6b1bc2f3f49f5c47e385281d5c17e65324b0f62483e37e8793",
					publicKey: "48EihmFPt4vfFvfmvvA2PwmGk1HHdEGrWHWwrxcDH7EtPY52oM1",
				},
			];

			vector1.forEach((vector) => {
				it(`should valid for ${vector.path}`, () => {
					const hdKey = HDKey.fromMasterSeed(Buffer.from(vector1Seed, "hex"));
					const derived = hdKey.derive(vector.path);

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

		describe("vector 2", () => {
			// tslint:disable-next-line:max-line-length
			// https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-2-for-ed25519
			const vector2Seed =
				"fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29" +
				"f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542";
			const vector2 = [
				{
					path: "m/0'",
					chainCode:
						"0b78a3226f915c082bf118f83618a618ab6dec793752624cbeb622acb562862d",
					key:
						"1559eb2bbec5790b0c65d8693e4d0875b1747f4970ae8b650486ed7470845635",
					publicKey: "48ogGovUb27TDgpbMAVbxFPve6a7hkABZQj2Be1bQeLutTkNCqz",
				},
				{
					path: "m/0'/2147483647'",
					chainCode:
						"138f0b2551bcafeca6ff2aa88ba8ed0ed8de070841f0c4ef0165df8181eaad7f",
					key:
						"ea4f5bfe8694d8bb74b7b59404632fd5968b774ed545e810de9c32a4fb4192f4",
					publicKey: "48UbDWRqWih7asE3HhNXQga938P5KeVKxguJtmccL72ZuhnxsZJ",
				},
				{
					path: "m/0'/2147483647'/1'",
					chainCode:
						"73bd9fff1cfbde33a1b846c27085f711c0fe2d66fd32e139d3ebc28e5a4a6b90",
					key:
						"3757c7577170179c7868353ada796c839135b3d30554bbb74a4b1e4a5a58505c",
					publicKey: "488ffCAEuPeohnEbMUiwVcMd4EN3fm1gTDPqKGLBmwsWqY43Fs6",
				},
				{
					path: "m/0'/2147483647'/1'/2147483646'",
					chainCode:
						"0902fe8a29f9140480a00ef244bd183e8a13288e4412d8389d140aac1794825a",
					key:
						"5837736c89570de861ebc173b1086da4f505d4adb387c6a1b1342d5e4ac9ec72",
					publicKey: "49WJowzXRaxyKLoxAnsmdsukWgpYyKXVmrVdV6mQkJUNtvsXBHk",
				},
				{
					path: "m/0'/2147483647'/1'/2147483646'/2'",
					chainCode:
						"5d70af781f3a37b829f0d060924d5e960bdc02e85423494afc0b1a41bbe196d4",
					key:
						"551d333177df541ad876a60ea71f00447931c0a9da16f227c11ea080d7391b8d",
					publicKey: "48KY7AMCKaY37727JU9iTv8M1P7nKw3EDhggdjNuivTK9N1fpP3",
				},
			];
			vector2.forEach((vector) => {
				it(`should valid for ${vector.path}`, () => {
					const hdKey = HDKey.fromMasterSeed(Buffer.from(vector2Seed, "hex"));
					const derived = hdKey.derive(vector.path);

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
