/* GAME DATA */

import * as types from '../../../typings/types';
import { System } from './Config';


//--------------------------- 

export class GameData {

    public healthScore: number = 10;
    public curencyAvailable: number = 0;
    public currentStage: string = '';
    public spawnPoint: string = '';
    public weapons: string[] = ['rolling_pin1', 'macaroni'];
    public altWeapons: string[] = ['pastaform_weapon', 'pastaform_weapon', 'pastaform_weapon'];
    public items: string[] = [];
    public currency: string[] = ['dough', 'dough bag'];
    public altItems: string[] = [];
    public powerups: string[] = [];


    public shadows: types.shadows = {
        shadow1: 0,
        shadow2: 0,
        shadow3: 0,
        shadow4: 0,
        shadow5: 0,
        shadow6: 0,
        shadow7: 0,
        shadow8: 0,
        shadow9: 0,
        shadow10: 0,
        shadow11: 0,
        shadow12: 0
    };


    public itemsAquired: types.itemsAquired = {

    };



    public inventoryQuantities: types.inventoryQuantities = {
        shroom_tile: 0,
        beer_tile: 0,
        champagne: 0,
        coffee: 0,
        sushi: 0,
        salmon_nigiri_tile: 0,
        ikura_maki_tile: 0,
        muffin: 0,
        magic_flours: 0,
        bong: 0,
        brownie: 0,
        keywi: 0
    };
 
    public ammo: types.ammo = {
        automac1000: 25,
        penne_pistol: 25,
        rigatoni_rocket_launcher: 25,
        grenade: 0,
        dynamite: 0,
    };

    public player: types.player = {
        color: '',
        character: '',
        self: null,
        human: true,
        anim: null,
        unMasked: true
    };

    public selects: types.selects = {
        A: {
            key: '',
            selected: false
        }, 
        B: {
            key: '',
            selected: false
        }, 
        C: {
            key: '',
            selected: false
        }, 
        D: {
            key: '',
            selected: false
        }
    };

    //------------------------------- get completed

    public static get completed(): number
    {
        const 
            data = System.Process.app.gameData,
            props = [
                data['whatever property'];

            ];
    
        return ((props.filter(i => i === true).length / props.length) * 100);
    }


    //-------------------------------------- set current game data from source


    private static async setGameSchema (location: string, config: any, callback?: Function): Promise<GameData>
    {

        const retrievedData = { config };
        System.Process.app.gameData = retrievedData.config;
        console.log(`retrieved data from ${location} storage.`); 
        
        if (callback)
            callback(System.Process.app.gameData); //returns promise

        return System.Process.app.gameData;
    }


    //-------------------------------------- retrieve external data


    public static async retrieveExternal (callback?: Function): Promise<GameData | null>
    {

        const request = await System.Process.app.ajax.xhr('retrieve-external', 'POST', { 
            username: System.Process.app.account.username, 
            webtoken: localStorage.getItem('webtoken')
        });

        if (request.account !== null)
        {
            System.Process.app.account.loggedIn = true;
            System.Process.app.account.username = request.account.user.username;
            System.Process.app.account.paid = request.account.user.paid;

            const data = await GameData.setGameSchema('remote', request.account.data, callback);
            return data; 
        }

        else if (callback)
            return callback(System.Process.app.gameData);

        else
            return null;
    }


    //--------------------------------------- check for data externally and locally


    public static async dataCheck(): Promise<Readonly<JSON | {config: Object} | null>> 
    { 

        const savedGame = localStorage.getItem('save'),
              gameData = savedGame !== null && JSON.parse(savedGame);

        return new Promise(async callback => {

        //if data is stores remotely

            if (System.Process.app.account.loggedIn === true) 
                return await GameData.retrieveExternal(callback);

        //if data is stored locally

            else if (gameData) 
                return await GameData.setGameSchema('local', gameData, callback);

        //no data saved 
        
            else 
                callback(null);

        });
    }


}