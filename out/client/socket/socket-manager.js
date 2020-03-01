"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var user_1 = require("../user");
var SocketManager = /** @class */ (function () {
    function SocketManager() {
    }
    SocketManager.init = function () {
        this.socket = socket_io_client_1.default();
        this.userData = { username: user_1.User.username, id: user_1.User.id };
    };
    Object.defineProperty(SocketManager, "socketId", {
        get: function () {
            return this.socket.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Base method for sending messages to the server via Socket.io
     * @param eventName Event name to be sent to the server
     * @param data Optional data accompanying the event
     */
    SocketManager.send = function (eventName, data) {
        this.socket.emit(eventName, data);
    };
    /**
     * @description Informs the server a new user has entered.
     */
    SocketManager.sendNewUser = function () {
        SocketManager.send("newUser", this.userData);
    };
    /**
     * @description Sends a message to global chat
     * @param message
     */
    SocketManager.sendMessage = function (message) {
        var data = { sender: this.userData, message: message };
        SocketManager.send("message", data);
    };
    return SocketManager;
}());
exports.SocketManager = SocketManager;
//# sourceMappingURL=socket-manager.js.map