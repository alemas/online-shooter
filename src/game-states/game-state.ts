import Phaser from "phaser";

export class GameState extends Phaser.Scene {

    private player: Phaser.GameObjects.Ellipse & { body: Phaser.Physics.Arcade.Body };
    
    constructor() {
        let config = {
            active: true,
            visible: true,
            key: "Game"
        };

        super(config);
    }

    public create() {
        this.player = this.add.ellipse(400, 400, 32, 32, 0xe34949) as any;
        this.physics.add.existing(this.player);
    }

    public update() {

    }
}