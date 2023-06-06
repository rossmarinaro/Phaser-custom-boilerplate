import * as ENABLE3D from '@enable3d/phaser-extension';
import { Actor } from './Actor'
import { System } from '../internals/Config';

//------------------- Pickup

export class Pickup3D extends Actor {


    public _id?: number | string | undefined

    constructor ( 

      scene: ENABLE3D.Scene3D, 
      key: string, 
      x: number, 
      y: number, 
      z: number, 
      _id?: number | string | undefined 

    )
    {
      super(scene, key, x, y, z, true, true, () => {

        //spin pickup
    
        this.scene.events.on('update', ()=> {
            if (this.hasBody)
            {
              this.rotation.y += 0.03;
              this.body.needUpdate = true;
            }
        });
    
        //set as standalone item
    
          this.traverse((i: any) => System.Process.app.ThirdDimension.Inventory3D.setAsStandAloneItem(this, i));
          this.scene.third.physics.add.existing(this, {shape: 'sphere', radius: 3, collisionFlags: 6});
      });

      this._id = _id;   
    }
 
}