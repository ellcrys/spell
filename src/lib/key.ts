/**
 * @module Key
 */

import crypto = require("crypto");
const { SHA3 } = require("sha3");
const RIPEMD160 = require("ripemd160");
const b58 = require("bs58check");
import createHmac from "create-hmac";
import nacl from "tweetnacl";
import { CurveKeyPair } from "../..";
import errors from "./errors";

export const AddressVersion = Buffer.from([92]);
export const PublicKeyVersion = Buffer.from([93]);
export const PrivateKeyVersion = Buffer.from([94]);

const HARDENED_OFFSET = 0x80000000;
const ED25519_CURVE = "ed25519 seed";
const pathRegex = new RegExp("^m(\\/[0-9]+')+$");
const replaceDerive = (val: string): string => val.replace("'", "");

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
	 * Instantiate a PrivateKey from a base58
	 * encoded private key string
	 *
	 * @static
	 * @param {string} str The base58 encoded private keys
	 * @returns {PrivateKey}
	 * @throws InvalidPrivateKeyChecksum|InvalidPrivateKeyVersion|InvalidPrivateKeySize
	 * @memberof PrivateKey
	 */
	public static from(str: string): PrivateKey {
		let decoded: Buffer;

		try {
			decoded = b58.decode(str);
		} catch (e) {
			throw errors.InvalidPrivateKeyChecksum;
		}

		if (decoded[0] !== PrivateKeyVersion[0]) {
			throw errors.InvalidPrivateKeyVersion;
		}

		if (decoded.length !== 65) {
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
	public static fromBuffer(buf: Buffer): PrivateKey {
		if (buf[0] !== PrivateKeyVersion[0]) {
			throw errors.InvalidPrivateKeyVersion;
		}

		if (buf.length !== 65) {
			throw errors.InvalidPrivateKeySize;
		}

		const pk = buf.slice(33);
		const o = new PrivateKey();
		o.keypair.privateKey.set(buf.slice(1));
		o.keypair.publicKey.set(pk);

		return o;
	}
	/**
	 * The ED25519 key material
	 *
	 * @private
	 * @type {ed25519.CurveKeyPair}
	 * @memberof PrivateKey
	 */
	private keypair: CurveKeyPair;

	/**
	 * Creates an instance of PrivateKey.
	 * @param {Buffer} seed 32-byte seed used to create the key
	 * @memberof PrivateKey
	 */
	constructor(seed?: Buffer) {
		// If seed is not provided, we go
		// on to generate a random seed
		if (!seed || seed.length === 0) {
			seed = crypto.randomBytes(32);
		}

		const keypair = nacl.sign.keyPair.fromSeed(seed);
		this.keypair = {
			privateKey: Buffer.from(keypair.secretKey),
			publicKey: Buffer.from(keypair.publicKey),
		};
	}

	/**
	 * Sign a message
	 *
	 * @param {Buffer} data The message
	 * @returns {Buffer}
	 * @memberof PrivateKey
	 */
	public sign(data: Buffer): Buffer {
		return Buffer.from(nacl.sign.detached(data, this.keypair.privateKey));
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
	public publicKey(): PublicKey {
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
}

/**
 * PublicKey represents an ED25519
 * public key
 *
 * @export
 * @class PublicKey
 */
// tslint:disable-next-line:max-classes-per-file
export class PublicKey {
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
	public static fromBuffer(buf: Buffer): PublicKey {
		if (buf[0] !== PublicKeyVersion[0]) {
			throw errors.InvalidPublicKeyVersion;
		}

		if (buf.length !== 33) {
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
	public static from(str: string): PublicKey {
		let decoded: Buffer;

		try {
			decoded = b58.decode(str);
		} catch (e) {
			throw errors.InvalidPublicKeyChecksum;
		}

		if (decoded[0] !== PublicKeyVersion[0]) {
			throw errors.InvalidPublicKeyVersion;
		}

		if (decoded.length !== 33) {
			throw errors.InvalidPublicKeySize;
		}

		const o = new PublicKey();
		o.pk = decoded.slice(1);

		return o;
	}
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
		const addr = b58.encode(Buffer.concat([AddressVersion, ripHash]));
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
		return nacl.sign.detached.verify(msg, sig, this.pk);
	}
}

/**
 * Address represents a compressed
 * equivalent of a public key used
 * as an address for transacting.
 *
 * @class Address
 */
// tslint:disable-next-line:max-classes-per-file
export class Address {
	/**
	 * Check whether an address is valid
	 *
	 * @static
	 * @param {string} address The address to check
	 * @returns {boolean}
	 * @memberof Address
	 */
	public static isValid(address: string): boolean {
		try {
			const decoded = b58.decode(address);
			if (decoded[0] !== AddressVersion[0] || decoded.length !== 21) {
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
	public static getValidationError(address: string): null | Error {
		try {
			const decoded = b58.decode(address);
			if (decoded[0] !== AddressVersion[0]) {
				return errors.InvalidAddressVersion;
			}
			if (decoded.length !== 21) {
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
	public static from(address: string): Address {
		if (!this.isValid(address)) {
			throw errors.InvalidAddress;
		}
		const addr = new Address();
		addr.address = address;
		return addr;
	}
	/**
	 * The loaded address
	 *
	 * @private
	 * @type {string}
	 * @memberof Address
	 */
	private address: string;

	/**
	 * Return a string format of the address
	 *
	 * @memberof Address
	 */
	public toString = (): string => {
		return this.address;
	}
}

/**
 * Checks whether an HDKey path is
 * valid
 *
 * @export
 * @param {string} path The path to check
 * @returns {boolean}
 */
export function isValidPath(path: string): boolean {
	if (!pathRegex.test(path)) {
		return false;
	}
	return !path
		.split("/")
		.slice(1)
		.map(replaceDerive)
		.some(isNaN as any);
}

/**
 * HDKey provides the ability to create
 * hierarchical deterministic keys.
 *
 * @export
 * @class HDKey
 */
// tslint:disable-next-line:max-classes-per-file
export class HDKey {
	/**
	 * Create an HDKey from a seed.
	 *
	 * @static
	 * @param {Buffer} seed
	 * @returns {Node}
	 * @memberof HDKey
	 */
	public static fromMasterSeed(seed: Buffer): HDKey {
		const hmac = createHmac("sha512", ED25519_CURVE);
		const I = hmac.update(seed).digest();
		const IL = I.slice(0, 32);
		const IR = I.slice(32);
		hmac.end();
		return new HDKey(IL, IR);
	}
	private mKey: Buffer;
	private mChainCode: Buffer;

	/**
	 * Creates an instance of HDKey.
	 * @param {Buffer} key Left half of the hmac digest
	 * @param {Buffer} chainCode Right half of the hmac digest
	 * @memberof HDKey
	 */
	constructor(key: Buffer, chainCode: Buffer) {
		this.mKey = key;
		this.mChainCode = chainCode;
	}

	/**
	 * Return the derived key
	 *
	 * @returns {Buffer}
	 * @memberof HDKey
	 */
	public key(): Buffer {
		return this.mKey;
	}

	/**
	 * Return the derived chain code
	 *
	 * @returns {Buffer}
	 * @memberof HDKey
	 */
	public chainCode(): Buffer {
		return this.mChainCode;
	}

	/**
	 * Child key derivation function
	 *
	 * @param {Buffer} key The parent key
	 * @param {Buffer} chainCode The parent chain code
	 * @param {number} index The key index
	 * @returns {HDKey}
	 * @memberof HDKey
	 */
	public ckd(key: Buffer, chainCode: Buffer, index: number): HDKey {
		const indexBuffer = Buffer.allocUnsafe(4);
		indexBuffer.writeUInt32BE(index, 0);
		const data = Buffer.concat([Buffer.alloc(1, 0), key, indexBuffer]);
		const I = createHmac("sha512", chainCode)
			.update(data)
			.digest();
		const IL = I.slice(0, 32);
		const IR = I.slice(32);
		return new HDKey(IL, IR);
	}

	/**
	 * Given a path, derive a child key. Path
	 * must contain only hardened indices
	 *
	 * @param {string} path The derivation path
	 * @returns {HDKey}
	 * @memberof HDKey
	 */
	public derive(path: string): HDKey {
		if (!isValidPath(path)) {
			throw new Error("Invalid derivation path");
		}

		const segments = path
			.split("/")
			.slice(1)
			.map(replaceDerive)
			.map((el) => parseInt(el, 10));

		return segments.reduce((parentKey: HDKey, segment: number) => {
			return this.ckd(
				parentKey.mKey,
				parentKey.mChainCode,
				segment + HARDENED_OFFSET,
			);
		}, this);
	}

	/**
	 * Get the private key created using the
	 * derived key
	 *
	 * @returns {PrivateKey}
	 * @memberof HDKey
	 */
	public privateKey(): PrivateKey {
		return new PrivateKey(this.mKey);
	}
}
