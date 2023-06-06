
import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';


export async function Freezer3D (scene: ENABLE3D.Scene3D): Promise<Readonly<void>>
{

  System.Process.app.ThirdDimension.LevelManager3D.setStageBounds([280, -280, 580, -580]);

  scene['lighting'] = new System.Process.app.ThirdDimension.Lighting(
      scene, 185, 20, -185, -20, 
      { color: 0xffffff, intensity: 1.6 }, 
      { color: 0x70cfe4, intensity: 1.8 }
    );

  System.Process.app.ThirdDimension.LevelManager3D.makeSkybox(scene, 'assets/3d/textures/fire.png', 'assets/3d/textures/fire.png');

  //trees

    const trees = [
      new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 347, 225, 219, true, true),
      new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', -170, 225, 75, true, true),
      new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 250, 225, 80, true, true),
      new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', -250, 225, -80, true, true),
  ],

  trees2 = [
      new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -270, 225, 214, true, true),
      new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 267, 225, -39, true, true),
      new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 194, 225, -80, true, true),
      new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -260, 225, -120, true, true),
  ];

  trees.forEach(i => i.scale.set(3, 3, 3));
  trees2.forEach(i => i.scale.set(6.58, 6.58, 6.58));

  //snow particles

  const snowShader = {
    vert: 'vert3DVary', 
    frag: 'particle3D', 
    props: {  
      blending: 'AdditiveBlending', 
      depthTest: true, 
      depthWrite: false, 
      transparent: true, 
      vertexColors: true, 
      uniforms: {
        alpha: { value: 0.3 },
        colour: { value: new ENABLE3D.THREE.Vector4(255, 255, 255, 0.7) },
        vUv: { value: new ENABLE3D.THREE.Vector3 }
      }
    }
  },
  
  genSnow = () => new System.Process.app.ThirdDimension.Particles3D(scene, snowShader, Phaser.Math.Between(-3, 3), 100, 5000, Phaser.Math.Between(-400, 400), 260, Phaser.Math.Between(-500, 500), 330);

  genSnow();

  scene.time.addEvent({delay: 3000, repeat: -1, callback: genSnow});
 
  System.Process.app.ThirdDimension.LevelManager3D.level.traverse((child: any) => { 

    if (child.isMesh)
    {
  
      if (child.name.includes('platform'))
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
          y: tmp.y + 140, 
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

