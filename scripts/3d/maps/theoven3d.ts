
import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';


export async function TheOven3D (scene: ENABLE3D.Scene3D): Promise<Readonly<void>>
{

  System.Process.app.ThirdDimension.LevelManager3D.setStageBounds([280, -280, 580, -580]);

  scene['lighting'] = new System.Process.app.ThirdDimension.Lighting(
      scene, 185, 20, -185, -20, 
      { color: 0xffffff, intensity: 1.6 }, 
      { color: 0xF7941E, intensity: 1.8 }
    );

    
  System.Process.app.ThirdDimension.LevelManager3D.makeSkybox(scene, System.Process.app.timeOfDay >= 17 ? 'assets/3d/textures/fire.png' : 'assets/backgrounds/nexus1.png', System.Process.app.timeOfDay >= 17 ? 'assets/3d/textures/fire.png' : 'assets/backgrounds/nexus2.png');


  scene.third.physics.add.box({x: 1000, width: 10, height: 1000, depth: 3000, collisionFlags: 2}, {phong: {visible: false}});
  scene.third.physics.add.box({x: -1000, width: 10, height: 1000, depth: 3000, collisionFlags: 2}, {phong: {visible: false}});
  scene.third.physics.add.box({z: 1000, width: 3000, height: 1000, depth: 10, collisionFlags: 2}, {phong: {visible: false}});
  scene.third.physics.add.box({z: -1000, width: 3000, height: 1000, depth: 10, collisionFlags: 2}, {phong: {visible: false}});
  scene.third.physics.add.box({y: 300, width: 3000, height: 10, depth: 3000, collisionFlags: 2}, {phong: {visible: false}});

  System.Process.app.ThirdDimension.LevelManager3D.level.traverse((child: any) => { 

    if (child.isMesh)
    {
  
      if (child.name.includes('ramp') || child.name.includes('ladder')) 
        child.visible = false;
  
      if (child.name === 'platform')
      {
  
        let tmp = child.position.clone(),
            platform = new ENABLE3D.ExtendedObject3D;
  
         platform.position.copy(tmp);
  
        scene.third.physics.add.existing(platform, {
          shape: 'box', 
          width: 90,
          height: 5,
          depth: 90,
          mass: 0,
          collisionFlags: 2
        });
  
        scene.tweens.add({
          targets: tmp, 
          duration: 5000, 
          repeatDelay: 3000, 
          delay: 3000, 
          hold: 3000,
          ease: 'Sine.easeInOut', 
          y: tmp.y + 70, 
          repeat: -1, 
          yoyo: true,
          onUpdate: ()=> {
            child.position.setY(tmp.y); 
            platform.position.setY(tmp.y);
            platform.body.needUpdate = true;
          }
        });
  
        if (child.body !== null && child.body !== undefined)
          scene.third.physics.destroy(child)
      }
  

    }
  
  });
}

