import { Entity } from "./entity";
import { BodyFactory } from "../body-factory";

export class PlayerEntity extends Entity {

    public maxHealth: number;
    public health: number;

    constructor(x: number, y: number, scene?: Phaser.Scene) {
        const body = BodyFactory.createCircleBody(x, y, 32, {
            frictionAir: 0.5
        });

        if (scene != undefined) {
            const sprite = scene.add.image(0, 0, "player");
            super(body, true, sprite, scene);
        } else{
            super(body, false);
        }

        this.colorDebugContainer(undefined, 0xff2020);

        this.maxHealth = 100;
        this.health = 100;
    }

}