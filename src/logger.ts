import { SocketSubscriber } from "./socket/socket-subscriber";

export class Logger {
    private static label: string;

    public static init(label: string) {
        Logger.label = label;
    }

    public static print(message: string) {
        const now = new Date();
        const hours = ("" + now.getHours()).padStart(2, '0');
        const minutes = ("" + now.getMinutes()).padStart(2, '0');
        const seconds = ("" + now.getSeconds()).padStart(2, '0');

        console.log("[" + hours + ":" + minutes + ":" + seconds + " " + Logger.label + "]: " + message);
    }
}