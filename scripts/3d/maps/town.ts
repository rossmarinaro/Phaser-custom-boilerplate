import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';


export async function Town (scene: ENABLE3D.Scene3D): Promise<Readonly<void>>
{

    scene['lighting'] = new System.Process.app.ThirdDimension.Lighting(
        scene, 55, 20, 55, -20,  
        { color: 0xffffff, intensity: 1.0 }, 
        { color: 0xffffff, intensity: 1.0 }
    );

    
    System.Process.app.ThirdDimension.LevelManager3D.makeSkybox(scene, System.Process.app.timeOfDay >= 17 ? 'assets/backgrounds/pixel3.png' : 'assets/backgrounds/pixel2.png');

    //world bounds

    scene.third.physics.add.box({x: 380, width: 10, height: 500, depth: 1000, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({x: -380, width: 10, height: 500, depth: 1000, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({z: 380, width: 1000, height: 500, depth: 10, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({z: -380, width: 1000, height: 500, depth: 10, collisionFlags: 2}, {phong: {visible: false}});
    scene.third.physics.add.box({y: 400, width: 2000, height: 10, depth: 2000, collisionFlags: 2}, {phong: {visible: false}});

    //sauce

    const textures = await Promise.all([
        scene.third.load.texture('waterTexture1'),
        scene.third.load.texture('waterTexture2')
    ]);

    textures[0].needsUpdate = true;
    textures[1].needsUpdate = true; 


    scene.third.misc.water({scale: 2, width: 5000, height: 5000, x: 0, y: -20, z: 0, color: 0x006ce0, normalMap0: textures[0], normalMap1: textures[1]});

}