import io from "socket.io-client";

import { User } from "../user";
import * as Data from "../../data-structures/data-structure-module";

export class  SocketManager {

    private static socket: SocketIOClient.Socket;
    private static userData: Data.BasicUserData;

    public static init() {
        this.socket = io();
        this.userData = {username: User.username, id: User.id};
    }

    public static get socketId(): string {
        return this.socket.id;
    }

    /**
     * @description Base method for sending messages to the server via Socket.io
     * @param eventName Event name to be sent to the server
     * @param data Optional data accompanying the event
     */
    private static send(eventName: string, data?: any) {
        this.socket.emit(eventName, data);
    }

    /**
     * @description Informs the server a new user has entered.
     */
    public static sendNewUser() {
        SocketManager.send("newUser", this.userData);
    }

    /**
     * @description Sends a message to global chat
     * @param message 
     */
    public static sendMessage(message: string) {
        let data: Data.MessageData = {sender: this.userData, message: message};
        SocketManager.send("message", data);
    }
}

