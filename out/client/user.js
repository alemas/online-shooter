"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_manager_1 = require("./socket/socket-manager");
var User = /** @class */ (function () {
    function User() {
    }
    Object.defineProperty(User, "id", {
        get: function () {
            return socket_manager_1.SocketManager.socketId != null ? socket_manager_1.SocketManager.socketId : "";
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map