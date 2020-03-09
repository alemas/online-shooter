import SocketIO from "socket.io";
import * as Data from "./data-structures/data-structure-module";
import { Server } from "../server/server";
import { Observable } from "rxjs";
import { ServerDebugger } from "../server/server-debugger";
import { Logger } from "../logger";

export class ServerSocketManager {

    private socket: SocketIO.Socket;
    private user: Data.BasicUserData;

    //#region Subscriptions to Receive events

    public messageEvent!: Observable<Data.MessageData>;
    public newUserEvent!: Observable<Data.BasicUserData>;
    public validateUsernameEvent!: Observable<Data.BasicUserData>;

    //#endregion Subscriptions to Receive events

    constructor(socket: SocketIO.Socket, user: Data.BasicUserData) {
        this.socket = socket;
        this.user = user;
        this.setSocketResponses();
    }

    public updateUser(user: Data.BasicUserData) {
        this.user = user;
    }

    /**
     * @description Sets the responses and adds Observables for each event the server socket can receive
     */
    private setSocketResponses() {

        // message
        // Received whenever a player sends a message on public chat
        this.messageEvent = new Observable((observer) => {
            this.socket.on(Data.ClientSocketEvent.Message, (data: Data.MessageData) => {
                observer.next(data);
                console.log(data.sender.username + ": " + data.message);
            })
        });

        // newUser
        // Received whenever a new player chooses its username
        this.newUserEvent = new Observable((observer) => {
            this.socket.on(Data.ClientSocketEvent.NewUser, (data: Data.BasicUserData) => {
                observer.next(data);
            })
        });
        
        // validateUsername
        // Received whenever the client wants to validate a username
        this.validateUsernameEvent = new Observable((observer) => {
            this.socket.on(Data.ClientSocketEvent.ValidateUsername, (data: Data.BasicUserData) => {
                observer.next(data);
            })
        });

    }

    //#region Broadcast events

    /**
     * @description Base method for broadcasting events via Socket.IO
     * @param eventName Event name to be broadcasted to all
     * @param data Optional data accompanying the event
     */
    private broadcast(eventName: Data.ServerSocketEvent, data?: any) {
        this.socket.broadcast.emit(eventName, data);
    }

    /**
     * @description Informs everyone that a new player connected
     */
    public broadcastThisUserJoined() {
        this.broadcast(Data.ServerSocketEvent.BroadcastNewUser, this.user);
    }

    /**
     * @description Informs everyone that this player left the game
     */
    public broadcastThisUserLeft() {
        this.broadcast(Data.ServerSocketEvent.BroadcastUserLeft, this.user);
    }

    //#endregion Broadcast events

    //#region Send events

    /**
     * @description Base method for sending messages to the client via Socket.io
     * @param eventName Event name to be sent to the client
     * @param data Optional data accompanying the event
     */
    private send(eventName: Data.ServerSocketEvent, data?: any) {
        this.socket.emit(eventName, data);
        if (ServerDebugger.active) { Logger.print("Sent '" + eventName + "'\n" + JSON.stringify(data)) }
    }

    /**
     * @description Informs the client of the current connected players
     */
    public sendCurrentUsers() {
        let data: { [id: string]: Data.BasicUserData } = Server.getUsers();
        this.send(Data.ServerSocketEvent.CurrentUsers, data);
    }

    /**
     * @description Informs the client if given username is valid
     * @param data Username validation data
     */
    public sendValidateUsernameResponse(data: Data.ValidateUsernameResponse) {
        this.send(Data.ServerSocketEvent.ValidateUsernameResponse, data);
    }

    //#endregion Send events

}