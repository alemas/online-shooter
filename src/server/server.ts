import express from "express";
import SocketIO from "socket.io";

import * as Data from "../data-structures/data-structure-module";
import { User } from "../client/user";
import { ServerSocketManager } from "./socket/server-socket-manager";

export class Server {

    public static users: { [id: string]: User } = {};

    public static init() {

        const app = express();
        const port = 3000;

        var server = require("http").Server(app);
        var io = SocketIO.listen(server, { serveClient: false });

        app.use(express.static(__dirname + "/public"));

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });

        server.listen(port, () => {
            console.log("Listening on port " + port);
        });

        let managers: { [id: string]: ServerSocketManager } = {};

        io.on("connection", (socket: SocketIO.Socket) => {
            console.log("new socket connected");

            socket.on("newUser", (data: Data.BasicUserData) => {
                if (Server.users[socket.id] == null) {
                    Server.users[socket.id] = new User();
                    Server.users[socket.id].id = socket.id;
                    Server.users[socket.id].username = data.username;

                    let socketManager = new ServerSocketManager(socket, Server.users[socket.id]);
                    managers[socket.id] = socketManager;

                    console.log("User created: " + data.username + " | Id: " + data.id);

                    socketManager.broadcastThisUserJoined();
                    socketManager.sendCurrentUsers();
                }
            });

            socket.on("disconnect", () => {
                console.log((Server.users[socket.id] == null ? "some socket" : Server.users[socket.id].username) + " disconnected");
                if (managers[socket.id] != null) {
                    managers[socket.id].broadcastThisUserLeft();
                    delete managers[socket.id];
                }
                if (Server.users[socket.id] != null) {
                    delete Server.users[socket.id];
                }
            });
        });
    }
}