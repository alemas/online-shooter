import { User } from "./user";
import { ShooterGame } from "./shooter-game";
import { ClientSocketManager } from "../socket/client-socket-manager";
import { ClientDebugger } from "./client-debugger";
import { Logger } from "../logger";

let game: ShooterGame;
let user: User;

init();

async function init() {

    User.id = await ClientSocketManager.init();
    Logger.init("CLIENT");
    ClientDebugger.subscribe(User.id, ClientSocketManager);
    game = new ShooterGame();

    // setTimeout(() => {
    //     ClientSocketManager.sendMessage("Oi!")
    // }, 2000);
}