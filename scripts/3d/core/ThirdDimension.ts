

//3D

import * as ENABLE3D from '@enable3d/phaser-extension';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { System } from './Config';

import { Inventory3D } from '../game/inventory/inventoryManager';
import { Player3D } from '../game/player';
import { Particles3D } from '../game/particles3d';
import { HUD3D } from '../game/hud';
import { Controller3D } from '../game/controller';
import { LevelManager3D } from '../game/levelManager';
import { Lighting } from '../game/lighting';
import { Actor } from '../game/Actor';



export class ThirdDimension {

    private static debugGraphics: boolean 
    private static backgroundFill: Phaser.GameObjects.Graphics

    public static debugParams: boolean

    //object cache

    public static cache: { 

        base: string[], 
        preload: string[], 
        current: { key: string, data: any }[] 
    } = { 
        base: [ 
            'pepe',
            'AK47' 
        ], 
        preload: [], 
        current: [] 
    }

    public static Player3D: typeof Player3D = Player3D
    public static Particles3D: typeof Particles3D = Particles3D
    public static Inventory3D: typeof Inventory3D = Inventory3D
    public static Lighting: typeof Lighting = Lighting
    public static LevelManager3D: typeof LevelManager3D = LevelManager3D
    public static Actor: typeof Actor = Actor
    public static THREE: typeof ENABLE3D.THREE = ENABLE3D.THREE
    public static HUD3D: HUD3D
    public static Controller3D: Controller3D
    public static GLTF: GLTF

    
    //--------------------- init third dimension


