import { User } from "./user";
import { ShooterGame } from "./shooter-game";
import { ClientSocketManager } from "./socket/client-socket-manager";

let game: ShooterGame;
let user: User;

init();

async function init() {
    game = new ShooterGame();
    user = new User();

    user.id = await ClientSocketManager.init();
    user.username = "Alemas";
    ClientSocketManager.setUser(user);
    ClientSocketManager.sendNewUser();
}