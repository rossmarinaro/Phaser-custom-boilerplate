import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';
import { Actor } from './Actor';


//--------- Enemy


export class Enemy extends Actor {

  public health: number

  constructor(scene: ENABLE3D.Scene3D, x: number, y: number, z: number, scale: number = 30)
  {

    super(scene, 'enemy key', x, y, z, true, true, ()=> {

      this.scene = scene;
      this.health = 6;

      this.obj.animations.forEach((clip: ENABLE3D.THREE.AnimationClip) => {
        if (clip.name === 'hover')
        this.anims.mixer.clipAction(clip).reset().play();
      });

      this.scale.set(scale, scale, scale);
      
      this.scene.third.physics.add.existing(
        this, 
        { 
          offset: {x: 0, z: -20}, 
          shape: 'sphere', 
          mass: 0.5, 
          collisionFlags: 6, 
          radius: 0.5
        });
  
      this.body.on.collision(async (otherObject, event) => {

        if (otherObject instanceof Enemy)
        {
          this.position.setX(otherObject.position.x - 5);
          this.position.setZ(otherObject.position.z - 5);
        }

        //collides with stage
        
        event !== 'end' ?
          this.checkCollisionWithStage(otherObject) :
          this.isCollide = false;

        //deal damage

        if (otherObject.name.includes('bh_model'))
          scene['player'].triggerDamageCallback(1);

      });

      this.scene.events.on('update', () => this.followPlayer());
    });

  }  

  //--------------------------------- follow player

  private followPlayer (): void
  {

    const player = this.scene['player']; 

    if (this.isCollide || !player || this.position.distanceTo(player.position) > 150 )
      return;

    this.lookAt(player.position);

    this.position.x > player.position.x ?
      this.scene.time.delayedCall(100, ()=> this.position.distanceTo(player.position) < 100 ? this.position.x -= 0.7 : this.position.x -= 0.5) :
      this.scene.time.delayedCall(100, ()=> this.position.distanceTo(player.position) < 100 ? this.position.x += 0.7 : this.position.x += 0.5);
  
    this.position.z > player.position.z ?
    this.scene.time.delayedCall(100, ()=> this.position.distanceTo(player.position) < 100 ? this.position.z -= 0.7 : this.position.z -= 0.5) :
    this.scene.time.delayedCall(100, ()=> this.position.distanceTo(player.position) < 100 ? this.position.z += 0.7 : this.position.z += 0.5);

    if (this.body)
      this.body.needUpdate = true; 

  }

  //---------------------------------- destroy

  public onDestroy(): void
  {
            
    System.Process.app.audio.play('fire_fx', 6, false, this.scene, 0);

    this.traverse((i: any) => {  
      if (i.name === 'body')
        i.visible = false;
    });

    this.obj.animations.forEach((clip: ENABLE3D.THREE.AnimationClip) => {

      if (clip.name === 'destroy')
      {

        this.anims.mixer.clipAction(clip).reset().play();

        this.scene.time.delayedCall(500, () => {

          if (this.hasBody)
          {

            new System.Process.app.ThirdDimension.Particles3D(this.scene, {
              vert: 'vert3DVary', 
              frag: 'particle3D', 
              props: { 
                depthTest: true, 
                depthWrite: false, 
                vertexColors: true, 
                uniforms: {
                  alpha: { value: 1.0 },
                  colour: { value: new ENABLE3D.THREE.Vector4(255, 0.0, 0.0, 1.0) },
                  vUv: { value: new ENABLE3D.THREE.Vector3 }
                }
              }
            },
              Phaser.Math.Between(-8, 8),
              50, 
              600,
              this.position.x, 
              this.position.y, 
              this.position.z,
              50,
              -5
            );
        
            this.scene.third.destroy(this);
          }
        });
      }
    });
  
  }

}

