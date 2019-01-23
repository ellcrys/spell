import crypto = require("crypto");
import ed25519 = require("ed25519");
const SHA3 = require("sha3");
const RIPEMD160 = require("ripemd160");
const b58 = require("bs58check");
import errors from "./errors";

export const AddressVersion = Buffer.from([92]);
export const PublicKeyVersion = Buffer.from([93]);
export const PrivateKeyVersion = Buffer.from([94]);

/**
 * PrivateKey represents an Ed25519
 * key use for constructing an Ellcrys
 * address, signing and verifying a
 * signed messages.
 *
 * @export
 * @class PrivateKey
 */
export class PrivateKey {
	/**
	 * The ED25519 key material
	 *
	 * @private
	 * @type {ed25519.CurveKeyPair}
	 * @memberof PrivateKey
	 */
	private keypair: ed25519.CurveKeyPair;

	/**
	 * Creates an instance of PrivateKey.
	 * @param {Buffer} seed Random seed used ro create the key
	 * @memberof PrivateKey
	 */
	constructor(seed?: Buffer) {
		// If seed is not provided, we go
		// on to generate a random seed
		if (!seed || seed.length == 0) {
			seed = crypto.randomBytes(32);
		}

		this.keypair = ed25519.MakeKeypair(seed);
	}

	/**
	 * Sign a message
	 *
	 * @param {Buffer} data The message
	 * @returns {Buffer}
	 * @memberof PrivateKey
	 */
	public sign(data: Buffer): Buffer {
		return ed25519.Sign(data, this.keypair);
	}

	/**
	 * Returns an address derived from
	 * the private key
	 *
	 * @returns {Address}
	 * @memberof PrivateKey
	 */
	public toAddress(): Address {
		return this.publicKey().toAddress();
	}

	/**
	 * Returns the public key.
	 *
	 * @returns {PublicKey}
	 * @memberof PrivateKey
	 */
	publicKey(): PublicKey {
		return PublicKey.fromBuffer(
			Buffer.concat([PublicKeyVersion, this.keypair.publicKey]),
		);
	}

	/**
	 * Returns base58 encode string of the private key
	 *
	 * @returns {string}
	 * @memberof PrivateKey
	 */
	public toBase58(): string {
		return b58.encode(Buffer.concat([PrivateKeyVersion, this.keypair.privateKey]));
	}

	/**
	 * Returns the private key as a buffer.
	 * The base58 version is added as the 0th
	 * byte in the returned buffer
	 *
	 * @returns {Buffer}
	 * @memberof PrivateKey
	 */
	public toBuffer(): Buffer {
		return Buffer.concat([PrivateKeyVersion, this.keypair.privateKey]);
	}

	/**
	 * Instantiate a PrivateKey from a base58
	 * encoded private key string
	 *
	 * @static
	 * @param {string} str The base58 encoded private keys
	 * @returns {PrivateKey}
	 * @throws InvalidPrivateKeyChecksum|InvalidPrivateKeyVersion|InvalidPrivateKeySize
	 * @memberof PrivateKey
	 */
	static from(str: string): PrivateKey {
		let decoded: Buffer;

		try {
			decoded = b58.decode(str);
		} catch (e) {
			throw errors.InvalidPrivateKeyChecksum;
		}

		if (decoded[0] !== PrivateKeyVersion[0]) {
			throw errors.InvalidPrivateKeyVersion;
		}

		if (decoded.length != 65) {
			throw errors.InvalidPrivateKeySize;
		}

		const pk = decoded.slice(33);
		const o = new PrivateKey();
		o.keypair.privateKey.set(decoded.slice(1));
		o.keypair.publicKey.set(pk);

		return o;
	}

	/**
	 * Instantiate a PrivateKey from a buffer.
	 * The buffer's 0th index must contain the
	 * private key version.
	 *
	 * @static
	 * @param {Buffer} buf
	 * @returns {PrivateKey}
	 * @memberof PrivateKey
	 */
	static fromBuffer(buf: Buffer): PrivateKey {
		if (buf[0] !== PrivateKeyVersion[0]) {
			throw errors.InvalidPrivateKeyVersion;
		}

		if (buf.length != 65) {
			throw errors.InvalidPrivateKeySize;
		}

		const pk = buf.slice(33);
		const o = new PrivateKey();
		o.keypair.privateKey.set(buf.slice(1));
		o.keypair.publicKey.set(pk);

		return o;
	}
}

/**
 * PublicKey represents an ED25519
 * public key
 *
 * @export
 * @class PublicKey
 */
export class PublicKey {
	private pk: Buffer;

