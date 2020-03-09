import { Logger } from "../logger";
import { ServerSocketManager } from "../socket/server-socket-manager";
import { Subscription } from "rxjs";
import { ClientSocketEvent } from "../socket/data-structures/data-structure-module";
import { StaticSocketSubscriber } from "../socket/static-socket-subscriber";


export class ServerDebugger extends StaticSocketSubscriber {

    private static subscriptions: { [id: string]: Subscription[] } = {};
    public static readonly active: boolean = true;

    public static subscribe(id: string, manager: ServerSocketManager) {
        if (this.active) {
            let subs = new Array<Subscription>();

            subs.push(manager.newUserEvent.subscribe((data) => {
                this.printReceivedEvent(ClientSocketEvent.NewUser, data);
            }));

            subs.push(manager.messageEvent.subscribe((data) => {
                this.printReceivedEvent(ClientSocketEvent.Message, data);
            }));

            subs.push(manager.validateUsernameEvent.subscribe((data) => {
                this.printReceivedEvent(ClientSocketEvent.ValidateUsername, data);
            }));

            super.addSubscriptions(id, this.subscriptions, subs);
        }
    }

    private static printReceivedEvent(eventName: string, data?: any) {
        Logger.print("Received '" + eventName + "'\n" + JSON.stringify(data));
    }

    public static unsubscribe(id: string) {
        super.unsubscribe(id, this.subscriptions);
    }

}