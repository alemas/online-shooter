import express from "express";
import SocketIO from "socket.io"; 

import * as Data from "../data-structures/data-structure-module";

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
    console.log("someone connected");

    socket.on("newUser", (data: Data.BasicUserData) => {
        console.log("User " + data.username + " connected\nUser id = " + data.id);
    });

    socket.on("message", (data: Data.MessageData) => {
        console.log(data.sender.username + ": " + data.message);
    })

    socket.on("disconnect", () => {
        console.log("some user disconnected");
    });
});