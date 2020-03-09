import { Server } from "./server";
import { StaticSocketSubscriber } from "../socket/static-socket-subscriber";
import { ServerSocketManager } from "../socket/server-socket-manager";
import { Subscription } from "rxjs";

export class Validator extends StaticSocketSubscriber {

    private static subscriptions: { [id: string]: Subscription[] } = {};

    public static subscribe(id: string, manager: ServerSocketManager) {
        super.addSubscriptions(id, this.subscriptions, [
            manager.validateUsernameEvent.subscribe((data) => {
                const error = this.validateUsername(data.username);
                if (error == undefined) {
                    manager.sendValidateUsernameResponse({valid: true, error: ""});
                } else {
                    manager.sendValidateUsernameResponse({valid: false, error: error});
                }
            })
        ]);
    }

    public static unsubscribe(id: string) {
        super.unsubscribe(id, this.subscriptions);
    }

    public static validateUsername(username: string): string | undefined {
        if (username.length == 0) { return "Username must have at least 1 character"; }
        for (const key in Server.sessions) {
            if (Server.sessions.hasOwnProperty(key)) {
                if (Server.sessions[key].user.username === username) {
                    return "Username is already taken :c";
                }
            }
        }
    }

}