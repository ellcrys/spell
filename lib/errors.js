"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flaverr = require("flaverr");
function wrapErr(err, msg) {
    err.message = err.message + ` -> ${msg}`;
    return err;
}
exports.wrapErr = wrapErr;
exports.default = {
    ClientConnect: flaverr("ERR_CLIENT_CONNECT", new Error("failed to connect to client")),
    RPCCallError: flaverr("ERR_RPC_CALL", new Error("method returned an error")),
};
