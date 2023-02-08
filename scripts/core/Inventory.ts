/* INVENTORY MANAGER */

import { System } from './Config';

export class InventoryManager {

    private static scene: Phaser.Scene
    
    public static weaponsArr: any
    public static altWeapon1: string | null
    public static altWeapon2: string | null
    public static altWeapon3: string | null
    public static collectBool: boolean
    public static fireBallLoaded: boolean

    public static specialItems: string[] = [ 
        //keys as strings, , , 
    ]

    public static weapons: string[] = [
        //keys as strings, , ,
    ]

    public static items: string[] = [

        ...InventoryManager.specialItems,
        //keys as strings, , ,
    ]

    public static powerups: string[] = [

        //keys as strings, , ,
    ]

    public static currency: string[] = [
        //keys as strings, , ,
    ]

    //--------------------------- special config for items, weapons, powerups

    public static weapons_no_ammo: string[] = [

        //keys as strings, , ,
    ]

    public static weapons_guns: string[] = [ 

        //keys as strings, , ,
    ]

    public static weapons_standalone: string[] = [

        ...InventoryManager.weapons_no_ammo,
        //keys as strings, , ,
    ]

    public static disposableInventory: string[] = [ //one shot items, weapons, or powerups
        ...InventoryManager.powerups,
        //keys as strings, , ,
    ]

    public static handheldItems: string[] = [

        //keys as strings, , ,
    ]

    public static handheldItemsAlt: string[] = [
        //keys as strings, , ,
    ]

  //----------------------------------------

    public static init(scene: Phaser.Scene): void
    {
        InventoryManager.scene = scene;

        InventoryManager.weaponsArr = null;
        InventoryManager.altWeapon1 = null;
        InventoryManager.altWeapon2 = null;
        InventoryManager.altWeapon3 = null;
        InventoryManager.collectBool = false;
        InventoryManager.fireBallLoaded = false;

    }
    
//-------------------------------- check item array


    private static async getInventory(item: string): Promise<string>
    {
        if (InventoryManager.items.includes(item))
            return 'items';
        else if (InventoryManager.weapons.includes(item))
            return 'weapons';
        else if (InventoryManager.powerups.includes(item))
            return 'powerups';
        else if (InventoryManager.currency.includes(item))
           return 'currency';
        else 
            return 'recipes';
    }

  
//-------------------------------- get default quantity of item


    private static async getDefaultQuantity(item: string): Promise<number> 
    {
       const defaultQuantity = async () => {

            if (InventoryManager.disposableInventory.includes(item))
                return 1;
            else
            {
                switch (item)
                {
                    case 'penne_pistol': 
                        return 15;
                    case 'automac1000':
                    case 'rigatoni_rocket_launcher':
                        return 25;
                    case 'dough': 
                        return 5;
                    case 'dough bag':
                        return 20;
                    default:
                        return 0;
                }
            }
       },

       array = await InventoryManager.getInventory(item),

       quantity = await defaultQuantity();
       
        switch(array)
        {
            case 'weapons': 
                InventoryManager.scene.data['ammo'][item] += quantity;  
                if (InventoryManager.scene.data['ammo'][item] >= 101)
                    InventoryManager.scene.data['ammo'][item] = 100;          
            break;
            case 'powerups': case 'items':
                InventoryManager.scene.data['inventoryQuantities'][item] += quantity;
                if (InventoryManager.scene.data['inventoryQuantities'][item] >= 51)
                    InventoryManager.scene.data['inventoryQuantities'][item] = 50; 
            break; 
            case 'currency': 
               InventoryManager.scene.data['currenencyAvailable'] += quantity; 
                if (InventoryManager.scene.data['currenencyAvailable'] >= 501)
                    InventoryManager.scene.data['currenencyAvailable'] = 500;          
            break;
        }

        return quantity;
    }

    //------------------------------- 


    private static async accessoryArr (arr: string): Promise<string>  
    {

        switch (arr)
        {
            case 'weapons':
                return 'ammo';
            case 'powerups': case 'items':
                return 'inventoryQuantities';
            default: return ''; 
        }
    }

    //-------------------------- check inventory cap


    private static async checkInventoryCap(item: string): Promise<boolean>
    {
        const arr = await InventoryManager.getInventory(item);

        if (InventoryManager.scene.data['items'].includes(item))
            return true;

        if (InventoryManager.scene.data[arr].length >= 9)
        {
            InventoryManager.scene.scene.get('HUD')['pickedUpItem'](`${arr} inventory full!`, false); 

            return false;
        }
 
        return true;
    }


    //------------------------------ if item exists in inventory, if so in what quantity


    private static async itemExists(item: string, array: string): Promise<boolean>  
    {
        if (!InventoryManager.scene.data[array].includes(item)) //push new item
        {
            InventoryManager.scene.data[array].push(item); 
            return false;
        }
        else //add quantity
            return true;
    }



//---------------------------------------------------------------- assign quantities


