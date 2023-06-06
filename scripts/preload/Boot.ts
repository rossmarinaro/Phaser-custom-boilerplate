/* BOOT */

import { System } from '../core/Config';
import resources_main from './resources/main.json';
import resources_3d from './resources/3d.json';
import JoyStick from '../plugins/joystick.js';


export class Boot extends Phaser.Scene { 

    private gameData: any

    constructor() {
        super('Boot');      
    }
    
//---------------------- initialize 

    private async init(): Promise<void> 
    {

        System.Process.app.events.init(this);
        
        
    //game scale 

        System.Process.app.scale.scaleWidth = this.scale.width; 
        System.Process.app.scale.scaleHeight = this.scale.height;
        System.Process.app.scale.scaleRatio = System.Process.app.scale.scaleWidth / System.Process.app.scale.scaleHeight * 0.9; 

    //call full screen if available

        this.input.keyboard.on('keyup', () => this.initFullscreen());
        this.input.on('pointerup', () => this.initFullscreen());

    //escape pointerlock

        this.input.keyboard.on('keydown-ESCAPE', ()=> this.input.mouse.releasePointerLock());

    }

    //------------------------------

    private async preload(): Promise<void>
    {

        // assets

        this.load.json('resources_3d', resources_3d);
        this.load.json('resources_main', resources_main);   

        //plugins

        this.load.plugin('rexvirtualjoystickplugin', JoyStick, true);
    }
    
//------------------------------- run preload scene

    private async create(): Promise<void>
    { 

        this.add.text(0, 0, '', { font: "1px Digitizer"}).setAlpha(0);
        this.add.text(0, 0, '', { font: "1px Bangers"}).setAlpha(0);

        this.time.delayedCall(500, ()=> {
        
        //gameplay data object (gets passed scene to scene)

            const data: any = new Phaser.Scenes.Systems(this, this.gameData); 

            this.scene.run('Preload', data.config);

        });
    }

//-------------------------------------- init fullscreen

    private initFullscreen(): void
    {
        if (!this.scale.isFullscreen && this.scale.fullscreen.available)
        {   
            this.scale.fullscreenTarget = document.getElementById(System.Process.app.parent);    
            this.scale.startFullscreen();
        }
    }
}


   