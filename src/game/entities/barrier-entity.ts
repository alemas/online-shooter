import { Entity } from "./entity";
import { BodyFactory } from "../body-factory";

export class BarrierEntity extends Entity {

    constructor(x: number, y: number, shape: {w: number, h: number} | Matter.Vector[][] | {r: number}, render: boolean, scene?: Phaser.Scene) {

        let body: Body;

        if ("w" in shape) {
            const rect = shape as {w: number, h: number};
            const body = BodyFactory.createRectangleBody(x, y, rect.w, rect.h, { isStatic: true });
            super(body, render, undefined, scene);
        } else if ("r" in shape) {
            const circle = shape as {r: number};
            const body = BodyFactory.createCircleBody(x, y, circle.r, {isStatic: true});
            super(body, render, undefined, scene);
        } else {            
            const points = shape as Matter.Vector[][];
            const body = BodyFactory.createPolygon(x, y, points, {isStatic: true});
            super(body, render, undefined, scene);
        }

        this.colorDebugContainer(0xdddddd);
    }

}