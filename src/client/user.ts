import { SocketManager } from "./socket/socket-manager";

export class User {

    public static username: string;
    public static get id(): string {
        return SocketManager.socketId != null ? SocketManager.socketId : "";
    }

}