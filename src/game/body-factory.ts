import { Body, Bodies, IBodyDefinition } from "matter-js";

export enum BodyShape {
    Circle = "Circle", Rectangle = "Rectangle"
}

export class BodyFactory {

    public static createCircleBody(x: number, y: number, radius: number, options?: IBodyDefinition): Body {
        if (options == undefined)
            return Bodies.circle(x, y, radius, {type: BodyShape.Circle});
        else
            options.type = BodyShape.Circle;
        return Bodies.circle(x, y, radius, options);
    }

    public static createRectangleBody(x: number, y: number, width: number, height: number, options?: IBodyDefinition): Body {
        if (options == undefined)
            return Bodies.rectangle(x, y, width, height, {type: BodyShape.Rectangle});
        else
            options.type = BodyShape.Rectangle
        return Bodies.rectangle(x, y, width, height, options);
    }

}