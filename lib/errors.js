"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flaverr = require("flaverr");
function wrapErr(err, msg) {
    var e = flaverr(err.code, new Error(err.message));
    e.message = e.message + (" -> " + msg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYi9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBb0M7QUFFcEMsU0FBZ0IsT0FBTyxDQUFDLEdBQXVDLEVBQUUsR0FBVztJQUMzRSxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUcsU0FBTyxHQUFLLENBQUEsQ0FBQztJQUNyQyxPQUFPLENBQUMsQ0FBQztBQUNWLENBQUM7QUFKRCwwQkFJQztBQUVELFNBQVMsQ0FBQyxDQUFDLEdBQVc7SUFDckIsT0FBTyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRUQsa0JBQWU7SUFDZCxhQUFhLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2pGLFlBQVksRUFBRSxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDdkUsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0NBQ3RGLENBQUMifQ==