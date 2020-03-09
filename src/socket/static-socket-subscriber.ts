import { Subscription } from "rxjs";

export class StaticSocketSubscriber {

    protected static addSubscriptions(id: string, subscriptions: { [id: string]: Subscription[] }, subs: Subscription[]) {
        if (!subscriptions.hasOwnProperty(id)) {
            subscriptions[id] = subs;
        }
    }

    protected static unsubscribe(id: string, subscriptions: { [id: string]: Subscription[] }) {
        if (subscriptions.hasOwnProperty(id)) {
            const subs = subscriptions[id];
            while (subs.length > 0) { subs[0].unsubscribe(); delete subs[0]; subs.shift();}
            delete subscriptions[id];
        }
    }

}