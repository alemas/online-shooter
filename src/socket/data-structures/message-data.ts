import { BasicUserData } from "./user-data";

//message
export interface MessageData {
    sender: BasicUserData,
    message: string 
}

//privateMessage
export interface PrivateMessageData extends MessageData{
    recipient: BasicUserData
}