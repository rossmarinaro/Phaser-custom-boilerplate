
import * as ENABLE3D from '@enable3d/phaser-extension';

import { Freezer3D } from './maps/freezer3d';
import { Town } from './maps/town';
import { Actor } from './Actor';


export class LevelManager3D {

  private static ignoreCollisions: string[] = [ 'platform' ]

  public static currentLevel: string = ''
  public static level: Actor
  public static bounds: { left: number, right: number, top: number, bottom: number } | null 

  //----------- load map

  public static async load (scene: ENABLE3D.Scene3D, key: string): Promise<Readonly<boolean>>
  {
    
    LevelManager3D.currentLevel = key;

    if (LevelManager3D.level !== null)
      scene.third.scene.remove(LevelManager3D.level);

    LevelManager3D.level = new Actor(scene, LevelManager3D.currentLevel);

    if (!LevelManager3D.currentLevel.includes('-no-model'))
    {
      await LevelManager3D.level.preload(true);
      await LevelManager3D.setCollisions(scene);
    }

    //load level objects 

    switch (LevelManager3D.currentLevel)
    {
      case 'freezer': Freezer3D(scene); break;
      case 'town': Town(scene); break;

    }
 
    return true;

  }
  

  //---------------- set physics / collisions


  private static async setCollisions (scene: ENABLE3D.Scene3D): Promise<void>
  {

    return new Promise(res => { 
      
      const obj = LevelManager3D.level.obj.scene.children; 

      if (obj)
      {
        LevelManager3D.ignoreCollisions.forEach(i => {

          obj.forEach((child: ENABLE3D.ExtendedObject3D ) => {

            if (!child.name.includes(i))
            {

              child.castShadow = child.receiveShadow = true;
                
                res(
                  scene.third.physics.add.existing(child, {
                    shape: 'convex',
                    mass: 0,
                    collisionFlags: 1,
                    autoCenter: false
                  })
                );
            }
          });
        });
      }
    });
  } 


  //---------------------------------------------


  public static async setStageBounds (position: number[]): Promise<void>
  {
      LevelManager3D.bounds = {
        
        left: position[0],
        right: position[1],
        top: position[2],
        bottom: position[3]
      }
  }


  //-------------------------------------------- make skybox


  public static makeSkybox(scene: ENABLE3D.Scene3D, side: string, cap?: string): void
  {

    cap = !cap ? side : cap;
    
    const loader = new ENABLE3D.THREE.CubeTextureLoader(),
          texture = loader.load([ side, side, cap, cap, side, side ]);

    scene.third.heightMap.scene.background = texture;

  }

  
  //------------------------------------------ reset defaults
  

  public static reset(scene: ENABLE3D.Scene3D): void
  {

    if (LevelManager3D.level)
      LevelManager3D.level.obj?.scene.children.map((i: ENABLE3D.ExtendedObject3D) => {
            if (i.hasBody)
            scene.third.physics.destroy(i);
        });

    LevelManager3D.bounds = null;
    LevelManager3D.currentLevel = '';
  }
  

   
}