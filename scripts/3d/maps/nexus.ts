
import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';
import chroma from 'chroma-js';

export async function Nexus (scene: ENABLE3D.Scene3D): Promise<Readonly<void>>
{

//background

  scene['lighting'] = new System.Process.app.ThirdDimension.Lighting(
    scene, 185, 20, -185, -20, 
    { color: 0xffffff, intensity: 1.6 }, 
    { color: 0xffffff, intensity: 0.6 }
  );

  System.Process.app.ThirdDimension.LevelManager3D.makeSkybox(scene, System.Process.app.timeOfDay >= 17 ? 'assets/3d/textures/fire.png' : 'assets/backgrounds/nexus1.png', System.Process.app.timeOfDay >= 17 ? 'assets/3d/textures/fire.png' : 'assets/backgrounds/nexus2.png');

    //ground 

    const nori = await scene.third.load.texture('nori'),
          texCube = scene.third.misc.textureCube([nori, nori, nori, nori]);

    scene.third.physics.add.box({width: 10000, height: 0, depth: 10000, collisionFlags: 2}, {custom: texCube.materials});

    //world bounds

    scene.third.physics.add.box({x: 800, width: 10, height: 1500, depth: 2000, collisionFlags: 2}, { phong: {visible: false} });
    scene.third.physics.add.box({x: -800, width: 10, height: 1500, depth: 2000, collisionFlags: 2}, { phong: {visible: false} });
    scene.third.physics.add.box({z: 800, width: 2000, height: 1500, depth: 10, collisionFlags: 2}, { phong: {visible: false} });
    scene.third.physics.add.box({z: -800, width: 2000, height: 1500, depth: 10, collisionFlags: 2}, { phong: {visible: false} });
    scene.third.physics.add.box({y: 300, width: 2000, height: 10, depth: 2000, collisionFlags: 2}, { phong: {visible: false} });

    const colorScale = chroma
        .scale(['#221204', '#311700', '#472300', '#221203', '#5c4127', '#3d1e00', '#473018', '#7a634b', '#855223', '#7a634b'])
        .domain([0, 0.025, 0.15, 0.2, 0.25, 0.5, 1.3, 1.45, 1.8]), 
    
        heightmap = await scene.third.load.texture('island-heightmap'),

        mountain1 = scene.third.heightMap.add(heightmap, { colorScale }),
        mountain2  = scene.third.heightMap.add(heightmap, { colorScale }),
        mountain3 = scene.third.heightMap.add(heightmap, { colorScale }),
        mountain4 = scene.third.heightMap.add(heightmap, { colorScale });

    //mountains

        mountain1?.position.set(-500, 0, 2300);
        mountain1?.scale.set(400, 100, 400);
        scene.third.add.existing(mountain1);
        
        mountain2?.position.set(-2300, 0, -600);
        mountain2?.rotateZ(90);
        mountain2?.scale.set(400, 100, 400);
        scene.third.add.existing(mountain2);
        
        mountain3?.position.set(2300, 0, 600);
        mountain3?.rotateZ(90);
        mountain3?.scale.set(400, 100, 400);
        scene.third.add.existing(mountain3);
        
        mountain4?.position.set(500, 0, -2300);
        mountain4?.scale.set(400, 100, 400);
        scene.third.add.existing(mountain4);


    //trees

        const trees = [
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', -1000, 1, -300, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 1000, 1, -50, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 900, 1, 400, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 1500, 1, 100, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', -230, 1, -1000, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 1500, 1, -200, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', -1300, 1, 200, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 1100, 1, -200, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 500, 1, -1250, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', -550, 1, 1200, true, true)
        ],

        trees2 = [
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -900, 1, -100, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -1300, 1, -500, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 1300, 1, 200, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -300, 1, 1500, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 1360, 1, 400, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 800, 1, -800, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 1600, 1, 500, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 1100, 1, 1200, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -1400, 1, -1500, true, true),
            new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 1400, 1, 200, true, true)
        ];

        trees.forEach(i => i.scale.set(5, 5, 5));
        trees2.forEach(i => i.scale.set(17, 17, 17));
    
    //terrain

        new System.Process.app.ThirdDimension.Actor(scene, 'meatball_mountains', 200, 5, 0, true, true);
        new System.Process.app.ThirdDimension.Actor(scene, 'meatball_mountains', 50, 5, -50, true, true);
        new System.Process.app.ThirdDimension.Actor(scene, 'meatball_mountains', -200, 5, 300, true, true);
        new System.Process.app.ThirdDimension.Actor(scene, 'meatball_mountains', 0, 5, 400, true, true);

    //water

    const textures = await Promise.all([
            scene.third.load.texture('waterTexture1'),
            scene.third.load.texture('waterTexture2')
        ]);

    textures[0].needsUpdate = true;
    textures[1].needsUpdate = true;

    scene.third.misc.water({scale: 2, width: 1200, height: 1200, x: 0, y: 0.6, z: 0, color: 0xff0000, normalMap0: textures[0], normalMap1: textures[1]});


}

