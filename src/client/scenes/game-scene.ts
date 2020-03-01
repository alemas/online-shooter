import Phaser from "phaser";
import { ShooterGame } from "../shooter-game";

export class GameScene extends Phaser.Scene {

    private player: Phaser.Physics.Arcade.Sprite | undefined;
    private keys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private mousePos: Phaser.Geom.Point | undefined;

    constructor() {
        let config = {
            key: "GameScene",
            active: true
        };
        super(config);
    }

    public init(params: [any]) {

    }

    public preload() {
        this.load.image('player', './assets/images/player_red.png');
    }

    public create() {
        const maxWidth = (this.game as ShooterGame).canvasSize.width;
        const maxHeight = (this.game as ShooterGame).canvasSize.height;

        this.player = this.physics.add.sprite(maxWidth / 2, maxHeight / 2, 'player');
        this.player.setOrigin(0.5, 0.5);
        this.player.scale = 0.5;
        // this.input.keyboard.addKeys({
        //     'up': Phaser.Input.Keyboard.KeyCodes.W,
        //     'down': Phaser.Input.Keyboard.KeyCodes.S,
        //     'left': Phaser.Input.Keyboard.KeyCodes.A,
        //     'right': Phaser.Input.Keyboard.KeyCodes.D
        // });
        this.keys = this.input.keyboard.createCursorKeys();
        this.mousePos = new Phaser.Geom.Point(0, 0);

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            this.mousePos!.setTo(pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY);
        });
    }

    public update() {

        if (this.keys && this.player) {
            
            let speed = 200;
            this.player!.setDrag(1000);

            if (this.keys!.up!.isDown) {
                this.player!.setVelocityY(-speed);
            } else if (this.keys!.down!.isDown) {
                this.player!.setVelocityY(speed);
            } else {
                // this.player!.setVelocityY(0);
            }

            if (this.keys!.left!.isDown) {
                this.player!.setVelocityX(-speed);
            } else if (this.keys!.right!.isDown) {
                this.player!.setVelocityX(speed);
            } else {
                // this.player!.setVelocityX(0);
            }

            this.player!.rotation = Phaser.Math.Angle.Between(this.player!.x, this.player!.y, this.mousePos!.x, this.mousePos!.y);
        }
    }
}