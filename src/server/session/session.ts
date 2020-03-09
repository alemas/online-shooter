import { ServerSocketManager } from "../../socket/server-socket-manager";
import { BasicUserData } from "../../socket/data-structures/user-data";
import { SessionData } from "./session-data";
import { LobbySessionData } from "./lobby-session-data";
import { Validator } from "../validator";
import { ServerDebugger } from "../server-debugger";

export class Session {

    public user: BasicUserData;
    public socketManager: ServerSocketManager;
    public currentSessionData: SessionData;
    // public state

    constructor(user: BasicUserData, socketManager: ServerSocketManager) {
        this.user = user;
        this.socketManager = socketManager;
        this.currentSessionData = new LobbySessionData();
    }

    public endSession() {
        ServerDebugger.unsubscribe(this.user.id);
        Validator.unsubscribe(this.user.id);
        delete this.socketManager;
        delete this.user;
        delete this.currentSessionData;
    }

}