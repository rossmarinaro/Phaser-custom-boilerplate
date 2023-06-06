import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';
import { Meatbaddie } from '../objects/meatbaddie';

export class TheOven3D extends ENABLE3D.Scene3D {

    public timeLeft: number
    public score: number
    private _scene: Phaser.Scene
    public enemies: Meatbaddie[] = []

    private assetCache: string[] = [ 
      'theoven3d', 
      'meatbaddie', 
      'rolling_pin1', 
      'penne_pistol', 
      'ikura_maki_tile' 
    ]
    
    constructor(){
        super({key:'TheOven3D'});
    }
    public init(scene: Phaser.Scene): void
    {
      
      this._scene = scene;
      this.timeLeft = 30.000;
      this.score = 0;
      this.enemies = [];
      this.data['currentStage'] = 'TheOven3D'; 


    }
    
    //----------------------------------------


    private async create(): Promise<void>
    {

      System.Process.app.game.init(this); 

      await System.Process.app.ThirdDimension.init(this, new ENABLE3D.THREE.Vector3(100, 100, -100), this.assetCache);   

      await System.Process.app.ThirdDimension.create(this, 'theoven3d', [150, 30, 50, true, { health: this._scene.data['health']}]);   

    //baddies
      
      this.enemies.push(
        new Meatbaddie(this, 70, 60, -60, 30),
        new Meatbaddie(this, -270, 60, -360, 30),
        new Meatbaddie(this, 270, -20, 60, 30),
        new Meatbaddie(this, 270, -20, -180, 30)
      ); 

    //pickups

        new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -200, 45, -200);
        new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 200, 45, 200);

        new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -200, -40, 200);
        new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 200, -40, 200);

        new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rolling_pin1', 115, -40, 470);

        new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', -150, -40, -150);
        
     
    }

  
    //--------------------------------- game over
  
  
    public gameOver(): void
    {

      System.Process.app.audio.play('airhorn', 1, false, this, 0);
  
      this.time.delayedCall(3000, () => {   
  
        this._scene.data['health'] = this['player'].health;
        this.data['spawnPoint'] = 'TheOven3D';
        this.data['currentStage'] = 'The Oven';
        System.Process.app.events.returnToGame(this._scene, this, this.data['spawnPoint'], this.data['currentStage'], 'TheOven3D');
  
      });
      
    }


}