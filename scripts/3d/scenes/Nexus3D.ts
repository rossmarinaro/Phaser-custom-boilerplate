import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';
import { Meatbaddie } from '../objects/meatbaddie';


export class Nexus3D extends ENABLE3D.Scene3D {

    private _scene: Phaser.Scene
    private isActive: boolean
    private assetCache: string[] = [ 
      'carrot', 
      'broccoli', 
      'meatbaddie', 
      'rigatoni_rocket_launcher', 
      'automac1000', 
      'penne_pistol', 
      'ikura_maki_tile' 
    ]

    public enemies: ENABLE3D.ExtendedObject3D[] = []

    constructor(){
        super({key: 'Nexus3D'});
    }
    public init(scene: Phaser.Scene): void
    {
      
      this._scene = scene;
      this.isActive = true;
      this.enemies = [];
      this.data['currentStage'] = 'Nexus3D';  

    }
    
    //----------------------------------------

    
    private async create(): Promise<void>
    {

      System.Process.app.game.init(this); 

      const health = this._scene.data && this._scene.data['health'] ? this._scene.data['health'] : 10;

      await  System.Process.app.ThirdDimension.init(this, new ENABLE3D.THREE.Vector3(0, 80, 20), this.assetCache);  

      await System.Process.app.ThirdDimension.create(this, 'mountains-no-model', [550, 20, 350, true, { health }]);  
       
      const 
      
        doorShader = System.Process.app.shaders.createShaderMaterial('three_std_Vert', 'fragVortex', {
          blending: 'NoBlending',
          depthTest: true,
          depthWrite: true,
          uniforms: {
            time: { value: 1.0 },
            resolution: { value: new System.Process.app.ThirdDimension.THREE.Vector2(innerWidth, innerHeight)}
          }
        }),
        
        exitA = this.third.physics.add.box({x: 500, width: 2, height: 100, depth: 30, collisionFlags: 1}, { custom: doorShader }),
        exitB = this.third.physics.add.box({x: -500, width: 2, height: 100, depth: 30, collisionFlags: 1}, { custom: doorShader });

      exitA.body.on.collision(async obj => {      
        if (obj === this['player'].rigidBody)
          this.exit('Nexus3D', 'Meatball Mountain');
      });

      exitB.body.on.collision(async obj => {
        if (obj === this['player'].rigidBody)
          this.exit('Nexus3D', 'Carb Kingdom');
      });

    //baddies 

      this.enemies.push(
        new Meatbaddie(this, 70, 28, -60),
        new Meatbaddie(this, -270, 28, -360),
        new Meatbaddie(this, 270, 28, 360)
      );

 
    //items

      new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', 320, 10, -550);
      new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'automac1000', 520, 10, 350);

      new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', -520, 10, -350);
      new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'penne_pistol', 320, 10, 350);

      new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'ikura_maki_tile', -320, 12, 350);
      new System.Process.app.ThirdDimension.Inventory3D.pickup(this, 'rigatoni_rocket_launcher', 320, 12, -350);

    }

    
    //-------------------------- exit


    private exit (spawnPoint: string, stage: string): void 
    {
      
      if (!this.isActive)
        return;

        this.isActive = false;

        System.Process.app.audio.play('warp', 0.5, false, this, -200);

        this.cameras.main.fadeOut(500, 255, 255, 255, () => {

          this.time.delayedCall(1500, () => {

            this.data['spawnPoint'] = spawnPoint;
            this.data['currentStage'] = stage;
            
            System.Process.app.events.returnToGame(
              this._scene, 
              this, 
              this.data['spawnPoint'], 
              this.data['currentStage'], 
              spawnPoint
            );
          });
      });
    }
}