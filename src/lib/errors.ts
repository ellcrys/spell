/**
 * @module Errors
 */

const flaverr = require("flaverr");

export function wrapErr(err: { message: string; code?: string }, msg: string) {
	const newErr = flaverr(err.code, new Error(err.message));
	newErr.message = newErr.message + ` -> ${msg}`;
	return newErr;
}

function e(msg: string) {
	return new Error(msg);
}

export default {
	ClientConnect: flaverr("CLIENT_CONNECT_FAILED", e("Failed to connect to client")),
	AuthRequired: flaverr("AUTH_REQUIRED", e("Authorization is required")),
	AuthError: flaverr("AUTH_FAILED", e("Session token request failed")),
	SessionTokenExpired: flaverr("SESSION_TOKEN_EXPIRED", e("Session token has expired")),
	RPCCallError: flaverr("RPC_CALL_FAILED", e("Method returned an error")),
	ClientNotInitialized: flaverr(
		"CLIENT_UNINITIALIZED",
		e("RPC client not initialized"),
	),
	InvalidAddress: flaverr("INVALID_ADDRESS", e("Address is not valid")),
	InvalidAddressVersion: flaverr(
		"INVALID_ADDR_VERSION",
		e("Address's version is invalid"),
	),
	InvalidAddressSize: flaverr(
		"INVALID_ADDR_SIZE",
		e("Address size is invalid. Expected 21 bytes"),
	),
	InvalidAddressFormat: flaverr("INVALID_FORMAT", e("Failed to decode address")),
	InvalidPrivateKeyChecksum: flaverr(
		"INVALID_PRIVATE_KEY_CHECKSUM",
		e("Private key checksum is not valid"),
	),
	InvalidPrivateKeyVersion: flaverr(
		"INVALID_PRIVATE_KEY_VERSION",
		e("Private key version is invalid"),
	),
	InvalidPrivateKeySize: flaverr(
		"INVALID_PRIVATE_KEY_SIZE",
		e("Private key has unexpected size"),
	),
	InvalidPublicKeyChecksum: flaverr(
		"INVALID_PUBLIC_KEY_CHECKSUM",
		e("Public key checksum is not valid"),
	),
	InvalidPublicKeyVersion: flaverr(
		"INVALID_PUBLIC_KEY_VERSION",
		e("Public key version is invalid"),
	),
	InvalidPublicKeySize: flaverr(
		"INVALID_PUBLIC_KEY_SIZE",
		e("Public key has unexpected size"),
	),
	RequirePrivateKey: flaverr("PRIVATE_KEY_REQUIRED", e("Private key is required")),
	UnknownSenderAccount: flaverr(
		"UNKNOWN_SENDER_ACCOUNT",
		e("Sender account not found"),
	),
};
