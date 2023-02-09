///**** APPLICATION LEVEL CONFIG ***////  

import * as types from '../../../typings/types';


import { System } from './Config';
import { GameData } from './Data';
import { Game } from './Game';

import { AudioManager } from './Audio';
import { AjaxManager } from './AjaxManager';
import { InputManager } from '../controls/Inputs';
import { LoginManager } from './Login';
import { InventoryManager } from './Inventory';
import { MapManager } from './Maps';
import { EventManager } from './Events';
import { SpawnManager } from './Spawns';
import { ShaderManager } from '../shaders/main';

import { UI } from '../interfaces/UI';
import { Text } from './Text';

import { Camera } from './camera';

import { Particles } from '../game_objects/particles';
import { Projectile } from '../game_objects/projectile';

import { Boot } from '../preload/Boot';
import { Preload } from '../preload/Preload';
import { Controller } from '../controls/Controller';
import { HUD } from '../interfaces/HUD';
import { TextUI } from './Text';
import { Background } from '../scenes/Background';



//------------------------------------ APP

export default class Application {
 
    public game: typeof Game = Game
    public dataManager: typeof GameData = GameData
    public ajax: typeof AjaxManager = AjaxManager
    public audio: typeof AudioManager = AudioManager
    public shaders: typeof ShaderManager = ShaderManager
    public events: typeof EventManager = EventManager
    public inputs: typeof InputManager = InputManager
    public spawner: typeof SpawnManager = SpawnManager
    public inventory: typeof InventoryManager = InventoryManager
    public maps: typeof MapManager = MapManager

    public cam: typeof Camera = Camera
    public text: typeof Text = Text

    public projectile: typeof Projectile = Projectile
    public particles: typeof Particles = Particles
    
    public gfx: Phaser.GameObjects.Graphics
    public zoneFront: Phaser.GameObjects.Zone
    public zoneBack: Phaser.GameObjects.Zone

    public instruments: types.instruments
    public isPreloaded: types.isPreloaded
    public multiPlayer: types.multiPlayer
    public miniGames: types.miniGames
    public account: types.account

    public timeOfDay: Readonly<number>
    public timeWarp: Readonly<number> 
    public gameData: any
    public scale: any
    public pipeline: any[]

    public input: types.input
    public scene: typeof Phaser.Scene[]
    public interfaces: typeof Phaser.Scene[]
    public transparent: boolean
    public pixelArt: boolean
    public dom: { createContainer: boolean }
    public parent: string
    public backgroundColor: string
    public date: Readonly<Date>
    public hours: number 
    public type: number
    public physics: any


//-----------------------------------------------------------

    constructor(system: System.Config)
    {  

        this.type = Phaser.WEBGL;
        this.transparent = true;
        this.parent = system.parent;
        
        this.pipeline = [ 
            this.shaders.post.hueRotate, 
            this.shaders.post.plasma
        ];

        this.scale = {
            mode: system.mode,
            autoCenter: system.position,
            width: system.width,
            height: system.height,
            min: {
                width: system.min.width,
                height: system.min.height
            },
            max: {
                width: system.max.width,
                height: system.max.height
            },
            scaleRatio: 0,
            parentBottom: null, 
            sizerBottom: null
        };

        this.dom = { createContainer: true };

        this.input = {
            virtual: true,
            gamepad: true,
            type: system.inputType,
            mode: 'A'
        };

        this.physics = {
            collisions: 'some CollisionManager class',
            default: 'arcade'
        };

        this.interfaces = [

            Controller, 
            HUD, 
            TextUI

        ];

        this.scene = [ 

            Boot,
            Background, 
            Preload,
            ...Game.scene,
            ...this.interfaces

        ];


    //------------------------------- subsystems


        this.isPreloaded = {
            //ui: false,
            BassUI: false,
        };


    //user account schema

        this.account = {

            username: null,
            loggedIn: false,
            paid: false,
            signUp: LoginManager.signUp,
            login: LoginManager.login,
            logout: LoginManager.logout
        };


    }


//--------------------------------------------- reinit variables


    public async refreshApp(): Promise<Readonly<Phaser.Scenes.Systems>>
    { 

        System.Process.app.events.socket = null;
        System.Process.app.game.multiPlayer.username = null;
        System.Process.app.game.multiPlayer.isPlaying = false;
        System.Process.app.spawner.recruitedPlayers = [];
        System.Process.app.text.textContent = [];
    
        System.Process.app.ui = new UI; 
        System.Process.app.gameData = new GameData;
        System.Process.app.gameData.player.color = 'red';

        return System.Process.app.gameData;
    }


}

        

