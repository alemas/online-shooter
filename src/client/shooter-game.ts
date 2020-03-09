import Phaser, { Game } from "phaser";
import { Size } from "../socket/data-structures/size";
import { GameScene } from "./scenes/game-scene";
import { LoginScene } from "./scenes/login-scene";

export class ShooterGame extends Phaser.Game {

    public readonly canvasSize: Size;

    constructor() {

        let loginScene = new LoginScene();
        let gameScene = new GameScene();
        let csize: Size = {width: 1600, height: 900}

        let config = {
            type: Phaser.AUTO,
            parent: 'game',
            width: csize.width,
            height: csize.height,
            backgroundColor: 0xa9ceeb,
            title: "Best game",
            dom: {
                createContainer: true
            },
            // physics: {
            //     default: 'matter',
            //     matter: {
            //         enabled: false,
            //         debug: true,
            //         gravity: false
            //     }
            // },
            scene: [loginScene, gameScene]
        };

        super(config);
        this.canvasSize = csize;
    }
    
} 