"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var shooter_game_1 = require("./shooter-game");
var socket_manager_1 = require("./socket/socket-manager");
var game = new shooter_game_1.ShooterGame();
user_1.User.username = "Alemas";
socket_manager_1.SocketManager.init();
socket_manager_1.SocketManager.sendNewUser();
socket_manager_1.SocketManager.sendMessage("Alou meus irmaozinhos");
//# sourceMappingURL=app.js.map