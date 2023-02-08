/* SPAWNER */

import { System } from './Config';

import { PlayerSpawns } from '../spawns/player.js';
import { baddieSpawns } from '../spawns/baddies.js';
import { pickupSpawns } from '../spawns/pickups.js';

import { Pickup } from '../game_objects/items/pickups';
import { Accessory } from '../game_objects/items/accessories';


//enemies

import Banana  from '../game_objects/enemies/Banana.js';
import BakedBeans from '../game_objects/enemies/BakedBeans.js';
import Apple from '../game_objects/enemies/Apple.js';
import Meatball from '../game_objects/enemies/Meatball.js';
import CarpShooter from '../game_objects/enemies/CarpShooter.js';
import Chili from '../game_objects/enemies/Chili.js';
import Cheese from '../game_objects/enemies/Cheese.js';
import CollieFlower from '../game_objects/enemies/CollieFlower.js';
import Mobster from '../game_objects/enemies/Mobster.js';
import Crab from '../game_objects/enemies/Crab.js';
import JellyFish from '../game_objects/enemies/JellyFish.js';
import Cupcake from '../game_objects/enemies/Cupcake.js';
import NavalOrange from '../game_objects/enemies/NavalOrange.js';
import Cat from '../game_objects/enemies/Cat.js';
import Pickle from '../game_objects/enemies/Pickle.js';
import Piranha from '../game_objects/enemies/Piranha.js';
import MacZombie from '../game_objects/enemies/MacZombie.js';
import GhostPepper from '../game_objects/enemies/GhostPepper.js';
import Pirate from '../game_objects/enemies/Pirate.js';
import PirateBoat from '../game_objects/enemies/PirateBoat.js';
import IceCreamCone from '../game_objects/enemies/IceCreamCone.js';
import Taxi from '../game_objects/enemies/Taxi.js';
import WalkingSpaghettiMonster from '../game_objects/enemies/WalkingSpaghettiMonster.js';
import Sniper from '../game_objects/enemies/Sniper.js';
import SushiChef from '../game_objects/enemies/SushiChef.js';


//bosses

import Rival from '../game_objects/rivals/main';
import CrookedCook from '../game_objects/bosses/CrookedCook.js';
import EggPlant from '../game_objects/bosses/Eggplant.js';
import HitWoman from '../game_objects/bosses/HitWoman.js';
import ScorpionPepper from '../game_objects/bosses/ScorpionPepper.js';
import Ninja from '../game_objects/bosses/Ninja.js';
import CakeBoss from '../game_objects/bosses/CakeBoss.js';
import PizzaPie from '../game_objects/bosses/PizzaPie.js';
import PizzaSlice from '../game_objects/bosses/PizzaSlice.js';
import MonkFish from '../game_objects/bosses/MonkFish.js';
import SupremeLeader from '../game_objects/bosses/SupremeLeader.js';
import HotDog from '../game_objects/bosses/HotDog.js';
import Fluke1 from '../game_objects/bosses/Fluke1.js';
import Fluke2 from '../game_objects/bosses/Fluke2.js';
import Mummy from '../game_objects/bosses/Mummy.js';


export class SpawnManager {

    private static scene: Phaser.Scene
    private static spawned: any[]

    private static baddies: boolean | undefined
    private static pickups: boolean | undefined

    public static spawns: Object
    public static entities: Phaser.GameObjects.Sprite[] | any
    public static recruitedPayers: Phaser.GameObjects.GameObject[]

