import { Entity } from "./entity";
import { BodyFactory } from "../body-factory";

export class BarrierEntity extends Entity {

    constructor(x: number, y: number, width: number, height: number, render: boolean, scene?: Phaser.Scene) {

        const body = BodyFactory.createRectangleBody(x, y, width, height, { isStatic: true });
        super(body, render, undefined, scene);

        this.colorDebugContainer(0xdddddd);
    }

}