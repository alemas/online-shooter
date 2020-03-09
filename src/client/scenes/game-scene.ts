import MatterJS from "matter-js";
import Phaser from "phaser";
import { ShooterGame } from "../shooter-game";
import { GamePhysics } from "../../game/game-physics";
import { Entity } from "../../game/entities/entity";
import { BodyFactory } from "../../game/body-factory";
import { PlayerEntity } from "../../game/entities/player-entity";
import { BarrierEntity } from "../../game/entities/barrier-entity";

export class GameScene extends Phaser.Scene {

    private player: PlayerEntity | undefined;
    private keys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private mousePos: Phaser.Geom.Point | undefined;
    private gamePhysics: GamePhysics | undefined;

    constructor() {
        let config = {
            key: "GameScene"
        };
        super(config);

    }

    public preload() {
        this.load.image('player', './assets/images/player_red_64.png');
    }

    public create() {
        const maxWidth = (this.game as ShooterGame).canvasSize.width;
        const maxHeight = (this.game as ShooterGame).canvasSize.height;
        const centerX = maxWidth / 2;
        const centerY = maxHeight / 2;

        this.player = new PlayerEntity(centerX, centerY, this);

        this.gamePhysics = new GamePhysics(this);
        this.gamePhysics.addEntity("player", this.player);

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.mousePos = new Phaser.Geom.Point(0, 0);

        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            this.mousePos!.setTo(pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY);
        });
    }

    public update() {

        if (this.keys && this.player) {

            let speed = 0.01;
            let force = { x: 0, y: 0 };

            if (this.keys!.up!.isDown) {
                force.y = -speed;
            } else if (this.keys!.down!.isDown) {
                force.y = speed;
            } else {
            }

            if (this.keys!.left!.isDown) {
                force.x = -speed;
            } else if (this.keys!.right!.isDown) {
                force.x = speed;
            } else {
            }

            let angleToMouse = Phaser.Math.Angle.Between(this.player!.position.x, this.player!.position.y, this.mousePos!.x, this.mousePos!.y);
            this.player.setAngle(angleToMouse);
            this.player.applyForce(force);
        }
    }
}