import io from "socket.io-client";

import { User } from "../user";
import * as Data from "../../data-structures/data-structure-module";

export class ClientSocketManager {

    private static socket: SocketIOClient.Socket;
    private static user: User;
    private static userData: Data.BasicUserData;
    private static debug = true;

    public static init(): Promise<string> {
        this.socket = io();
        this.user = new User();

        this.setSocketResponses();

        return new Promise<string>((resolve) => {
            this.socket.on("connect", () => {
                resolve(this.socket.id);
            });
        })
        
    }

    public static get socketId(): string {
        return this.socket.id;
    }

    public static setUser(user: User) {
        this.user = user;
        this.userData = {username: user.username, id: user.id};
    }

    /**
     * @description Sets the responses for each event the client socket can receive
     */
    private static setSocketResponses() {

        this.socket.on("currentUsers", (data: {[id: string]: Data.BasicUserData}) => {
            if (ClientSocketManager.debug) {console.log("Received 'currentUsers' | Data:\n" + JSON.stringify(data)) };
            // set players list
        });

        this.socket.on("broadcastNewUser", (data: Data.BasicUserData) => {
            if (ClientSocketManager.debug) {console.log("Received 'broadcastNewUser' | Data:\n" + JSON.stringify(data)) };
            // update players list
            if (data.id === ClientSocketManager.user.id) {
                //ignore
            }
        });

        this.socket.on("broadcastUserLeft", (data: Data.BasicUserData) => {
            if (ClientSocketManager.debug) { console.log("Received 'broadcastUserLeft' | Data:\n" + JSON.stringify(data)) };
            // remove player from players list
        })
    }

    /**
     * @description Base method for sending messages to the server via Socket.io
     * @param eventName Event name to be sent to the server
     * @param data Optional data accompanying the event
     */
    private static send(eventName: string, data?: any) {
        if (ClientSocketManager.debug) { console.log("Sent '" + eventName + "' | Data:\n" + JSON.stringify(data)) };
        this.socket.emit(eventName, data);
    }

    /**
     * @description Informs the server a new user has entered.
     */
    public static sendNewUser() {
        ClientSocketManager.send("newUser", this.userData);
    }

    /**
     * @description Sends a message to global chat
     * @param message 
     */
    public static sendMessage(message: string) {
        let data: Data.MessageData = {sender: this.userData, message: message};
        ClientSocketManager.send("message", data);
    }
}

