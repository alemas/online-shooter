import { Logger } from "../logger";
import { ClientSocketManager } from "../socket/client-socket-manager";
import { ServerSocketEvent } from "../socket/data-structures/data-structure-module";
import { StaticSocketSubscriber } from "../socket/static-socket-subscriber";
import { Subscription } from "rxjs";

export class ClientDebugger extends StaticSocketSubscriber {

    private static subscriptions: { [id: string]: Subscription[] } = {};
    public static readonly active: boolean = true;

    public static subscribe(id: string, socketManager: ClientSocketManager) {
        if (this.active) {
            if (this.subscriptions[id] == null) {
                let subs = new Array<Subscription>();

                subs.push(ClientSocketManager.currentUsersEvent.subscribe((data) => {
                    Logger.print("Received '" + ServerSocketEvent.CurrentUsers + "'\n" + JSON.stringify(data));
                }));

                subs.push(ClientSocketManager.broadcastNewUserEvent.subscribe((data) => {
                    Logger.print("Received '" + ServerSocketEvent.BroadcastNewUser + "'\n" + JSON.stringify(data));
                }));

                subs.push(ClientSocketManager.broadcastUserLeftEvent.subscribe((data) => {
                    Logger.print("Received '" + ServerSocketEvent.BroadcastUserLeft + "'\n" + JSON.stringify(data));
                }));

                subs.push(ClientSocketManager.validateUsernamerResponseEvent.subscribe((data) => {
                    Logger.print("Received '" + ServerSocketEvent.ValidateUsernameResponse + "'\n" + JSON.stringify(data));
                }));

                super.addSubscriptions(id, this.subscriptions, subs);
            }
        }
    }

    public static unsubscribe(id: string) {
        super.unsubscribe(id, this.subscriptions);
    }
}