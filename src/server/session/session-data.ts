import { Subscription } from "rxjs";

export class SessionData {
    private subscriptions: {[id: string]: Subscription} = {};

    /**
     * @description Registers a new subscription to the session data. If a subscription already exists under the same
     * id, it gets unsubscribed, deleted, and the replaced by the new one
     * @param id Subscription identifier
     * @param subscription Subscription
     */
    public addSubscription(id: string, subscription: Subscription) {
        if (this.subscriptions.hasOwnProperty(id)) {
            this.removeSubscription(id);
        }
        this.subscriptions[id] = subscription;
    }

    /**
     * Unsubscribes and deletes Subscription object
     * @param id Subscription identifier
     */
    public removeSubscription(id: string) {
        if (this.subscriptions.hasOwnProperty(id)) {
            this.subscriptions[id].unsubscribe();
            delete this.subscriptions[id];
        }
    }

    /**
     * @description Removes all subscriptions
     */
    public removeAllSubscriptions() {
        for (const id in this.subscriptions) {
            this.removeSubscription(id);
        }
    }
}