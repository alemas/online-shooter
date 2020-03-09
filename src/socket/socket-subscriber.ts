import { Subscription } from "rxjs";

export class SocketSubscriber {

    protected subscriptions: { [id: string]: Subscription[] } = {};

    protected addSubscriptions(id: string, subs: Subscription[]) {
        if (!this.subscriptions.hasOwnProperty(id)) {
            this.subscriptions[id] = subs;
        }
    }

    public unsubscribe(id: string) {
        if (this.subscriptions.hasOwnProperty(id)) {
            const subs = this.subscriptions[id];
            while (subs.length > 0) { subs[0].unsubscribe(); delete subs[0]; subs.shift();}
            delete this.subscriptions[id];
        }
    }

}