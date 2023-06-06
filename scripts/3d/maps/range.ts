import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';
import chroma from 'chroma-js';

export async function Range (scene: ENABLE3D.Scene3D): Promise<Readonly<void>>
{

    scene['lighting'] = new System.Process.app.ThirdDimension.Lighting(
        scene, 55, 20, 55, -20, 
        { color: 0xffffff, intensity: 1.6 }, 
        { color: 0xF7941E, intensity: 0.6 }
    );

    System.Process.app.ThirdDimension.LevelManager3D.makeSkybox(scene, System.Process.app.timeOfDay >= 17 ? 'assets/backgrounds/pixel3.png' : 'assets/backgrounds/pixel2.png');


    //ground 

    const nori = await scene.third.load.texture('nori'),
          texCube = scene.third.misc.textureCube([nori, nori, nori, nori]);

    scene.third.physics.add.box({y: -100, width: 5000, height: 0, depth: 5000, collisionFlags: 2}, {custom: texCube.materials});


    //world bounds

    scene.third.physics.add.box({x: 600, width: 10, height: 1000, depth: 3000, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({x: -600, width: 10, height: 1000, depth: 3000, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({z: 600, width: 3000, height: 1000, depth: 10, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({z: -600, width: 3000, height: 1000, depth: 10, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({y: 600, width: 3000, height: 10, depth: 3000, collisionFlags: 2}, {phong: {visible: false}});


    const colorScale = chroma
    .scale(['#221204', '#311700', '#472300', '#221203', '#5c4127', '#3d1e00', '#473018', '#7a634b', '#855223', '#7a634b'])
    .domain([0, 0.025, 0.15, 0.2, 0.25, 0.5, 1.3, 1.45, 1.8]), 

    heightmap = await scene.third.load.texture('island-heightmap'), 
    mountains1 = scene.third.heightMap.add(heightmap, { colorScale }),
    mountains2 = scene.third.heightMap.add(heightmap, { colorScale }),
    mountains3 = scene.third.heightMap.add(heightmap, { colorScale }),
    mountains4 = scene.third.heightMap.add(heightmap, { colorScale });

    mountains1?.position.set(0, -100, -1370);
    mountains1?.scale.set(300, 100, 300);
    scene.third.add.existing(mountains1);

    mountains2?.position.set(-1370, -100, -100);
    mountains2?.rotateZ(90);
    mountains2?.scale.set(300, 100, 300);
    scene.third.add.existing(mountains2);

    mountains3?.position.set(1370, -100, -100);
    mountains3?.rotateZ(90);
    mountains3?.scale.set(300, 100, 300);
    scene.third.add.existing(mountains3);

    mountains4?.position.set(100, -100, 1370);
    mountains4?.scale.set(300, 100, 300);
    scene.third.add.existing(mountains4);


    //trees

    const trees = [
        new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 200, -100, -300, true, true),
        new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', 300, -100, -180, true, true),
        new System.Process.app.ThirdDimension.Actor(scene, 'broccoli', -210, -100, 120, true, true)
    ],

    trees2 = [
        new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -400, -100, -140, true, true),
        new System.Process.app.ThirdDimension.Actor(scene, 'carrot', -300, -100, -500, true, true),
        new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 100, -100, -570, true, true),
        new System.Process.app.ThirdDimension.Actor(scene, 'carrot', 400, -100, 450, true, true)
    ];

    trees.forEach(i => i.scale.set(5, 5, 5));
    trees2.forEach(i => i.scale.set(17, 17, 17));

}