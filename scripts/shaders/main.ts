
import { System } from '../core/Config';
import { HueRotatePostFX, PlasmaPost2FX, MultiPipeline, Shaders } from './Shaders.js';
import { Scene3D, THREE } from '@enable3d/phaser-extension';
import { EffectComposer, RenderPass, ShaderPass } from '@enable3d/phaser-extension';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


export class ShaderManager {


    private static bloomComposer: EffectComposer
    private static finalComposer: EffectComposer
    private static renderPass: RenderPass
    private static bloomPass: UnrealBloomPass
    private static shaderPass: ShaderPass
    private static bloomLayer: THREE.Layers
    private static baseMaterial: THREE.MeshBasicMaterial
    private static materials: any = {}

    public static objectSelection: string | null
    public static postProcessing: boolean = false 
    public static shader: typeof Shaders = Shaders 
    public static shaderMaterials: THREE.ShaderMaterial[] = []

    // 2d base shaders

    public static base: any = {
        frag1: new Phaser.Display.BaseShader('shader_wave', ShaderManager.shader.fragmentShader),
        frag2: new Phaser.Display.BaseShader('shader_wave', ShaderManager.shader.fragmentShader2),
        wave: new Phaser.Display.BaseShader('shader_wave', ShaderManager.shader.wave),
        vortex: new Phaser.Display.BaseShader('shader_vortex', ShaderManager.shader.fragVortex),
        fire: new Phaser.Display.BaseShader('shader_fire', ShaderManager.shader.fireShader),
        flare: new Phaser.Display.BaseShader('shader_flare', ShaderManager.shader.flareShader),
        checkers: new Phaser.Display.BaseShader('shader_checkers', ShaderManager.shader.checkers),
        hueTunnel:  new Phaser.Display.BaseShader('shader_hue_tunnel', ShaderManager.shader.hueTunnel),
        plasmaMask:  new Phaser.Display.BaseShader('shader_plasma_mask', ShaderManager.shader.plasmaMask),
        disco: new Phaser.Display.BaseShader('shader_disco', ShaderManager.shader.disco),
        disco2: new Phaser.Display.BaseShader('shader_disco2', ShaderManager.shader.disco2),
    }

    //2d post pipeline
 
    public static post: any = { 
        hueRotate: HueRotatePostFX,
        plasma: PlasmaPost2FX,
        multi: MultiPipeline,
    } 


    //------------------------ init 2d pipelines

     
    public static init(scene: Phaser.Scene): void 
    { 
        scene.renderer['pipelines']
        .add('Hue', new ShaderManager.post.multi(System.Process.game))
        .set2f('uResolution', System.Process.game.config.width, System.Process.game.config.height); 

        ShaderManager.shaderMaterials = [];
    }


    //------------------- 2d water pipeline toggle


    public static toggleWaterRenderer (scene: Phaser.Scene, bool: boolean): void
    {
        bool === true ? 
            scene.cameras.main.setPostPipeline(ShaderManager.post.plasma) :
            scene.cameras.main.resetPostPipeline();
    }


    //------------------ 3d shader material


    public static createShaderMaterial(vert: string, frag: string, settings: { 

        uniforms: any,
        blending?: string,
        transparent?: boolean,
        depthTest?: boolean,
        depthWrite?: boolean,
        vertexColors?: boolean

    }): THREE.ShaderMaterial
    {

        //BLEND MODES: AdditiveBlending, SubtractiveBlending, MultiplyBlending, NormalBlending, NoBlending

        const shader = new THREE.ShaderMaterial({
            uniforms: settings.uniforms, 
            vertexShader: ShaderManager.shader[vert], 
            fragmentShader: ShaderManager.shader[frag],
            blending: settings.blending ? THREE[settings.blending] : THREE.NormalBlending, 
            transparent: settings.transparent ? settings.transparent : false,  
            depthTest: settings.depthTest ? settings.depthTest : false,
            depthWrite: settings.depthWrite ? settings.depthWrite : false,
            vertexColors: settings.vertexColors ? settings.vertexColors : false  
        });

        ShaderManager.shaderMaterials.push(shader);

        return shader;
    }


    //-------------------------------- 3d init post processing


    public static setPostProcessingBloom (

        scene: Scene3D, 
        params: { 
            bloomThreshold: number, 
            bloomStrength: number, 
            bloomRadius: number 
        }

    ): void
    {

        ShaderManager.baseMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

        ShaderManager.renderPass = new RenderPass(scene.third.scene, scene.third.camera),
        ShaderManager.bloomPass = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 1.5, 0.4, 0.85);
       
        ShaderManager.bloomPass.threshold = params.bloomThreshold;
        ShaderManager.bloomPass.strength = params.bloomStrength;
        ShaderManager.bloomPass.radius = params.bloomRadius;

        ShaderManager.bloomLayer = new THREE.Layers;
        ShaderManager.bloomLayer.set(1);

        ShaderManager.bloomComposer = new EffectComposer(scene.third.renderer);

        ShaderManager.bloomComposer.renderToScreen = false;
        ShaderManager.bloomComposer.addPass(ShaderManager.renderPass);
        ShaderManager.bloomComposer.addPass(ShaderManager.bloomPass);

        ShaderManager.shaderPass = new ShaderPass(new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: ShaderManager.bloomComposer.renderTarget2.texture },
                },
                vertexShader: ShaderManager.shader.three_std_Vert,
                fragmentShader: ShaderManager.shader.three_bloom_Frag,
                defines: {}
            }
        ), 'baseTexture');

        ShaderManager.shaderPass.needsSwap = true;

        ShaderManager.finalComposer = new EffectComposer(scene.third.renderer);

        ShaderManager.finalComposer.addPass(ShaderManager.renderPass);
        ShaderManager.finalComposer.addPass(ShaderManager.shaderPass); 

        ShaderManager.update3DRenderPipeline(scene);

    }


    //-------------------------------- limit bloom to targeted object


    public static setSelectiveBloom(bloomStrength: number, objectName: string): void
    {

        ShaderManager.bloomPass.strength = bloomStrength;
        ShaderManager.objectSelection = objectName;
        ShaderManager.postProcessing = true;

    }


    //-------------------------------- call animation frame and post processing


    private static update3DRenderPipeline(scene: Scene3D): void
    {

       if (!System.Process.app.game.gameState)
           return;
     
        requestAnimationFrame(()=> ShaderManager.update3DRenderPipeline(scene));

        const traverseObjects = (action?: boolean): void => { 

            if (ShaderManager.objectSelection !== null && scene.third)

                scene.third.scene.traverse((obj: any) => { 

                    if (
                        obj.isMesh &&
                        obj.type !== 'Water' &&
                        !ShaderManager.bloomLayer.test(obj.layers) && 
                        !obj.name.includes(ShaderManager.objectSelection)
                    )
                    {

                        if (action)
                        {
                            ShaderManager.materials[obj.uuid] = obj.material;
                            obj.material = ShaderManager.baseMaterial; 
                            return;
                        }
                    
                        obj.material = ShaderManager.materials[obj.uuid];
                        delete ShaderManager.materials[obj.uuid];
                    }
                });
        }

        if (ShaderManager.objectSelection !== null)
        {

            traverseObjects(true);

            //render bloom pass
    
            ShaderManager.bloomComposer.render();
    
            traverseObjects();
    
            //render shader pass
    
            ShaderManager.finalComposer.render();

            return;
        }

        if (!ShaderManager.postProcessing)
            return;


        //apply render passes to entire scene

        ShaderManager.bloomPass.strength = 0.5;

        ShaderManager.bloomComposer.render();
        ShaderManager.finalComposer.render();

    }
    
}