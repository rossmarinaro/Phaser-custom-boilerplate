//------------------------- Events 


import { System } from './Config';

let io: any = null;  //import { io } from 'socket.io-client';

if (System.Config.internet.connected)
    io = require('socket.io-client');



export class EventManager {


    public static ee: Phaser.Events.EventEmitter | null = null
    public static socket: any = null
    
    public static scene: Phaser.Scene
 

    //---------------------------------------- trigger paywall event


    public static triggerPaywall(currentScene: Phaser.Scene, sceneToContinue: Phaser.Scene): void
    {
        System.Process.app.account.paid === true || !System.Config.internet.connected ? 
            System.Process.app.events.ee.emit('game', sceneToContinue) :
            currentScene.scene.run('Modal', [currentScene, 'generic', 'paywall']);
    }

    //---------------------------------------- init web socket


    public static async socketInit(): Promise<boolean> 
    {
        if (System.Process.app.events.socket !== null || !System.Config.internet.connected)
            return true;

        System.Process.app.events.socket = io(/* System.Process.app.ajax.proxyConnection */); 
        System.Process.app.events.socket 
            .on('connect_error', (err: any) => System.Process.app.events.socketErrorHandler(err))
            .on('connect_failed', (err: any) => System.Process.app.events.socketErrorHandler(err))
            .on('connect_disconnect', (err: any) => System.Process.app.events.socketErrorHandler(err));

        return false;
    }

    //---------------------------------------- socket emit

    public static socketEmit(sockStr: string, sockData: any): void
    {
        if (System.Process.app.events.socket !== null)
            System.Process.app.events.socket.emit(sockStr, sockData);
    }

    //---------------------------------------- close web socket


    public static socketClose(socket: any): void
    {
        socket.disconnect();  
        System.Process.app.events.socket = null;
    }

    //---------------------------------------- socket error handling


    public static socketErrorHandler (err: any): boolean
    {
        console.log('socket error: ', err);
        System.Process.app.ui.displayMessage(`OOF! NETWORK ERROR: ${err}`, true, true);
        
        return false;
    }


    //---------------------------------------- return to game


    public static returnToGame (scene: Phaser.Scene, _this: Phaser.Scene, spawnPoint: string, currentStage: string, sceneKey: string): void
    {
        scene.sound.stopAll(); 
        scene.sound.removeAll();
        
        scene.data['spawnPoint'] = spawnPoint; 
        scene.data['currentStage'] = currentStage;

        _this.scene.run('Quest', scene.data);

        EventManager.scene.scene.stop('Modal');
        EventManager.scene.scene.stop('Background');
        
        _this.scene.stop(sceneKey);
        
    }

    
    //---------------------------------------- quit game


    public static quitGame(scene: Phaser.Scene | Scene3D): void
    {
        if (System.Process.app.events.socket !== null)
            System.Process.app.events.socketClose(scene['connection']); 

        System.Process.app.game.gameState = false;
        System.Process.app.events.ee.emit('exit');
    }


    //---------------------------------------- enter building event


    public static enterBuilding (

        scene: Phaser.Scene, 
        collider: Phaser.Physics.Arcade.Collider, 
        type: string, 
        name: string, 
        factor?: any
        
    ): void 
    {
        if (scene.scene.get('Controller')['_inputs'].states.select === false)
            return;

        if (factor !== null)
        {
            if (factor instanceof Object)
            {
                if (factor.isLocked === false)
                    System.Process.app.text.characterInteractionDialog(scene, -100, -100, false, collider, `ENTER ${type}?`, [], true, name);
                else
                    System.Process.app.text.characterInteractionDialog(scene, -100, -100, false, collider, `THIS DOOR IS LOCKED.`);
            }
            else
            {
                if (scene.data['player'].human === true)
                {
                    let time = System.Process.app.timeOfDay >= 17 ? 'night' : 'day';
                    
                    if (factor === time) 
                        System.Process.app.text.characterInteractionDialog(scene, -100, -100, false, collider, `ENTER ${type}?`, [], true, name);
                    else
                        System.Process.app.text.characterInteractionDialog(scene, -100, -100, false, collider, `${type} IS CLOSED.   `);   
                }
                else 
                    System.Process.app.text.characterInteractionDialog(scene, -100, -100, false, collider, `Sorry, Humans only.`);  
            }
        }
        else
            System.Process.app.text.characterInteractionDialog(scene, -100, -100, false, collider, `ENTER ${type}?`, [], true, name);

    }


    //---------------------------------------- init in-game events


