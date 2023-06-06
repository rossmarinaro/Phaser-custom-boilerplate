import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';
import { Meatbaddie } from '../objects/meatbaddie'

export class Sandbox3D extends ENABLE3D.Scene3D {
  
    public _scene: Phaser.Scene

    public enemies: ENABLE3D.ExtendedObject3D[] = []

    private assetCache: string[] = [ 
      'meatbaddie', 
      'rigatoni_rocket_launcher', 
      'automac1000', 
      'penne_pistol', 
      'ikura_maki_tile' 
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

      await System.Process.app.ThirdDimension.create(this, stage, [150, 30, 50, true, { currentEquipped: 'rolling_pin1' }]);  


      //some test pickups

      switch (stage)
      {

        case 'town': 

            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', 50, 15, 50);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', -50, 15, -50);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', 100, 15, -100);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 100, 15, 100);
            
        break;

        case 'theoven3d': 

            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', 150, 40, 150);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', -150, 40, -150);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -200, 40, -200);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 200, 40, 180);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', -150, -40, -150);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', 299, 156, 506);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -200, -40, 180);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 200, -40, 180);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', -100, -40, 180);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', 100, -40, 180);
            
        break;

        case 'freezer3d':

            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', 150, 45, 150);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', -150, 45, -150);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -200, 240, -200);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 200, 240, 200);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', -150, -40, -150);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', 50, -20, 470);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', -200, 240, 80);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', 200, 240, -80);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', -100, -40, 200);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', 100, -40, 200);
        
        break;

        case 'mountains-no-model':

            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', 150, 15, 150);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', -150, 15, -150);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -200, 15, -200);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 200, 15, 200);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', -615, 15, -470);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', 615, 15, 470);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -200, 15, 200);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 200, 15, 200);
      
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', -500, 15, 200);
            new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', 500, 15, 200);

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
        new Meatbaddie(this, 70, stage !== 'mountains-no-model' ? 60 : 30, 300),
        new Meatbaddie(this, -270, stage !== 'mountains-no-model' ? 60 : 30, -360),
        new Meatbaddie(this, 270, stage !== 'mountains-no-model' ? -20 : 30, 80),
        new Meatbaddie(this, 270, stage !== 'mountains-no-model' ? -20 : 30, -180)
      );
    }


    //---------------------------
    

    private async selectRandomStage (): Promise<string>
    { 

      switch (Math.floor(Math.random() * 4) + 1)
      {

        case 1: default:

          this.assetCache.push('theoven3d');
          return 'theoven3d';
        
        case 2:

          this.assetCache.push('freezer3d', 'carrot', 'broccoli');
          return 'freezer3d';
        
        case 3:

          this.assetCache.push('carrot', 'broccoli');
          return 'mountains-no-model';
        
        case 4:

          this.assetCache.push('town');
          return 'town';
      }
    }

} 

