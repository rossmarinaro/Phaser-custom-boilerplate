import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';
import { Enemy } from '../objects/enemy'

export class Sandbox3D extends ENABLE3D.Scene3D {
  
    public _scene: Phaser.Scene

    public enemies: ENABLE3D.ExtendedObject3D[] = []

    private assetCache: string[] = [ 
      'key of some 3d asset', 

    ]

    constructor(){
      super({ key: 'Sandbox3D' });
    }
    public async init(scene: Phaser.Scene): Promise<void>
    {
    
      this._scene = scene;

      this.data['currentStage'] = 'Sandbox3D'; 

      //default unlimited ammo

      System.Process.app.ThirdDimension.Inventory3D.makeUnlimitedAmmo();

    }
    
    //---------------------------------------- 


    private async create(): Promise<void> 
    {
      
      System.Process.app.game.init(this); 

      const stage = await this.selectRandomStage();

      await System.Process.app.ThirdDimension.init(this, new ENABLE3D.THREE.Vector3(100, 100, -100), this.assetCache);   

      await System.Process.app.ThirdDimension.create(this, stage, [150, 30, 50, true, { currentEquipped: 'key of default weapon' }]);  


      //some test pickups

      switch (stage)
      {

        case 'town': 

            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'key of some weapon', 50, 15, 50);

        break;

        case 'mountains-no-model':



        break;
      }
      
    //rendered entities
  
      //this.entities.push(
        //test objects go here

        // new Player(this, -120, 40, -120, false, { skin: 'purple', currentEquipped: 'rolling_pin1' }),
        // new Player(this, -220, 40, -280, false, { skin: 'orange', currentEquipped: 'rolling_pin1' }),
        // new Player(this, -120, 40, 200, false, { skin: 'green', currentEquipped: 'rolling_pin1' })
      //);

     

    //test baddies

      this.enemies.push(
        new Enemy(this, 70, stage !== 'mountains-no-model' ? 60 : 30, 300)
      );
    }


    //---------------------------
    

    private async selectRandomStage (): Promise<string>
    { 

      switch (Math.floor(Math.random() * 4) + 1)
      {

        case 1: default:

          this.assetCache.push('town3d asset');
          return 'town';
        
      }
    }

} 

