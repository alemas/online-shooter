"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default();
var port = 3000;
var server = require("http").Server(app);
var io = socket_io_1.default.listen(server, { serveClient: false });
app.use(express_1.default.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
server.listen(port, function () {
    console.log("Listening on port " + port);
});
io.on("connection", function (socket) {
    console.log("someone connected");
    socket.on("newUser", function (data) {
        console.log("User " + data.username + " connected\nUser id = " + data.id);
    });
    socket.on("message", function (data) {
        console.log(data.sender.username + ": " + data.message);
    });
    socket.on("disconnect", function () {
        console.log("some user disconnected");
    });
});
//# sourceMappingURL=server.js.map