	/**
	 * Returns base58 encode string of the public key
	 *
	 * @returns {string}
	 * @memberof PublicKey
	 */
	public toBase58(): string {
		return b58.encode(Buffer.concat([PublicKeyVersion, this.pk]));
	}

	/**
	 * Returns the public key as a buffer.
	 * The public key version is added as the 0th
	 * byte in the returned buffer
	 *
	 * @returns {Buffer}
	 * @memberof PublicKey
	 */
	public toBuffer(): Buffer {
		return Buffer.concat([PublicKeyVersion, this.pk]);
	}

	/**
	 * Returns an address derived from
	 * the public key
	 *
	 * @returns {Address}
	 * @memberof PublicKey
	 */
	public toAddress(): Address {
		const hash = new SHA3(256);
		hash.update(this.pk);
		const ripHash = new RIPEMD160().update(hash.digest()).digest();
		let addr = b58.encode(Buffer.concat([AddressVersion, ripHash]));
		return Address.from(addr);
	}

	/**
	 * Verify a signature
	 *
	 * @param {Buffer} msg The message that was signed
	 * @param {Buffer} sig The message's signature
	 * @returns {boolean}
	 * @memberof PublicKey
	 */
	public verify(msg: Buffer, sig: Buffer): boolean {
		return ed25519.Verify(msg, sig, this.pk);
	}

	/**
	 * Instantiate a PublicKey from a buffer.
	 * The buffer's 0th index must contain the
	 * public key version.
	 *
	 * @static
	 * @param {Buffer} buf
	 * @returns {PublicKey}
	 * @memberof PublicKey
	 */
	static fromBuffer(buf: Buffer): PublicKey {
		if (buf[0] !== PublicKeyVersion[0]) {
			throw errors.InvalidPublicKeyVersion;
		}

		if (buf.length != 33) {
			throw errors.InvalidPublicKeySize;
		}

		const o = new PublicKey();
		o.pk = buf.slice(1);
		return o;
	}

	/**
	 * Instantiate a PublicKey from a base58
	 * encoded public key string
	 *
	 * @static
	 * @param {string} str
	 * @returns {PublicKey}
	 * @throws InvalidPublicKeyChecksum|InvalidPublicKeyVersion|InvalidPublicKeySize
	 * @memberof PublicKey
	 */
	static from(str: string): PublicKey {
		let decoded: Buffer;

		try {
			decoded = b58.decode(str);
		} catch (e) {
			throw errors.InvalidPublicKeyChecksum;
		}

		if (decoded[0] !== PublicKeyVersion[0]) {
			throw errors.InvalidPublicKeyVersion;
		}

		if (decoded.length != 33) {
			throw errors.InvalidPublicKeySize;
		}

		const o = new PublicKey();
		o.pk = decoded.slice(1);

		return o;
	}
}

/**
 * Address represents a compressed
 * equivalent of a public key used
 * as an address for transacting.
 *
 * @class Address
 */
export class Address {
	/**
	 * The loaded address
	 *
	 * @private
	 * @type {string}
	 * @memberof Address
	 */
	private address: string;

	/**
	 * Check whether an address is valid
	 *
	 * @static
	 * @param {string} address The address to check
	 * @returns {boolean}
	 * @memberof Address
	 */
	static isValid(address: string): boolean {
		try {
			const decoded = b58.decode(address);
			if (decoded[0] !== AddressVersion[0] || decoded.length != 21) {
				return false;
			}
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Check whether a given address is valid.
	 * If not valid, the specific validation error
	 * is returned. It returns null if the address
	 * is valid.
	 *
	 * @static
	 * @param {string} address The address to check
	 * @returns {(null | Error)} InvalidAddressVersion |
	 * 			InvalidAddressSize }| InvalidAddressFormat
	 * @memberof Address
	 */
	static getValidationError(address: string): null | Error {
		try {
			const decoded = b58.decode(address);
			if (decoded[0] !== AddressVersion[0]) {
				return errors.InvalidAddressVersion;
			}
			if (decoded.length != 21) {
				return errors.InvalidAddressSize;
			}
			return null;
		} catch (error) {
			return errors.InvalidAddressFormat;
		}
	}

	/**
	 * Instantiate an Address instance from
	 * a given address string
	 *
	 * @static
	 * @param {string} address
	 * @returns {Address}
	 * @throws InvalidAddress
	 * @memberof Address
	 */
	static from(address: string): Address {
		if (!this.isValid(address)) {
			throw errors.InvalidAddress;
		}
		const addr = new Address();
		addr.address = address;
		return addr;
	}

	/**
	 * Return a string format of the address
	 *
	 * @memberof Address
	 */
	public toString = (): string => {
		return this.address;
	};
}
