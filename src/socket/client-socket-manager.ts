import io from "socket.io-client";

import { User } from "../client/user";
import * as Data from "./data-structures/data-structure-module";
import { Observable } from "rxjs";
import { take, filter } from "rxjs/operators";
import { Logger } from "../logger";
import { ClientDebugger } from "../client/client-debugger";

export class ClientSocketManager {

    private static socket: SocketIOClient.Socket;
    private static users: { [id: string]: Data.BasicUserData };
    private static debug = true;

    //#region Observable Events

    public static broadcastNewUserEvent: Observable<Data.BasicUserData>;
    public static broadcastUserLeftEvent: Observable<Data.BasicUserData>;
    public static currentUsersEvent: Observable<{ [id: string]: Data.BasicUserData }>;
    public static validateUsernamerResponseEvent: Observable<Data.ValidateUsernameResponse>;

    //#endregion Observable Events

    public static init(): Promise<string> {
        this.socket = io();

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

    private static get userData(): Data.BasicUserData {
        return { username: User.username, id: User.id };
    }

    /**
     * @description Sets the responses for each event the client socket can receive
     */
    private static setSocketResponses() {

        // currentUsers
        // Received by the client right after it sends 'newUser' to the server
        this.currentUsersEvent = new Observable((observer) => {
            this.socket.on(Data.ServerSocketEvent.CurrentUsers, (data: { [id: string]: Data.BasicUserData }) => {
                observer.next(data);
                // this.users = data;
            });
        });

        // validateUsernameResponse
        // Received by the client after asking if given username is valida
        this.validateUsernamerResponseEvent = new Observable((observer) => {
            this.socket.on(Data.ServerSocketEvent.ValidateUsernameResponse, (data: Data.ValidateUsernameResponse) => {
                observer.next(data);
            });
        })

        // broadcastNewUser
        // Received by the client whenever a new player joins
        this.broadcastNewUserEvent = new Observable((observer) => {
            this.socket.on(Data.ServerSocketEvent.BroadcastNewUser, (data: Data.BasicUserData) => {
                if (data.id !== User.id) {
                    // this.users[data.id] = data;
                    observer.next(data);
                }
            });
        });

        // broadcastUserLeft
        // Received by the client whenever a player leaves
        this.broadcastUserLeftEvent = new Observable((observer) => {
            this.socket.on(Data.ServerSocketEvent.BroadcastUserLeft, (data: Data.BasicUserData) => {
                // delete this.users[data.id];
                observer.next(data);
            })
        });
    }

    //#region Send events

    /**
     * @description Base method for sending messages to the server via Socket.io
     * @param eventName Event name to be sent to the server
     * @param data Optional data accompanying the event
     */
    private static send(eventName: Data.ClientSocketEvent, data?: any) {
        this.socket.emit(eventName, data);
        if (ClientDebugger.active) { Logger.print("Sent '" + eventName + "'\n" + JSON.stringify(data)) };
    }

    /**
     * @description Informs the server a new user has entered.
     */
    public static sendNewUser() {
        ClientSocketManager.send(Data.ClientSocketEvent.NewUser, this.userData);
    }

    /**
     * @description Asks the server to validate username
     * @param username Username
     */
    public static sendValidateUsername(username: string): Promise<Data.ValidateUsernameResponse> {
        let data: Data.BasicUserData = { username: username, id: "" };
        ClientSocketManager.send(Data.ClientSocketEvent.ValidateUsername, data);
        return ClientSocketManager.validateUsernamerResponseEvent.pipe(take(1)).toPromise();
    }

    /**
     * @description Sends a message to global chat
     * @param message 
     */
    public static sendMessage(message: string) {
        let data: Data.MessageData = { sender: this.userData, message: message };
        ClientSocketManager.send(Data.ClientSocketEvent.Message, data);
    }

    //#endregion Send events
}

