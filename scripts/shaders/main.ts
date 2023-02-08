import { System } from '../core/Config';
import { HueRotatePostFX, PlasmaPost2FX, MultiPipeline, Shaders } from './shaders.js';

export class ShaderManager {

    public static base: Object = {
        wave: new Phaser.Display.BaseShader('shader_wave', Shaders.frag.wave),
        vortex: new Phaser.Display.BaseShader('shader_vortex', Shaders.frag.fragVortex),
        portal: new Phaser.Display.BaseShader('shader_portal', Shaders.frag.fragPortal),
        fire: new Phaser.Display.BaseShader('shader_fire', Shaders.frag.fireShader),
        flare: new Phaser.Display.BaseShader('shader_flare', Shaders.frag.flareShader),
        checkers: new Phaser.Display.BaseShader('shader_checkers', Shaders.frag.checkers),
        hueTunnel:  new Phaser.Display.BaseShader('shader_hue_tunnel', Shaders.frag.hueTunnel),
        plasmaMask:  new Phaser.Display.BaseShader('shader_plasma_mask', Shaders.frag.plasmaMask),
        disco: new Phaser.Display.BaseShader('shader_disco', Shaders.frag.disco),
        disco2: new Phaser.Display.BaseShader('shader_disco2', Shaders.frag.disco2),
    }

    public static post = { 
        hueRotate: HueRotatePostFX,
        plasma: PlasmaPost2FX,
        multi: MultiPipeline,
    }
    
    public static init(scene: Phaser.Scene): void 
    { 
        scene.renderer['pipelines']
        .add('Hue', new ShaderManager.post.multi(System.Process.game))
        .set2f('uResolution', System.Process.game.config.width, System.Process.game.config.height); 
    }

    public static toggleWaterRenderer (scene: Phaser.Scene, bool: boolean): void
    {
        bool === true ? 
            scene.cameras.main.setPostPipeline(ShaderManager.post.plasma) :
            scene.cameras.main.resetPostPipeline();
    }


}