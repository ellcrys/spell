"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flaverr = require("flaverr");
function wrapErr(err, msg) {
    const e = flaverr(err.code, new Error(err.message));
    e.message = e.message + ` -> ${msg}`;
    return e;
}
exports.wrapErr = wrapErr;
function e(msg) {
    return new Error(msg);
}
exports.default = {
    ClientConnect: flaverr("CLIENT_CONNECT_FAILED", e("failed to connect to client")),
    RPCCallError: flaverr("RPC_CALL_FAILED", e("method returned an error")),
    ClientNotInitialized: flaverr("CLIENT_UNINITIALIZED", e("RPC client not initialized")),
};
