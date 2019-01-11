import chai = require("chai");
import {
	PrivateKey,
	PrivateKeyVersion,
	PublicKeyVersion,
	PublicKey,
	Address,
	AddressVersion,
} from "../../lib/key";
import crypto = require("crypto");
import b58 = require("bs58check");
import errors from "../../lib/errors";
const expect = chai.expect;

describe.only("key.js", () => {
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
});
