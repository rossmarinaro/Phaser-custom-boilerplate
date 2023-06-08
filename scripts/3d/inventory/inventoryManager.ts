import * as types from '../../../../typings/types';
import * as ENABLE3D from '@enable3d/phaser-extension';

import { System } from '../../core/Config';
import { Pickup3D } from '../objects/Pickup';
import { PlayerItem } from './playerItem';
import { Actor } from '../objects/Actor';


export class Inventory3D {

    private static weapons: string[] = ['rolling_pin1', 'penne_pistol', 'automac1000', 'rigatoni_rocket_launcher']
    private static powerups: string[] = ['ikura_maki_tile']
    private static selections: string[] = [...Inventory3D.weapons, ...Inventory3D.powerups]

    public static currentInventory: string[] = []
    public static currentSelection: string = ''
    public static pickup: typeof Pickup3D = Pickup3D
    public static ammo: types.ammo = {
        automac1000: 0,
        penne_pistol: 0,
        rigatoni_rocket_launcher: 0,
        grenade: 0,
        dynamite: 0 
    }

//------------------------------------------------ reset inventory to defaults

    public static reset(base: number): void
    {
    
        Inventory3D.currentSelection = '';
        Inventory3D.currentInventory = [];
        
        Inventory3D.ammo = {
            automac1000: base,
            penne_pistol: base,
            rigatoni_rocket_launcher: base,
            grenade: base,
            dynamite: base
        }
    }


//------------------------------------------------ ammo


    public static makeUnlimitedAmmo (): void
    {
        Inventory3D.ammo = {
            automac1000: Infinity,
            penne_pistol: Infinity,
            rigatoni_rocket_launcher: Infinity,
            grenade: Infinity,
            dynamite: Infinity
        }
    }


//------------------------------------------------ get item / pickup


    public static async aquirePickup (scene: ENABLE3D.Scene3D, obj: ENABLE3D.ExtendedObject3D): Promise<void>
    {
        
        if (obj.hasBody && Inventory3D.selections.includes(obj['key']))
        {

            const str = await System.Config.utils.strings.removeJunk(obj['key']),
                  article = await System.Config.utils.strings.checkVowel(str),
                  player = scene['player'];

            scene.scene.get('Alerts')['alert']('small', `You picked up ${article} ${str}`);

            if (Inventory3D.powerups.includes(obj['key']))
                player.initPowerup(obj['key']);
            
            if (Inventory3D.weapons.includes(obj['key']))
            {
                const doesExist = await Inventory3D.checkDoesExist(obj); 
                
                if (doesExist)
                    Inventory3D.increment(scene, obj);
                else  
                {
                
                    scene.data['weapons'].push(obj['key']);
    
                    if (player.currentEquipped.obj)
                        player.currentEquipped.obj.remove(player.currentEquipped.obj.children[0]);

                    Inventory3D.increment(scene, obj);
                    Inventory3D.setItem(scene, obj['key']);
                    
                }
            }

            System.Process.app.events.socketEmit('DEATHMATCH: collected pickup', { key: obj['key'], id: obj['_id'] });

            obj.remove(obj.children[0]);
            scene['third'].physics.destroy(obj);

        }
    }


//------------------------------ set item


    public static async setItem(scene: ENABLE3D.Scene3D, item: string): Promise<void>
    {

        System.Config.vibrate(20);

        if (Inventory3D.currentSelection === item)
            return;
        
        const player = scene['player'],

        applySelection = async (): Promise<[number, boolean] | null> => {

            switch (item)
            {
                case 'rolling_pin1' : 
                    return [0, false];
                case 'penne_pistol' :
                case 'automac1000' : 
                case 'rigatoni_rocket_launcher' : 
                    return [Inventory3D.ammo[item], true]; 
                default: return null;
            }
        },

        selection = await applySelection();
        
        if (selection !== null)
        {
            if (player.currentEquipped.obj !== null)
                player.currentEquipped.obj.remove(player.currentEquipped.obj.children[0]);
                
            player.currentEquipped.key = item;
            player.currentEquipped.quantity = selection[0];
            player.currentEquipped.obj = null;
            player.currentEquipped.obj = new PlayerItem(scene, item, selection[1]); 
            player.swapItem({item: {key: item}});
        }

        Inventory3D.currentSelection = item;

        System.Process.app.events.socketEmit('DEATHMATCH: item swap', { key: item });
    }



//-------------------------------- check next best item


