import express from "express";
import SocketIO from "socket.io";

var app = express();
const port = 3000;

var server = require("http").Server(app);
var io = SocketIO.listen(server, {serveClient: false});

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log("Listening on port " + port);
});

io.on("connection", (socket: SocketIO.Socket) => {
    console.log("new user connected");

    socket.on("disconnect", function() {
        console.log("some user disconnected");
    });
});