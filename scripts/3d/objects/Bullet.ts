
import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../internals/Config';
import { PlayerItem } from './inventory/playerItem';
import { Actor } from './Actor';


export class Bullet extends Actor { 

  private src: PlayerItem
  private damage: number

  
  //check attack source returns true if attackee is not self


  public static async checkAttackSource (player: any, object: ENABLE3D.ExtendedObject3D): Promise<Readonly<boolean>> 
  { 
    
    return object['objType'] === 'player' && 
           object['playerID'] !== player.playerID ? 
            true : false; 
  }

  //---------------------------

  constructor (
  
    src: PlayerItem, 
    damage: number, 
    key: string | null, 
    scale: number, 
    distanceToDamage: number

  )
  {
    
    super(src.scene, key);
    
    (async ()=> { 

      this.src = src;
      this.damage = damage;
      this.userData['damage'] = damage; 
      this.userData['active'] = true;
  
      //if bullet model, load it in first person perspective
  
      if (this.key && src.scene['controller'].perspectiveControls.type === 'first') 
      {

        this.preload(true);
  
        this.scale.set(scale, scale, scale);
  
        this.src.scene.third.add.existing(this); 
  
        //bullet positioning
  
        const isZoomed = this.src.controls.zoom ? true : false,
              currPos = await this.src.getCurrentPosition(),
              firePos = this.src.scene.third.transform.from2dto3d(
                src.scene['controller'].perspectiveControls.type === 'first' ? isZoomed ? 0 : 0.9 : 0.5, 
                isZoomed ? -0.6 : -0.8, 
                src.scene['controller'].perspectiveControls.type === 'first' ? 10 : 30
              );
      
        if (firePos)
        {
          
          this.position.set(
            firePos.x, 
            System.Config.isPortrait(this.src.scene) || System.Config.isDesktop(this.src.scene) ? 
              firePos.y : firePos.y - 0.5, 
            firePos.z
          );
  
        }
  
        if (!this.hasBody)
  
          this.src.scene.third.physics.add.existing(this, {
            shape: 'sphere', 
            radius: 1, 
            mass: 2, 
            collisionFlags: 0
          });
  
        this.body.setAngularVelocityZ(30);
  
        if (currPos)
          this.body.applyForce(currPos.x * 7000, currPos.y * 7000, currPos.z * 7000);
        
        this.body.setCcdMotionThreshold(1e-2);
        this.body.setCcdSweptSphereRadius(0.2);
  
      //destroy on contact or after delay
  
        this.src.scene.time.delayedCall(1500, () => this.src.scene.third.physics.destroy(this));

        this.body.on.collision(async () => {
  
          if (this.hasBody)
              this.scene.third.destroy(this);
        });
  
        this.traverse(async i => {
  
          if (i.isMesh)
          {
  
            i.castShadow = i.receiveShadow = true;
         
            this.rotateY(90);

          }
      });  
    }
  
    //decrement ammo

      System.Process.app.ThirdDimension.Inventory3D.decrement(this.src.scene, this.src.name);
  
    //raycast intersection with target
    
      let collisionBuffer = false;
  
      const player = this.src.scene['player'];
  
      this.src.scene.third['factories'].scene.children.filter((target: ENABLE3D.ExtendedObject3D): void => {
  
        if (this.src.scene.third.scene3D['enemies'].includes(target))
        {
  
          const intersects = player.raycaster.intersectObject(target, true);
  
          if (intersects.length > 0 && !collisionBuffer) //stop if no intersection with raycast
          {
  
            collisionBuffer = true;
  
            if (player.position.distanceTo(target.position) > distanceToDamage) //stop if distance to damage is greater than cap
              return;
  
            this.src.scene.time.delayedCall(player.position.distanceTo(target.position), async () => { //delay is temporary hack
  
              target.traverse(child => {
                
                if (child.isMesh && child.material['emissive'])
                {
  
                  child.material['emissive'].r = 255;
                  child.material['emissive'].g = 255;
                  child.material['emissive'].b = 255;
  
                  this.src.scene.time.delayedCall(100, () => {
  
                    child.material['emissive'].r = 0;
                    child.material['emissive'].g = 0;
                    child.material['emissive'].b = 0;
                    
                  });
                }
  
              });
  
              //reduce target health or destroy
  
              if (target['health'] < 0)
                return;
             
              target['health'] -= this.damage;
  
              if (target['health'] <= 0)
                target['onDestroy']();
  

            });
          }
        }
      });
    })();
  }
}