    public static async assignItemQuantity(button: Phaser.GameObjects.Image): Promise<number | null>
    { 
        
        const item = button.texture.key,

        arr = await InventoryManager.getInventory(item); 

        if (item === '__MISSING' || item === '__DEFAULT' || item === '' || item === undefined || item === null)
            return null;

        const accessory = await InventoryManager.accessoryArr(arr);   

        //set text quantity

        if (InventoryManager.disposableInventory.includes(item) || InventoryManager.weapons_guns.includes(item))
            return InventoryManager.scene.data[accessory][item];

        return null;
    }


//-------------------------- aquire an item


    public static async aquireItem(x: number, y: number, item: string): Promise<boolean | [boolean, string] | string>
    {
        const array = await InventoryManager.getInventory(item); 

        if (array === 'recipes')
            return false;

        if (!await InventoryManager.checkInventoryCap(item))
            return false;
        
        System.Process.app.audio.play(InventoryManager.currency.includes(item) ? 'dough_sound' : 'macaroni_ring', 1, false, InventoryManager.scene, 0);

    //check item quantity / if exists

        const pickup = await System.Process.utils.strings.removeJunk(item),

        article = await System.Process.utils.strings.checkVowel(pickup)

        const exists = await InventoryManager.itemExists(item, array);

        await InventoryManager.getDefaultQuantity(item);
 
        if (exists === true)
            return [true, pickup];

        System.Process.app.audio.play('new_item', 1.2, false, InventoryManager.scene, 0);
        System.Process.app.audio.play('sick', 1, false, InventoryManager.scene, 0);
        
        let itemString = `You got ${article} ${pickup}!`,
            hud = InventoryManager.scene.scene.get('HUD');

        hud['pickedUpItem'](itemString, true);
        hud['createEmojiPopup'](InventoryManager.scene, x, y);

        return `${article} ${pickup}`;
    }




//--------------------------------- tilemap callbacks, increase inventory values, or add "disposable" item to inventory


    public static async collectItem( tile: Phaser.Tilemaps.Tile, item: string, mapLayer: Phaser.Tilemaps.TilemapLayer): Promise<boolean>
    {
        InventoryManager.aquireItem(tile.x, tile.y, item);
        mapLayer.removeTileAt(tile.x, tile.y);

        return false;
    }



//----------------------------- decrement ammo, amount of item


    public static async decrement(item: string, arr: string): Promise<void>
    {

        let accessory = await InventoryManager.accessoryArr(arr);

        InventoryManager.scene.data[accessory][item]--;

    //if items quantity has eached zero and is "disposable", remove from inventory

        if (InventoryManager.scene.data[accessory][item] <= 0 && InventoryManager.disposableInventory.includes(item)) 
            InventoryManager.clearSelection(arr, item);  
    }


//--------------- clear / reset single item, icon on HUD


    public static async clearSelection(arr: string, _selection: any): Promise<void>
    {

        InventoryManager.scene.data[arr].splice(InventoryManager.scene.data[arr].indexOf(_selection), 1);
        
        let selections: any[] = Object.entries(InventoryManager.scene.data['selects']);

        for (let selection of selections)
            if (selection[1]['key'] === _selection)
            {    
                selection[1]['key'] = null;
                InventoryManager.scene.data['selects'][selection[0]].key = '';
            }
    }


//----------------- clear all icons on HUD / quantities based on data selection


    public static async clearSelections(): Promise<void>
    {

        let selections: any[] = Object.entries(InventoryManager.scene.data['selects']);

        for (let selection of selections)
        {
            if (System.Process.app.ui.equipped[selection[0]] !== undefined && System.Process.app.ui.equipped[selection[0]] !== null)
                selection[1]['key'] = null;    
        }
    }


//-------------------------- replace selection


    public static async replaceSelection(_selection: string, arr: string, replacement: string): Promise<void>
    {
        InventoryManager.scene.data[arr].splice(InventoryManager.scene.data[arr].indexOf(_selection), 1);

        let selections: any[] = Object.entries(InventoryManager.scene.data['selects']);

        for (let selection of selections)
            if (selection[1]['key'] === _selection)
            {    
                selection[1]['key'] = null;
                InventoryManager.scene.data['selects'][selection[0]].key = replacement;
            }

        InventoryManager.scene.data[arr].push(replacement); 
    }


//------------------------------- set item


    public static async setItemPause(index: number, array: string, button: any): Promise<void>
    {

        System.Config.vibrate(20);
        System.Process.app.audio.play('macaroni_ring', 1, false, InventoryManager.scene, 0);

        const getStr = async () =>{
            
            switch (index)
            {
                case 0: return System.Process.utils.strings.joinWithUnderscore(InventoryManager.weaponsArr[0], InventoryManager.altWeapon1);
                case 1: return System.Process.utils.strings.joinWithUnderscore(InventoryManager.weaponsArr[1], InventoryManager.altWeapon2); 
                case 2: return System.Process.utils.strings.joinWithUnderscore(InventoryManager.weaponsArr[2], InventoryManager.altWeapon3); 
                default: return 3;
            }
        }
    
    //apply selection

        System.Process.app.ui.equipped[button[0]].setVisible(true);

        if (button[1] !== undefined && button[1].selected === true) 
        {   
            const optionStr = await getStr();
            InventoryManager.scene.data['selects'][button[0]].key = array === 'weapons' ? 
                optionStr : InventoryManager.scene.data[array][index]; 
        }
    }
 

}