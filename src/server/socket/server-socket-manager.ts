import SocketIO from "socket.io";
import * as Data from "../../data-structures/data-structure-module";
import { User } from "../../client/user";
import { Server } from "../server";

export class ServerSocketManager {

    private socket: SocketIO.Socket;
    private user: User;

    constructor(socket: SocketIO.Socket, user: User) {
        this.socket = socket;
        this.user = user;
        this.setSocketResponses();
    }

    /**
     * @description Sets the responses for each event the server socket can receive
     */
    private setSocketResponses() {

        this.socket.on("message", (data: Data.MessageData) => {
            console.log(data.sender.username + ": " + data.message);
        })

    }

    //#region Broadcast events

    /**
     * @description Base method for broadcasting events via Socket.IO
     * @param eventName Event name to be broadcasted to all
     * @param data Optional data accompanying the event
     */
    private broadcast(eventName: string, data?: any) {
        this.socket.broadcast.emit(eventName, data);
    }

    /**
     * @description Informs everyone that a new player connected
     */
    public broadcastThisUserJoined() {
        let data: Data.BasicUserData = {username: this.user.username, id: this.user.id};
        this.broadcast("broadcastNewUser", data);
    }

    /**
     * @description Informs everyone that this player left the game
     */
    public broadcastThisUserLeft() {
        let data: Data.BasicUserData = {username: this.user.username, id: this.user.id};
        this.broadcast("broadcastUserLeft", data);
    }

    //#endregion Broadcast events

    //#region Send events

    /**
     * @description Base method for sending messages to the client via Socket.io
     * @param eventName Event name to be sent to the client
     * @param data Optional data accompanying the event
     */
    private send(eventName: string, data?: any) {
        this.socket.emit(eventName, data);
    }
    
    /**
     * @description Informs the client of the current connected players
     */
    public sendCurrentUsers() {
        let data: {[id: string]: Data.BasicUserData} = Server.users;
        this.send("currentUsers", data);
    }

    //#endregion Send events

}