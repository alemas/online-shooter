export enum ClientSocketEvent {
    NewUser = "newUser",
    Message = "message",
    ValidateUsername = "validateUsername"
}

export enum ServerSocketEvent {
    BroadcastNewUser = "broadcastNewUser",
    BroadcastUserLeft = "broadcastUserLeft",
    CurrentUsers = "currentUsers",
    ValidateUsernameResponse = "validateUsernameResponse"
}