    public static checkNextBestItem(scene: ENABLE3D.Scene3D): void
    {

        Inventory3D.currentInventory.forEach(async () => {

            for (let entry of Object.entries(Inventory3D.ammo))

                if (Inventory3D.currentInventory.includes(entry[0]) && entry[1] > 0)
                {
                    await Inventory3D.setItem(scene, entry[0]);
                    return;
                }
                
                else
                {
                    if (Inventory3D.currentInventory.includes('rolling_pin3'))
                        await Inventory3D.setItem(scene, 'rolling_pin3');

                    else if (Inventory3D.currentInventory.includes('rolling_pin2'))
                        await Inventory3D.setItem(scene, 'rolling_pin2');

                    else 
                        await Inventory3D.setItem(scene, 'rolling_pin1'); 
                }
                
        });
    }


//------------------------------- remove player's first person accessory


    public static setAsStandAloneItem ( target: ENABLE3D.ExtendedObject3D, child: ENABLE3D.ExtendedObject3D): void
    {
    
        switch(target['key'])
        {
            case 'rolling_pin1': 
                Inventory3D.checkObjNames(child, 'arm', 'glove');
                target.scale.set(3, 3, 3);
            break;
            case 'penne_pistol': 
                Inventory3D.checkObjNames(child, 'arm', 'glove', 'muzzle');
                target.scale.set(6.1, 6.1, 6.1);
                target['capacity'] = 10;
            break;
            case 'automac1000': 
                Inventory3D.checkObjNames(child, 'arm', 'glove', 'muzzle');
                target.scale.set(5, 5, 5);
                target['capacity'] = 30;
            break;
            case 'rigatoni_rocket_launcher': 
                target.scale.set(7, 7, 7);
                target['capacity'] = 10;
            break;
            case 'ikura_maki_tile':
                target.scale.set(2, 2, 2);
            break;
        }
    }


    //--------------------------------- set third person weapon


    public static setItemForThirdPerson ( target: Actor, child: ENABLE3D.ExtendedObject3D): void
    {
    
        switch(target['key'])
        {
            case 'rolling_pin1': 
                target.scale.set(3, 3, 3);
                Inventory3D.checkObjNames(child, 'arm', 'glove'); 
            break;
            case 'penne_pistol': 
            case 'automac1000':
                target.scale.set(5, 5, 5);
                Inventory3D.checkObjNames(child, 'arm', 'glove', 'muzzle'); 
            break;
            case 'rigatoni_rocket_launcher':
                target.scale.set(6.1, 6.1, 6.1);
            break;
        }
    }


//------------------------------- decrement


    public static decrement (scene: ENABLE3D.Scene3D, subject: string): void
    {
        if (!Inventory3D.ammo[subject]) //weapon doesn't use ammo
            return;

        Inventory3D.ammo[subject]--; 
        scene['player'].currentEquipped.quantity = Inventory3D.ammo[subject];
    }


//---------------------------------- increment


    private static async increment( scene: ENABLE3D.Scene3D, obj: ENABLE3D.ExtendedObject3D ): Promise<void>
    {
        const key = obj['key'], 
        
            currentEquipped = scene['player'].currentEquipped, 
        
            getInventory = async () => {

                switch (key)
                {
                    case 'penne_pistol': 
                    case 'automac1000': 
                    case 'rigatoni_rocket_launcher': 
                        return Inventory3D.ammo[key] += obj['capacity']; 
            
                    default: return;
                }
            },

        inventory = await getInventory();

        if (inventory && currentEquipped.key === key)
            currentEquipped.quantity = inventory; 
    }


//------------------------------------------------- check names and set visibility to false



    private static checkObjNames(child: ENABLE3D.ExtendedObject3D, argA?: string, argB?: string, argC?: string): void
    {

        if (argA && child.name.includes(argA) || 
           (argB && child.name.includes(argB)) || 
           (argC && child.name.includes(argC)))

        child.visible = false;
    }

    
//------------------------------------------------ check if item exists



    private static async checkDoesExist (obj: ENABLE3D.ExtendedObject3D): Promise<boolean>
    {

        if (Inventory3D.currentInventory.includes(obj['key']))
            return true;
        
        Inventory3D.currentInventory.push(obj['key']);
        return false;
    }

}