    public static async init(scene: Phaser.Scene, playerArgs?: any[], isEnemies?: boolean, isPickups?: boolean): Promise<void>
    {
        SpawnManager.scene = scene;
        SpawnManager.spawned = [];

        SpawnManager.baddies = isEnemies;
        SpawnManager.pickups = isPickups;

        SpawnManager.spawns = {
            player: PlayerSpawns,
            baddies: baddieSpawns,
            pickups: pickupSpawns
        }

        SpawnManager.entities = {
            Banana,
            BakedBeans,
            Apple,
            Meatball,
            CarpShooter,
            Chili,
            Cheese,
            CollieFlower,
            Mobster,
            Crab,
            JellyFish,
            Cupcake,
            NavalOrange,
            Cat,
            Pickle,
            Piranha,
            MacZombie,
            GhostPepper,
            Pirate,
            PirateBoat,
            IceCreamCone,
            Taxi,
            WalkingSpaghettiMonster,
            Sniper,
            SushiChef,
            Rival,
            CrookedCook,
            EggPlant,
            HitWoman,
            ScorpionPepper,
            Ninja,
            CakeBoss,
            PizzaPie,
            PizzaSlice,
            MonkFish,
            SupremeLeader,
            HotDog,
            Fluke1,
            Fluke2,
            Mummy 
        }


        if (playerArgs)
        {
            SpawnManager.scene['player'] = new System.Process.app.game.player(
                playerArgs[0], 
                playerArgs[1], 
                playerArgs[2], 
                playerArgs[3], 
                playerArgs[4], 
                playerArgs[5], 
                playerArgs[6], 
                playerArgs[7]
            );

        //set player position

            const positionData = await SpawnManager.spawns['player'].init(playerArgs, SpawnManager.scene);  

            SpawnManager.setPlayerPosition(SpawnManager.scene['player'], positionData)

        }

        if (SpawnManager.baddies)
            SpawnManager.spawns['baddies'](SpawnManager.scene);
        if (SpawnManager.pickups)
            SpawnManager.spawns['pickups'](SpawnManager.scene);

    //recruited players 

        // if (System.Process.app.spawner.recruitedPlayers.length > 0)
        //     for (let i in System.Process.app.spawner.recruitedPlayers)
        //     {
        //         const rival = new SpawnManager.entities.Rival(
        //             SpawnManager.scene, 
        //             SpawnManager.scene['player'].flipX ? SpawnManager.scene['player'].x + 100 : SpawnManager.scene['player'].x - 100, 
        //             SpawnManager.scene['player'].y - 10, 
        //             System.Process.app.spawner.recruitedPlayers[i]
        //         );
        //         SpawnManager.scene.time.delayedCall(1000, ()=> rival.setFriend()); 
        //     }
    }

//---------------------------------------------------------------------

    private static setPlayerPosition(player: Phaser.GameObjects.Sprite, positionData: any): void
    { 
        if (!player['hitbox'] || !positionData || positionData === null)
            return;
            
        player.setPosition(positionData[0], positionData[1]).setFlipX(positionData[2]);
        player['hitbox'].setFlipX(positionData[2]);
    }

//---------------------------------------------------------------------


    public static async setSpawnPoint(level: string): Promise<void>
    {
        const entryPoints = await SpawnManager.spawns['player'].getSpawnPoints(SpawnManager.scene, level);
        if (entryPoints)
        {
            SpawnManager.scene.data['spawnPoint'] = entryPoints[0];
            SpawnManager.scene.data['currentStage'] = !entryPoints[1] ? entryPoints[0] : entryPoints[1];
        }
    }

//------------------------------------------------ basic item spawn


    public static spawnPickup(x: number, y: number, item: string, array: string, isLevelPickup?: boolean, transportCallback?: any): Pickup
    {
        const pickup = new Pickup(SpawnManager.scene, x, y, item, array, isLevelPickup, 0, transportCallback);

        SpawnManager.spawned.push(pickup); 

        return pickup; 
    }

 
//------------------------------------------------- multiplayer: random item spawn (item, weapon, powerup) 


    public static async spawnRandomPickup(x: number, y: number, serialNum: number): Promise<Pickup>
    {
        const itemSet = await System.Process.app.inventory.getItemSet(serialNum);
        return new Pickup(SpawnManager.scene, x, y, itemSet[0], itemSet[1], false, serialNum);
    }



//----------------------------------------------------- spawn accessory (ammo, powerup)


    public static async spawnRandomAccessory (

        x: number, 
        y: number, 
        spawnMultiple: boolean, 
        transportCallback?: any

    ): Promise<Accessory | null | undefined>
    {

        let item: any;

        const genArr = async (num: number) => {
            switch (num)
            {
                case 1:
                    return 'weapons';
                case 2:
                    return 'powerups';
                case 3:
                    return 'currency'; 
                default: return '';
            }
        }
        
    //    if (Math.floor(Math.random() * 10 + 1) < 3)
    //        return;

        const arr = await genArr(Math.floor(Math.random() * 3 + 1));

        if (arr !== '')
            item = SpawnManager.scene.data[arr][Math.floor(Math.random() * SpawnManager.scene.data[arr].length)]; 

        if (SpawnManager.scene.data[arr].includes(item) && !System.Process.app.inventory.weapons_no_ammo.includes(item))
        {
            if (spawnMultiple) 
                for (let i = 0; i < 3; i++)
                { 
                    new Accessory( 
                        SpawnManager.scene, 
                        Math.floor(Math.random() * 10 + 1) > 5 ? x - 20 : x + 20, 
                        Math.floor(Math.random() * 10 + 1) > 5 ? x - 20 : x + 20, 
                        item, 
                        arr
                    )
                    .setVelocityY(300);

                    return null;
                }
            else
                return new Accessory(SpawnManager.scene, x, y, item, arr, transportCallback).setVelocityY(300);
        }
        else 
            return null;
    }


//----------------------------------------------------- special item


