import Phaser from "phaser";

export class ShooterGame extends Phaser.Game {

    constructor() {

        let config = {
            type: Phaser.AUTO,
            parent: 'game',
            width: 1280,
            height: 720,
            backgroundColor: 0xf0f0f0,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 0 }
                }
            },
        };

        super(config);
    }

    private preload() {
    
    }
      
    private create() {
      
    }
      
    private update() {

    }
} 