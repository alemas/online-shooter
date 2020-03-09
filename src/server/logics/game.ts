import { Session } from "../session/session";

export class Game {

    public isRunning = false;
    public readonly maxPlayers: number;
    private inGameUsers: {[id: string]: Session} = {};
    
    constructor(maxPlayers: number) {
        this.maxPlayers = maxPlayers < 1 && maxPlayers <= 16 ? 1 : maxPlayers;
    }

    public join(session: Session) {
        if (Object.keys(this.inGameUsers).length < this.maxPlayers && this.inGameUsers[session.user.id] == null) {
            this.inGameUsers[session.user.id] = session;
            let messageSubscription = session.socketManager.messageEvent.subscribe((data) => {
                console.log("InGame message received: " + data.message);
            });
        }
    }

    public leave(sessionId: string) {
        if (this.inGameUsers[sessionId] != null) {
            // unsubscribe events
            delete this.inGameUsers[sessionId];
        }
    }

    public start() {

        this.isRunning = true;
        let loopTimer = setInterval(() => {
            if (this.isRunning) {
                this.step();
            } else {
                clearTimeout(loopTimer);
            }
        }, 1000/30);

    }

    private step() {

    }

}