    public static async spawnSpecialItem
    (
        x: number, 
        y: number, 
        item: string, 
        array: string, 
        frame: string,
        transportCallback?: any
        
    ): Promise<Pickup>
    {

        let spawn = this.spawnPickup(x, y, item, array, true, transportCallback);

        if (frame !== '')
            spawn.setTexture(item, frame).setScale(0.3);
        
        spawn.body['moves'] = false;

        SpawnManager.scene.tweens.add({targets: spawn, y: spawn.y - 20, duration: 1000, ease: 'Sine.easeInOut', repeat: -1, yoyo: true});

        return spawn;
    }


//------------------------------------------------------------------ droning baddies


    public static spawnDrones (x1: number, x2: number, y1: number, y2: number, type: any, num: number): void
    {
        SpawnManager.scene.time.addEvent({delay: 5000, callback: () => {

            if (
                System.Process.app.game.fightBoss === false && 
                System.Process.app.game.spawns.length <= num && 
                SpawnManager.scene['player'].tripping === false
            )
            {
                let spawn = new type(SpawnManager.scene, Phaser.Math.Between(x1, x2), Phaser.Math.Between(y1, y2))
                System.Process.app.game.spawns.push(spawn);
            }
        }, callbackScope: SpawnManager.scene, repeat: -1});  
    }


//---------------------------------------- spawn npc / interaction

    public static spawnNPC (

        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        flipBodyX: boolean | null,
        flipBubbleX: boolean,
        spritesheet: string,
        frame: any, 
        messageA: string | string[] | null, 
        messageB?: string | string[] | null,
        options?: string[] | null 

    ): 
    [
        Phaser.GameObjects.Zone, 
        Phaser.Physics.Arcade.Collider, 
        Phaser.GameObjects.Sprite
    ]
    {
        
        let character = scene.add.sprite(x, y, spritesheet, frame), 
            characterZone = scene.add.zone(x, y, 150, 200),
            bubbleX = flipBubbleX ? x + 150 : x - 150,
            bubbleY = y - character.height / 1.5,
            areOptions = options && options !== null ? true : false,
            name = typeof frame === 'string' || frame instanceof String ? frame : spritesheet;

        scene.physics.world.enable(characterZone); 
        characterZone.body['setAllowGravity'](false).setImmovable(true);

        const characterOverlap = scene.physics.add.overlap(System.Process.app.game.groups.playerGroup, characterZone, ()=> { 

            if (scene.scene.get('Controller')['_inputs'].states.select === true && !scene.scene.isActive('TextUI')) 
            {

            //dialog A

                if (messageA !== null)
                {

                    System.Process.app.game.cutScene = true;

                    let currMessA = messageA instanceof Array ? scene['player'].unMasked ? 
                        messageA[0] : messageA[1] : messageA;

                    System.Process.app.text.characterInteractionDialog (
                        scene, 
                        bubbleX, 
                        bubbleY, 
                        flipBubbleX, 
                        messageB ? null : characterOverlap, 
                        `${System.Process.utils.strings.replaceUnderscore(name)}: ${currMessA}`, 
                        areOptions ? options : null, 
                        areOptions ? true : null
                    );

                //dialog B
                
                    if (messageB)
                    {
                        let currMessB = messageB instanceof Array ? 
                            scene['player'].unMasked ? messageB[0] : messageB[1] : messageB;
    
                        scene.time.delayedCall(5000, ()=> {
                            System.Process.app.text.characterInteractionDialog (
                                scene, 
                                bubbleX, 
                                bubbleY, 
                                flipBubbleX, 
                                characterOverlap, 
                                `${System.Process.utils.strings.replaceUnderscore(name)}: ${currMessB}`, 
                                areOptions ? options : null, 
                                areOptions ? true : null
                            );

                            System.Process.app.game.cutScene = false;
                        });
                    }
                    else
                        scene.time.delayedCall(3000, ()=> System.Process.app.game.cutScene = false);
                    
                }

            //--------------- emit dialog events
            
                if (!areOptions)
                    System.Process.app.events.ee.emit('dialog', null);
            }
        });

        scene.events.on('update', ()=> {
            
            if (flipBodyX !== null && scene['player'] && character)
                character.setFlipX (
                    scene['player'].x > character.x ? 
                    flipBodyX : !flipBodyX
                );
        });

        return [characterZone, characterOverlap, character];
    }

}