    public static async init (scene: ENABLE3D.Scene3D, camPos: ENABLE3D.THREE.Vector3, assetsToLoad?: string[]): Promise<void>  
    {
        
        return new Promise(async res => {
        
            scene.data['items'] = [];
            scene.data['powerups'] = [];
            scene.data['weapons'] = [];
    
            scene['controller'] = new Controller3D(scene);

            if (assetsToLoad && assetsToLoad.length > 0)
                ThirdDimension.cache.preload.push(...ThirdDimension.cache.base, ...assetsToLoad);
            
            System.Process.app.game.multiplayer.key = scene.data['currentStage'].toUpperCase();
            System.Process.orientation.unlock();
    
            System.Config.makeTransparantBackground(scene['_scene']);

            scene.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 });  
            
        //default camera position
                
            scene.third.camera.position.set(camPos.x, camPos.y, camPos.z);  
    
            ThirdDimension.debugGraphics = true;
            ThirdDimension.debugParams = true;
    
            if (process.env.NODE_ENV !== 'production') 
            {
                ThirdDimension.toggleDebugGraphics(scene);
                ThirdDimension.toggleDebugParams(scene);
    
                //call to see memory allocations 
    
                window['renderer'] = scene.third.renderer.info;
            }

            //run HUD scene in parallel
    
            ThirdDimension.backgroundFill = scene.add.graphics({fillStyle: {color: 0x000000}}).fillRectShape(new Phaser.Geom.Rectangle(0, 0, 30000, 30000));

            scene.scene.launch('HUD3D', scene);
            scene.scene.launch('Alerts', scene);

            res();
        });
    }

        
    //----------------------------------------------- 3d


    private static async loadAssets (scene: Phaser.Scene, scene3d: ENABLE3D.Scene3D): Promise<void> 
    {
        
        return new Promise(async res => { 

            ENABLE3D.THREE.Cache.enabled = true;

        //skip preload if items are cached

            if (ThirdDimension.cache.current.length > 0) 
            {
                res(); 
                return;
            } 

            
            const alerts = scene.scene.get('Alerts');

            System.Process.orientation.lock('portrait-primary');
            alerts['alert']('large', 'Loading assets...', 'please wait');
     
            let numAssets = 0;

            const resources = await System.Process.app.resourceParser(scene3d, scene.cache.json.get('resources_3d'));
        
            resources['assets'].map((resource: any) => {

                System.Process.app.ThirdDimension.cache.preload.filter(async (preloaded: string) => {

                    const key = String(Object.keys(resource)[0]),
                          path = String(Object.values(resource)[0]),
                          filetype = System.Config.utils.strings.getFileType(path);  

                //preload only assets used on this scene
 
                    if (preloaded === key)
                    {
                        switch (filetype)
                        { 
                            case 'glb': await scene3d.third.load.gltf(key).then(data => System.Process.app.ThirdDimension.cache.current.push({ key: key, data })); break;
                            case 'fbx': await scene3d.third.load.fbx(key).then(data => System.Process.app.ThirdDimension.cache.current.push({ key: key, data })); break;
                        }
        
                        numAssets++;

                        if(numAssets >= System.Process.app.ThirdDimension.cache.preload.length)
                        {
                            System.Process.orientation.unlock();
                            setTimeout(()=> res(alerts['stopAlerts']()), 1000);
                        }
            
                    }
                });
            });
    
        });
    }


    //------------------------------ create map, player, controller, HUD


    public static async create(scene: ENABLE3D.Scene3D, levelKey: string, playerParams?: any[]): Promise<void>  
    {
 
        return new Promise(async res => {

            scene.third.camera.lookAt(-10, 10, 10);
            
        //preload assets if cached object array is empty
           
            await ThirdDimension.loadAssets(scene['_scene'], scene);  

           ThirdDimension.backgroundFill.destroy();
            
        //load map before objects
            
            await LevelManager3D.load(scene, levelKey);

            if (playerParams)
            {

            //init player

                scene['player'] = new Player3D(scene, playerParams[0], playerParams[1], playerParams[2], playerParams[3], playerParams[4]);  

            //init controls

                scene['controller'].init(scene['player']);

                ThirdDimension.update(scene);
            } 

        //init hud display

            scene.scene.get('HUD3D')['initDisplay'](scene);

        //set post processing pipeline

            System.Process.app.shaders.setPostProcessingBloom(scene, { bloomStrength: 0.5, bloomThreshold: 0, bloomRadius: 0.5 });

            scene.cameras.main.fadeIn(4000, 0, 0, 0);

            res();
        });
        
    }

    
    //----------------------- update


    public static update(scene: ENABLE3D.Scene3D): void
    {
        //log collisions

        // this.third.physics.collisionEvents.on('collision', data => {
        //   const { bodies, event } = data
        //   console.log(bodies[0].name, bodies[1].name, event)
        // });

    //run scene3d update

        scene.events.on('update', (): void => {
            
        //update HUD

            scene.scene.get('HUD3D')['runUpdate']();

        //update shaders

            System.Process.app.shaders.shaderMaterials.filter((shader: ENABLE3D.THREE.ShaderMaterial) => {
                
                if (shader.uniforms.time)
                    shader.uniforms.time.value += 0.01;
            });

        });
    }


    //----------------------------- soft reset


    public static async reset(scene: ENABLE3D.Scene3D): Promise<void>
    {

        return new Promise(res => {

            scene.sound.stopAll(); 
            scene.sound.removeAll();

            scene.scene.stop('HUD3D'); 
            scene.scene.stop('Alerts');
            scene.scene.stop('Modal');

            scene.third.scene.clear();

            ThirdDimension.cache.preload = []; 

            LevelManager3D.reset(scene);
            Inventory3D.reset(0);

            Actor.idIterator = 0;
            

            res();
        });
    }


    //----------------------------------- destroy objects and third dimension


    public static async shutDown(scene: ENABLE3D.Scene3D): Promise<void>
    {

        await ThirdDimension.reset(scene);

        ThirdDimension.cache.current = [];

        scene.third['factories'].scene.children.map((child: ENABLE3D.ExtendedObject3D) => scene.third.scene.remove(child));

        scene.clearThirdDimension();

        scene.scene.stop('Sandbox3D');
        scene.scene.stop('SkeetShoot');
        scene.scene.stop('TheOven3D');
        scene.scene.stop('Nexus3D');
        scene.scene.stop('Freezer3D');
        scene.scene.stop('HUD3D'); 
        scene.scene.stop('Alerts');
    }


    //------------------------------------- debug graphics

    
    public static toggleDebugGraphics(scene: ENABLE3D.Scene3D): void
    {

        scene.input.keyboard.on('keydown-G', () => {

            ThirdDimension.debugGraphics = ThirdDimension.debugGraphics ? 
                false : true;

            ThirdDimension.debugGraphics ? 
                scene.third.physics.debug?.disable() : 
                scene.third.physics.debug?.enable();
        });
    }


    //--------------------------------- debug params

    
    public static toggleDebugParams(scene: ENABLE3D.Scene3D): void
    {

        scene.input.keyboard.on('keydown-H', () => {

            ThirdDimension.debugParams = ThirdDimension.debugParams ?   
                false : true
        });
    }

}