import flaverr = require("flaverr");

export function wrapErr(err: { message: string; code?: string }, msg: string) {
	const e = flaverr(err.code, new Error(err.message));
	e.message = e.message + ` -> ${msg}`;
	return e;
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
};
