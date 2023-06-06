

import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../internals/Config';

 export class Particles3D  { 

    public material: THREE.ShaderMaterial

    constructor(
      
      scene: ENABLE3D.Scene3D, 
      shader: any, 
      force: number, 
      limit: number, 
      lifetime: number,
      x: number = 0, 
      y: number = 0, 
      z: number = 0,
      offsetHoriz: number = 0,
      offsetVert: number = 0
    ) 
    {

      const meshes: any[] = [],
            particles: any[] = [],
            clock = new ENABLE3D.THREE.Clock;

      //apply props to shader material

      this.material = System.Process.app.shaders.createShaderMaterial(shader.vert, shader.frag, shader.props);

      //create meshes

      while(limit > 0) 
      {

        meshes[limit] = scene.third.physics.add.sphere({x: x + Phaser.Math.Between(-offsetHoriz, offsetHoriz), y: y + offsetVert, z: z + Phaser.Math.Between(-offsetHoriz, offsetHoriz), radius: 1}, { custom: this.material });
        
        scene.third.add.existing(meshes[limit]);

        if (!meshes[limit].body) 
          scene.third.physics.add.existing(meshes[limit]);

        particles.push(meshes[limit]);

        particles.map((i: any) => i.body.applyForce(force, -1, force));
        limit--;

      } 
  
      let particlesLength = particles.length,
          delta = clock.getDelta();

      while(particlesLength--) 
        particles[particlesLength].rotation.z += delta * 0.4;

      //destroy particles
    
      scene.time.delayedCall(lifetime, ()=> {

          meshes.forEach(i => { 
            i.geometry.dispose(); 
            i.material.dispose();
            scene.third.destroy(i);
            scene.third.scene.remove(i);
          });
      });
  }


}


