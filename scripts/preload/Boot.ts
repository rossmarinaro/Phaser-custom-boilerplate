/* BOOT */

import { System } from '../core/Config';

import resources_main from './resources/main.json';


import JoyStick from '../plugins/joystick.js';
import Utils from '../core/Utils';


export class Boot extends Phaser.Scene { 

    private gameData: any

    constructor() {
        super("Boot");      
    }
    
//---------------------- initialize 

    private async init(): Promise<void> 
    {

        System.Process.app.events.init(this);
        
        this.gameData = await System.Process.app.refreshApp();

    //utilities

        System.Process.utils = Utils;
        
    //game scale 

        System.Process.app.scale.scaleWidth = this.scale.width; 
        System.Process.app.scale.scaleHeight = this.scale.height;
        System.Process.app.scale.scaleRatio = System.Process.app.scale.scaleWidth / System.Process.app.scale.scaleHeight * 0.9; 

    //call full screen if available

        this.input.on('pointerup', () => {
            if (!this.scale.isFullscreen && this.scale.fullscreen.available)
            {   
                this.scale.fullscreenTarget = document.getElementById(System.Process.app.parent);    
                this.scale.startFullscreen();
            }
        });

        
    }

    //------------------------------

    private async preload(): Promise<void>
    {
        //// assets

            this.load.json('resources_3d', resources_3d);
            this.load.json('resources_main', resources_main);   
            this.load.json('resources_map', resources_map);  
            this.load.json('resources_entity', resources_entity);
            this.load.json('resources_minigames', resources_minigames);

        ////plugins

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
}


   