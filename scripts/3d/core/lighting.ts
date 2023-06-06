
import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../internals/Config';


export class Lighting {

  public scene: ENABLE3D.Scene3D

  private static dirlight: ENABLE3D.THREE.DirectionalLight
  private static amblight: ENABLE3D.THREE.AmbientLight

  constructor (

    scene: ENABLE3D.Scene3D, 
    dirPosX: number, 
    dirPosY: number, 
    ambPosX: number, 
    ambPosY: number,
    dir_light: { color: number, intensity: number },
    amb_light: { color: number, intensity: number }
    
  )
  {
    this.scene = scene;

    Lighting.dirlight = new ENABLE3D.THREE.DirectionalLight(dir_light.color, dir_light.intensity),
    Lighting.amblight = new ENABLE3D.THREE.AmbientLight(amb_light.color, amb_light.intensity);

    Lighting.dirlight.position.set(0, dirPosX, dirPosY).normalize();
    Lighting.dirlight.rotation.set(1, 1, 1);

    Lighting.dirlight.castShadow = true;
    Lighting.dirlight.shadow.bias = -0.001;
    Lighting.dirlight.shadow.mapSize.width = 5000;
    Lighting.dirlight.shadow.mapSize.height = 350;
    Lighting.dirlight.shadow.camera.near = 500;
    Lighting.dirlight.shadow.camera.far = 500;
    Lighting.dirlight.shadow.camera.left = 5000;
    Lighting.dirlight.shadow.camera.right = -5000;
    Lighting.dirlight.shadow.camera.top = 5000;
    Lighting.dirlight.shadow.camera.bottom = 500;

    Lighting.amblight.position.set(0, ambPosX, ambPosY).normalize();
    Lighting.amblight.rotation.set(1, 1, 1);

    this.scene.third.add.existing(Lighting.dirlight);
    this.scene.third.add.existing(Lighting.amblight);

    this.scene.events.on('update', ()=> {

      if (Lighting.amblight)
      {
        let scale = Math.random() * 3;
        Lighting.amblight.scale.set(scale, scale, scale);
      }
    });
  }

  //----------------------- set dir light pos

  public static setDirectionalLight(position: ENABLE3D.THREE.Vector3): void
  {
    Lighting.dirlight.position.set(position.x, position.y, position.z);
    Lighting.dirlight.target.position.set(0, 0, 0);
  }

  //------------------------- set creepy

  public static setCreepyLighting(scene: ENABLE3D.Scene3D): void
  {
    const player = scene['player'].position;

    System.Process.app.ThirdDimension.Lighting.setDirectionalLight(new ENABLE3D.THREE.Vector3(player.x, -10, player.z));
  }
}

