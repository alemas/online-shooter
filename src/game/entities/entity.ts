import MatterJS, { Body } from "matter-js";
import Phaser from "phaser";
import { BodyShape } from "../body-factory";

export class Entity {

    public body: Body;
    protected render: boolean;
    private sprite: Phaser.GameObjects.Image | undefined;
    private debugContainer: Phaser.GameObjects.Container | undefined;

    constructor(body: Body, render: boolean, sprite?: Phaser.GameObjects.Image, scene?: Phaser.Scene) {
        this.body = body;
        this.render = render;

        body.angle = 0;

        if (this.render && scene != undefined) {
            let images = [];
            if (sprite != undefined) {
                this.sprite = sprite;
                this.sprite!.setPosition(0, 0);
                images.push(this.sprite);
            }

            if (body.type == BodyShape.Circle) {
                let circle = scene!.add.circle(0, 0, body.circleRadius);
                images.push(circle);
            } else if (body.type == BodyShape.Rectangle) {
                let rectangle = scene!.add.rectangle(0, 0, body.bounds.max.x - body.bounds.min.x, body.bounds.max.y - body.bounds.min.y);
                images.push(rectangle);
            }

            images.push(scene!.add.circle(0, 0, 2));
            images.push(scene!.add.line(0, 0, 16, 0, 48, 0));
            this.debugContainer = scene!.add.container(body.position.x, body.position.y, images);
            this.colorDebugContainer(undefined, 0xdd00dd);
        }
    }

    protected colorDebugContainer(fillColor?: number, strokeColor?: number) {
        if (this.debugContainer != undefined) {
            for (const shape of this.debugContainer!.list) {
                if (shape instanceof Phaser.GameObjects.Rectangle ||
                    shape instanceof Phaser.GameObjects.Arc ||
                    shape instanceof Phaser.GameObjects.Line) {

                    if (strokeColor != undefined) { 
                        shape.setStrokeStyle(1, strokeColor); 
                    } else {
                        shape.setStrokeStyle();
                    }
                    shape.setFillStyle(fillColor);
                }
            }
        }
    }

    public get position(): { x: number, y: number } {
        return this.body.position;
    }

    public updateRender() {
        if (this.render) {
            this.debugContainer!.setPosition(this.body.position.x, this.body.position.y);
            this.debugContainer!.setRotation(this.body.angle);
        }
    }

    public setAngle(radians: number) {
        this.body.angle = radians;
        if (this.debugContainer != undefined) { this.debugContainer!.rotation = radians; }
    }

    public applyForce(force: Matter.Vector) {
        Body.applyForce(this.body, this.body.position, force);
    }

}