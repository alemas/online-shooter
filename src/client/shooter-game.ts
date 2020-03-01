import Phaser, { Game } from "phaser";
import { GameScene } from "./scenes/game-scene";
import { Size } from "../data-structures/size";

export class ShooterGame extends Phaser.Game {

    public readonly canvasSize: Size;

    constructor() {

        let gameScene = new GameScene();
        let csize: Size = {width: 1280, height: 720}

        let config = {
            type: Phaser.AUTO,
            parent: 'game',
            width: csize.width,
            height: csize.height,
            backgroundColor: 0xf0f0f0,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 0 }
                }
            },
            scene: [gameScene]
        };

        super(config);
        this.canvasSize = csize;
    }
    
} 