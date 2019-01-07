import flaverr = require("flaverr");

export function wrapErr(err: Error, msg: string) {
	err.message = err.message + ` -> ${msg}`;
	return err;
}

export default {
	ClientConnect: flaverr("ERR_CLIENT_CONNECT", new Error("failed to connect to client")),
	RPCCallError: flaverr("ERR_RPC_CALL", new Error("method returned an error")),
};
