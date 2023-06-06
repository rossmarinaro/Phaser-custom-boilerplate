
import * as ENABLE3D from '@enable3d/phaser-extension';
import * as SkeletonUtils from '../plugins/skeletonUtils.js'

import { System } from '../internals/Config'


//----------------- 3D Model Base Class can be loaded on demand, or in one call


export class Actor extends ENABLE3D.ExtendedObject3D {

  public x?: number
  public y?: number
  public z?: number
  public callback?: Function 

  public key?: string | null
  public asset_id: string
  public obj: any
  public scene: ENABLE3D.Scene3D
  public isCollide: boolean = false

  public static idIterator: number = 0

  constructor (

    scene: ENABLE3D.Scene3D, 
    key?: string | null, 
    x?: number,
    y?: number,
    z?: number,
    willLoad?: boolean, 
    willRender?: boolean, 
    callback?: Function
     
  )
  {

    super();

    Actor.idIterator++;

    this.x = x;
    this.y = y;
    this.z = z;
    this.scene = scene;
    this.callback = callback;
    this.key = key;
    this.name = `${this.key + '_' + Actor.idIterator}`;       

    if (willLoad)
      this.preload(willRender); 
    
  }


  //------------------------------- preload file extension and load


  public async preload (willRender?: boolean): Promise<Readonly<void>>
  {     

    return new Promise(async res => {

      
      if (!this.key)
      {
        res();
        return;
      }

      const filepath = await System.Config.utils.strings.getFilePathByKey(this.key, 'resources_3d', 'assets');      
   
      this.type = System.Config.utils.strings.getFileType(filepath);   

      this.asset_id = `${this.type + '_' + Actor.idIterator}`;
 
      System.Process.app.ThirdDimension.cache.current.map(async resource => {       

        if(resource.key === this.key)
        {       
    
          this.obj = resource.data; 

          switch (this.type)
          {

            case 'glb': 

              this.morphTargetInfluences = resource.data['morphTargetInfluences'];  
              this.add(resource.data.scene.clone()); 
         
            break;

            case 'fbx': this.add(SkeletonUtils.clone(resource.data)); break;

            default: 
              return console.log('Actor Preload Failed: No model data found.'); 
      
          }

          //clone materials
      
          this.traverse(i => {
            if (i.isMesh && i.material instanceof ENABLE3D.THREE.Material)
              i.material = i.material.clone();
          });

          //load if specified

          res(this.load(willRender));
        }
      });
    });
  }


  //---------------------------------- manually load mesh


  public load(render?: boolean): void
  {

    for (let i in this.obj.animations) 
      this.anims.add(this.obj.animations[i].name, this.obj.animations[i]);

    this.scene.third.animationMixers.add(this.anims.mixer); 

    if (render)
    {
      
      if (this.x && this.y && this.z)
        this.position.set(this.x, this.y, this.z);

      this.scene.third.add.existing(this);
   
    }

    if (this.callback)
      this.callback(); 

  }


  //----------------- collides with stage

    
  public checkCollisionWithStage (otherObject: ENABLE3D.ExtendedObject3D): void
  {

    this.isCollide = otherObject.parent?.parent?.['key'].includes(System.Process.app.ThirdDimension.LevelManager3D.currentLevel) 
      ? true : false;

    if (this.isCollide)
    {

      Math.random() * 1 > 0.5 ? 
        this.position.x-- : 
        this.position.x++;

      Math.random() * 1 > 0.5 ? 
        this.position.z-- : 
        this.position.z++;

      if (this.body)
        this.body.needUpdate = true; 
    }

  }

}