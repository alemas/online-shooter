import { World, Engine, Body, Runner, Events } from "matter-js";
import { Entity } from "./entities/entity";
import { BarrierEntity } from "./entities/barrier-entity";
import { BodyFactory } from "./body-factory";

import mapData from "./maps/map_0.json";

export class GamePhysics {

    private engine: Engine;
    private world: World;
    private runner: Runner;
    private entities: { [id: string]: Entity } = {};
    private spawnArea: {x: number, y: number, w: number, h: number} | undefined;
    private mapSize: {w: number, h: number} = {w: 0, h: 0};
    // private renderEntities: {[id: string]: Entity} = {};

    constructor(scene?: Phaser.Scene) {
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.world.gravity = { x: 0, y: 0, scale: 0 };

        this.runner = Runner.create({
            delta: 1000 / 30,
            isFixed: true,
            enabled: true
        });

        Runner.run(this.runner, this.engine);

        if (scene != undefined) {
            Events.on(this.engine, "afterUpdate", () => {
                for (const key in this.entities) {
                    this.entities[key].updateRender();
                }
            });
        }

        this.initMap(scene);
    }

    public get mapDimensions() {
        return this.mapSize;
    }

    public initMap(scene?: Phaser.Scene) {
        // const maxWidth = 1600;
        // const maxHeight = 900;
        // const centerX = maxWidth / 2;
        // const centerY = maxHeight / 2;

        // const leftWall = new BarrierEntity(5, centerY, 10, maxHeight, true, scene);
        // const rightWall = new BarrierEntity(maxWidth - 5, centerY, 10, maxHeight, true, scene);
        // const topWall = new BarrierEntity(centerX, 5, maxWidth - 20, 10, true, scene);
        // const bottomWall = new BarrierEntity(centerX, maxHeight - 5, maxWidth - 20, 10, true, scene);

        // this.addEntity("leftWall", leftWall);
        // this.addEntity("rightWall", rightWall);
        // this.addEntity("topWall", topWall);
        // this.addEntity("bottomWall", bottomWall);

        // for (let i = 0; i < 100; i++) {
        //     const box = new Entity(BodyFactory.createRectangleBody(50 + Math.random() * (maxWidth - 50), 50 + Math.random() * (maxHeight - 50), 40, 40), true, undefined, scene);
        //     this.addEntity("box" + i, box);
        // }

        this.mapSize = {w: mapData.width * mapData.tilewidth, h: mapData.height * mapData.tileheight};

        mapData.layers.forEach(layer => {
            switch (layer.name) {
                case "walls": {
                    if (layer.objects) {
                        layer.objects.forEach((object: any) => {
                            console.log(object);
                            
                            if (object.x != undefined && object.y != undefined && object.id != undefined) {
                                
                                const h: number = object.height;
                                const w: number = object.width;
                                const x: number = object.x + (w/2);
                                const y: number = object.y + (h/2);

                                let wall: BarrierEntity;

                                // if (object.polygon) {
                                //     wall = new BarrierEntity(x, y, [object.polygon as [{x: number, y: number}]], true, scene);
                                if (object.ellipse){
                                    wall = new BarrierEntity(x, y, {r: w/2}, true, scene);
                                } else {
                                    wall = new BarrierEntity(x, y, {w: w, h: h}, true, scene);
                                }
                                wall.setAngle(object.rotation ? object.rotation : 0);
                                this.addEntity(object.id, wall);
                            }
                            
                        });
                    }
                }

                case "spawn_area": {

                }
            }
        });
    }

    public addEntity(id: string, entity: Entity) {
        if (this.entities.hasOwnProperty(id)) { return }
        this.entities[id] = entity;
        World.addBody(this.world, entity.body);
    }

}