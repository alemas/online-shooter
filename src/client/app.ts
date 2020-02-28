import io from "socket.io-client";
import Phaser from "phaser";

import { User } from "./user";
import { ShooterGame } from "./shooter-game";
import { SocketManager } from "./socket/socket-manager";


let game = new ShooterGame();
User.username = "Alemas";
SocketManager.init();
SocketManager.sendNewUser();
SocketManager.sendMessage("Alou meus irmaozinhos");
