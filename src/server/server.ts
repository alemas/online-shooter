import express from "express";
import SocketIO from "socket.io";

import * as Data from "../socket/data-structures/data-structure-module";
import { ServerSocketManager } from "../socket/server-socket-manager";
import { Game } from "./logics/game";
import { Session } from "./session/session";
import { BasicUserData } from "../socket/data-structures/data-structure-module";
import { ServerDebugger } from "./server-debugger";
import { Logger } from "../logger";
import { Validator } from "./validator";

export class Server {

    public static sessions: { [id: string]: Session } = {};

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

        let game: Game = new Game(8);
        Logger.init("SERVER");

        io.on("connection", (socket: SocketIO.Socket) => {
            console.log("New socket connected");
            let socketManager = new ServerSocketManager(socket, {username: "", id: socket.id});
            Validator.subscribe(socket.id, socketManager);
            ServerDebugger.subscribe(socket.id, socketManager);

            socket.on("newUser", (data: Data.BasicUserData) => {
                if (!this.sessions.hasOwnProperty(socket.id)) {
                    let user: BasicUserData = { username: data.username, id: socket.id };
                    socketManager.updateUser(user);

                    this.sessions[socket.id] = new Session(user, socketManager);

                    console.log("Session created for user: " + data.username + " | Id: " + data.id);

                    socketManager.broadcastThisUserJoined();
                    socketManager.sendCurrentUsers();
                    game.join(this.sessions[socket.id]);

                }
            });

            socket.on("disconnect", () => {
                console.log((this.sessions[socket.id] == null ? "Socket " + socket.id : this.sessions[socket.id].user.username) + " disconnected");
                if (this.sessions.hasOwnProperty(socket.id)) {
                    this.sessions[socket.id].socketManager.broadcastThisUserLeft();
                    this.sessions[socket.id].endSession()
                    delete this.sessions[socket.id];
                }
            });
        });
    }

    public static getUsers(): { [id: string]: Data.BasicUserData } {
        let result: { [id: string]: Data.BasicUserData } = {}
        for (let key in this.sessions) {
            result[key] = this.sessions[key].user;
        }
        return result;
    }
}