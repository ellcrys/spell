import flaverr = require("flaverr");

export function wrapErr(err: { message: string, code?: string }, msg: string) {
	const e = flaverr(err.code, new Error(err.message));
	e.message = e.message + ` -> ${msg}`;
	return e;
}

function e(msg: string) {
	return new Error(msg);
}

export default {
	ClientConnect: flaverr("CLIENT_CONNECT_FAILED", e("failed to connect to client")),
	RPCCallError: flaverr("RPC_CALL_FAILED", e("method returned an error")),
	ClientNotInitialized: flaverr("CLIENT_UNINITIALIZED", e("RPC client not initialized")),
};
