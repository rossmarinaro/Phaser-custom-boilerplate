/* PARTICLES */

import { System } from '../core/Config'

export class Particles {


    public static destroyEmitter: Particles
    public static muzzFlashEmitter: Particles

    public type: string 
    public particles: any
    public emitter: any

    private scene: Phaser.Scene
    private texture: string
    private frame: number
    private startX: number
    private endX: number
    private startY: number
    private endY: number
    private speedX: number
    private speedY: number
    private quantity: number
    private alpha: number
    private lifespan: number
    private willExplode: boolean

    constructor(scene: Phaser.Scene, type: string, params: any[])
    {
        this.scene = scene;
        this.type = type;

        this.texture = params[0];
        this.frame = params[1];
        this.startX = params[2];
        this.endX = params[3];
        this.startY = params[4];
        this.endY = params[5];
        this.speedX = params[6];
        this.speedY = params[7];
        this.quantity = params[8];
        this.alpha = params[9];
        this.lifespan = params[10];
        this.willExplode = params[11]; 
        
        this.particles = this.scene.add.particles(this.texture).setDepth(100);
        this.emitter = this.particles.createEmitter(this.type === 'bullet' ? 
            {
                frame: this.frame,
                x: {
                    start: this.startX, 
                    end: this.endX, 
                    steps: 56
                },
                y: {
                    start: this.startY,
                    end: this.endY,
                    steps: 56
                },
                lifespan: this.lifespan, 
                speedX: this.speedX,
                speedY: this.speedY,
                quantity: this.quantity,
                scale: { start: 0.5, end: 0.1 },
                alpha: this.alpha,
                blendMode: 'ADD'
            }
            :
            {speed: 100, scale: {start: 1, end: 0}, blendMode: 'ADD'}
        )//.setPosition(-100, -100); 

        this.scene.time.delayedCall(600, ()=> this.willExplode !== null && this.willExplode !== undefined ? this.emitter.explode(-1) : this.emitter.setPosition(-100, -100));

    }

    //----------------------------------------------

    public explode(x: number, y: number, amount: number): void
    {

        for (let i = 0; i < amount; ++i)
            this.emitter.emitParticle(
                Phaser.Math.Between(150, 250), 
                Phaser.Math.Between(x - 20, x + 20), 
                Phaser.Math.Between(y - 20, y + 20)
            );
        this.emitter.explode(-1);
    }

    //--------------------------------------------------

    public static setCommon (scene: Phaser.Scene): void
    { 
        
        System.Process.app.particles.destroyEmitter = new System.Process.app.particles(scene, '', ['fire_ball', 1, -1000, -1000]);
        System.Process.app.particles.muzzFlashEmitter = new System.Process.app.particles(scene, 'bullet', ['particles', 'fr03', -1000, -1000, 0, 0, 0, 0, 5, 1, 1000, false]);

    //set visible false, timeout to true
        System.Process.app.particles.destroyEmitter.particles.visible = false;
        System.Process.app.particles.muzzFlashEmitter.particles.visible = false;

        scene.time.delayedCall(500, () => {
            System.Process.app.particles.destroyEmitter.particles.visible = true;
            System.Process.app.particles.muzzFlashEmitter.particles.visible = true;
        });

    }

}