    public static init (scene: Phaser.Scene): void
    {

        EventManager.ee = scene.events;

        EventManager.ee
        
        .on('exit', async ()=> {  
            
        // exit main game

            EventManager.stopCommon();

        // refresh stale data, restart intro scene

            const data = await System.Process.app.refreshApp();

            EventManager.scene.scene.run('Intro', data);
     
            EventManager.scene.scene.stop('PauseMenu');
            EventManager.scene.scene.stop('Menu3D'); 
        })

        .on('pause', (bool: boolean) =>{ 
            
            if (bool === true)
            {
                System.Process.app.gfx.setAlpha(0.8);
                EventManager.scene.scene.run('PauseMenu', EventManager.scene);
 
                EventManager.scene.scene.stop('SaveMenu');

            }
        })
    
        .on('resume', ()=>{

            EventManager.scene.scene.get('Controller')['_inputs'].pauseMenu.isPaused = false;

            System.Process.app.gfx.setAlpha(0);

  

            EventManager.scene.scene.launch('TextUI');
            EventManager.scene.scene.stop('PauseMenu');
            EventManager.scene.scene.stop('WarpMenu');
        })

        .on('controller', ()=>{ 

            EventManager.scene.scene.run('Controller', [EventManager.scene, EventManager.scene.data['player'].self]);

        })

        .on('retry', ()=> {

            EventManager.stopCommon();
            EventManager.scene.scene.run('Background', {type: 'blank'});
            EventManager.scene.scene.start('GameOver');
        })

        .on('credits', ()=>{

            EventManager.scene.scene.launch('Credits');
            EventManager.scene.scene.stop('Controller');
            EventManager.scene.scene.stop('HUD');
            EventManager.scene.scene.stop('Quest');
        })

        .on('game', (level: string) => {  
            
            if (level === 'warp menu')
            {
                return[
                    System.Process.app.audio.play('some sound', 1, false, EventManager.scene, 0), 
                    System.Config.vibrate(20),
                    EventManager.scene.scene.pause('Quest'),
                    EventManager.scene.scene.run('WarpMenu', EventManager.scene)
                ];
            }
            else
            {
                EventManager.scene.cameras.main.fade(300, 0, 0, 0, false, async (camera: any, progress: number) =>{
                    if(progress > .9 )
                    {
                    
                    await System.Process.app.spawner.setSpawnPoint(level); 

                    EventManager.scene.sound.stopAll(); 
                    EventManager.scene.sound.removeAll();

                //set player to idle

                    EventManager.scene['player'].hitbox.setVisible(false);
                    System.Process.app.game.cutScene = true;
                    System.Process.app.game.gameState = false;
                    System.Process.app.game.interact = false;
                    
                //if level directs to same scene, just restart instead of stopping

                    EventManager.scene.scene.stop('Controller');      
                    EventManager.scene.scene.stop('HUD');   
                    EventManager.scene.scene.stop('TextUI'); 
                        switch (level)
                        {
                            case 'Pub' : 
                            case 'Sushi Bar' : 
                            case 'Cafe' : 
                            case 'Weapon Shack' : 
                            case 'Pawn Shop' : 
                            case `Meatballin'` :
                            case 'Pinball' :
                            case 'Swanky Velvet' :
                            case 'Bubble Mini Game':
                            case 'SkeetShoot':
                            case 'Mini Game Race':
                            case 'Jam Sesh':

                                EventManager.scene.scene.run('Background', {type: 'blank'});
                                EventManager.scene.scene.stop('Quest');
                            break;
                            default : 
                                EventManager.scene.scene.restart(EventManager.scene.data); 
                            break;
                        }
                    }
                });
            }
        });

    }

    //---------------------------------------- stop common


    private static stopCommon(): void
    {
        
        EventManager.scene.sound.stopAll(); 
        EventManager.scene.sound.removeAll();  
    
        EventManager.scene.scene.stop('SeaShell_MiniGame');
        EventManager.scene.scene.stop('Bubble_MiniGame');
        EventManager.scene.scene.stop('Racing_MiniGame');
        EventManager.scene.scene.stop('Quest'); 
        EventManager.scene.scene.stop('Brawl'); 
        EventManager.scene.scene.stop('HUD'); 
        EventManager.scene.scene.stop('Modal'); 
        EventManager.scene.scene.stop('Controller'); 
        EventManager.scene.scene.stop('Background'); 
        EventManager.scene.scene.stop('TextUI');
        EventManager.scene.scene.stop('Racing_MiniGame');
        EventManager.scene.scene.stop('Chat');
        EventManager.scene.scene.stop('Credits');
        EventManager.scene.scene.stop('Modal');
        EventManager.scene.scene.stop('GameOver');
         
    }

}
