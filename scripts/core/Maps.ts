
//////// Maps

import { System } from './Config';

import { testMap } from '../maps/testMap';



export class MapManager {

    public static three: {
        glb: {
            loaded: boolean
            self: any
        }
    }
    public static loaded: boolean
    public static totem: Phaser.GameObjects.Sprite | null
    public static map: Phaser.Tilemaps.Tilemap | null
    public static secretDoor: Phaser.Tilemaps.TilemapLayer | null
    public static secretDoorZone: Phaser.GameObjects.Zone | null
    public static secretDoorShadow: Phaser.Tilemaps.TilemapLayer | null
    
    public static switches: {
        a: Phaser.GameObjects.Zone | null
        b: Phaser.GameObjects.Zone | null
        c: Phaser.GameObjects.Zone | null
    }
    private static tweens: {
        a: Phaser.Tweens.Tween | null
    }

    public static water: {
        body: any
        collider: any
        overlap: any
    }
    public static exits: {
        a: any
        b: any 
        c: any 
        d: any 
        e: any 
        f: any
    }
    private static matterObj: any
    private static scene: Phaser.Scene
    private static shadowTiles: any



    //----------------------------------- map collisions

    private static addMatterRects(): void
    {
        MapManager.matterObj = MapManager.map?.getObjectLayer('matterObj');

        MapManager.matterObj.objects.forEach((e: any) => {

            MapManager.scene.matter.add.rectangle(
                e.x + e.width / 2,
                e.y + e.height / 2,
                e.width,
                e.height,
                {isStatic: true, collisionFilter: {group: 2}}
            );
            //e.setFriction(0, 0, Infinity);
        });
    }


    //------------------------ init level map


    public static init(scene: Phaser.Scene): void
    {

        MapManager.scene = scene;

        MapManager.three = {
            glb: {
                loaded: false,
                self: null
            }
        }
        MapManager.loaded = false,
        MapManager.totem = null,
        MapManager.map = null,
        MapManager.water = {
            body: null,
            collider: null,
            overlap: null
        };
        MapManager.exits = {
            a: null,
            b: null, 
            c: null, 
            d: null, 
            e: null, 
            f: null
        };
        MapManager.secretDoor = null;
        MapManager.secretDoorZone = null;
        MapManager.secretDoorShadow = null;
        MapManager.switches = {
            a: null,
            b: null,
            c: null
        };
        MapManager.tweens = {
            a: null
        };

        switch(MapManager.scene.data['currentStage'])
        {

        //main

            case 'testMap': MapManager.construct(testMap); break;

            default: return;
        }

        MapManager.addShadows();
        MapManager.addMatterRects();

    ////world parameters
    
        MapManager.scene.physics.world.bounds.width = System.Process.app.game.groundArray.width; 
        MapManager.scene.physics.world.bounds.height = System.Process.app.game.groundArray.height;
        
    }


//-------------------------------------- construct map

    private static construct (map: Function): void
    {
        MapManager.scene.cameras.main.setBackgroundColor(0x000000);
        map(MapManager.scene, this);
    }



}




