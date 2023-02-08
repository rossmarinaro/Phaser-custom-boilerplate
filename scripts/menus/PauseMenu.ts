import { System } from '../core/Config';

`use strict`;


export class PauseMenu extends Phaser.Scene {


    private _scene: Phaser.Scene

    private ui: Phaser.GameObjects.Image
    private darkenOverlay: Phaser.GameObjects.Image
    private nextBtnRight1: Phaser.GameObjects.Image
    private nextBtnLeft1: Phaser.GameObjects.Image
    private nextBtnRight2: Phaser.GameObjects.Image
    private nextBtnLeft2: Phaser.GameObjects.Image
    private inventory_nextBtnRight: Phaser.GameObjects.Image
    private inventory_nextBtnLeft1: Phaser.GameObjects.Image
    private inventory_nextBtnRight2: Phaser.GameObjects.Image
    private inventory_nextBtnLeft2: Phaser.GameObjects.Image
    private inventoryButtons: Phaser.GameObjects.Image[]
   
    private quitGame: Phaser.GameObjects.Text
    private quitNo: Phaser.GameObjects.Text
    private quitYes: Phaser.GameObjects.Text
    private quitGameButton: Phaser.GameObjects.Text
    private inventoryTxt: Phaser.GameObjects.Text
    private inventorySubTxt: Phaser.GameObjects.Text
    private goBack: Phaser.GameObjects.Text   
    private weaponTxt1: Phaser.GameObjects.Text		
    private weaponTxt2: Phaser.GameObjects.Text	
    private weaponTxt3: Phaser.GameObjects.Text	
    private weaponTxt4: Phaser.GameObjects.Text	
    private weaponTxt5: Phaser.GameObjects.Text	
    private weaponTxt6: Phaser.GameObjects.Text	
    private weaponTxt7: Phaser.GameObjects.Text	
    private weaponTxt8: Phaser.GameObjects.Text	
    private weaponTxt9: Phaser.GameObjects.Text	
    private weaponTxts: Phaser.GameObjects.Text[]

    private menuCursor: Phaser.GameObjects.Sprite
    private weapons1: Phaser.GameObjects.Sprite
    private weapons2: Phaser.GameObjects.Sprite
    private weapons3: Phaser.GameObjects.Sprite
    private weapons4: Phaser.GameObjects.Sprite
    private weapons5: Phaser.GameObjects.Sprite
    private weapons6: Phaser.GameObjects.Sprite
    private weapons7: Phaser.GameObjects.Sprite
    private weapons8: Phaser.GameObjects.Sprite
    private weapons9: Phaser.GameObjects.Sprite
    private weapons2_1: Phaser.GameObjects.Sprite	
    private weapons2_2: Phaser.GameObjects.Sprite
    private weapons2_3: Phaser.GameObjects.Sprite
    private weapons2_4: Phaser.GameObjects.Sprite
    private weapons2_5: Phaser.GameObjects.Sprite
    private weapons2_6: Phaser.GameObjects.Sprite
    private weapons2_7: Phaser.GameObjects.Sprite
    private weapons2_8: Phaser.GameObjects.Sprite
    private weapons2_9: Phaser.GameObjects.Sprite
    private weapons3_1:Phaser.GameObjects.Sprite
    private weapons3_2:Phaser.GameObjects.Sprite
    private weapons3_3:Phaser.GameObjects.Sprite
    private weapons3_4:Phaser.GameObjects.Sprite
    private weapons3_5:Phaser.GameObjects.Sprite
    private weapons3_6:Phaser.GameObjects.Sprite
    private weapons3_7:Phaser.GameObjects.Sprite
    private weapons3_8:Phaser.GameObjects.Sprite
    private weapons3_9:Phaser.GameObjects.Sprite
    private weaponButtons: Phaser.GameObjects.Sprite[]

    private items1: Phaser.GameObjects.Sprite
    private items2: Phaser.GameObjects.Sprite
    private items3: Phaser.GameObjects.Sprite
    private items4: Phaser.GameObjects.Sprite
    private items5: Phaser.GameObjects.Sprite
    private items6: Phaser.GameObjects.Sprite
    private items7: Phaser.GameObjects.Sprite
    private items8: Phaser.GameObjects.Sprite
    private items9: Phaser.GameObjects.Sprite
    private itemsBtn2_1: Phaser.GameObjects.Sprite
    private itemsBtn2_2: Phaser.GameObjects.Sprite
    private itemsBtn2_3: Phaser.GameObjects.Sprite
    private itemsBtn2_4: Phaser.GameObjects.Sprite
    private itemsBtn2_5: Phaser.GameObjects.Sprite
    private itemsBtn2_6: Phaser.GameObjects.Sprite
    private itemsBtn2_7: Phaser.GameObjects.Sprite
    private itemsBtn2_8: Phaser.GameObjects.Sprite
    private itemsBtn2_9: Phaser.GameObjects.Sprite
    private itemsBtn3_1: Phaser.GameObjects.Sprite
    private itemsBtn3_2: Phaser.GameObjects.Sprite
    private itemsBtn3_3: Phaser.GameObjects.Sprite
    private itemsBtn3_4: Phaser.GameObjects.Sprite
    private itemsBtn3_5: Phaser.GameObjects.Sprite
    private itemsBtn3_6: Phaser.GameObjects.Sprite
    private itemsBtn3_7: Phaser.GameObjects.Sprite
    private itemsBtn3_8: Phaser.GameObjects.Sprite
    private itemsBtn3_9: Phaser.GameObjects.Sprite
    private itemsButtons: Phaser.GameObjects.Sprite[]

    private itemsTxt1: Phaser.GameObjects.Text		
    private itemsTxt2: Phaser.GameObjects.Text
    private itemsTxt3: Phaser.GameObjects.Text
    private itemsTxt4: Phaser.GameObjects.Text
    private itemsTxt5: Phaser.GameObjects.Text
    private itemsTxt6: Phaser.GameObjects.Text
    private itemsTxt7: Phaser.GameObjects.Text
    private itemsTxt8: Phaser.GameObjects.Text
    private itemsTxt9: Phaser.GameObjects.Text
    private itemsTxts:  Phaser.GameObjects.Text[]

    private powerups1: Phaser.GameObjects.Sprite
    private powerups2: Phaser.GameObjects.Sprite
    private powerups3: Phaser.GameObjects.Sprite
    private powerups4: Phaser.GameObjects.Sprite
    private powerups5: Phaser.GameObjects.Sprite
    private powerups6: Phaser.GameObjects.Sprite
    private powerups7: Phaser.GameObjects.Sprite
    private powerups8: Phaser.GameObjects.Sprite
    private powerups9: Phaser.GameObjects.Sprite
    private powerupsButtons: Phaser.GameObjects.Sprite[]

    private powerup2_1: Phaser.GameObjects.Sprite	
    private powerup2_2: Phaser.GameObjects.Sprite
    private powerup2_3: Phaser.GameObjects.Sprite
    private powerup2_4: Phaser.GameObjects.Sprite
    private powerup2_5: Phaser.GameObjects.Sprite
    private powerup2_6: Phaser.GameObjects.Sprite
    private powerup2_7: Phaser.GameObjects.Sprite
    private powerup2_8: Phaser.GameObjects.Sprite
    private powerup2_9: Phaser.GameObjects.Sprite 
    
    private powerup3_1: Phaser.GameObjects.Sprite	
    private powerup3_2: Phaser.GameObjects.Sprite
    private powerup3_3: Phaser.GameObjects.Sprite
    private powerup3_4: Phaser.GameObjects.Sprite
    private powerup3_5: Phaser.GameObjects.Sprite
    private powerup3_6: Phaser.GameObjects.Sprite
    private powerup3_7: Phaser.GameObjects.Sprite
    private powerup3_8: Phaser.GameObjects.Sprite
    private powerup3_9: Phaser.GameObjects.Sprite 

    private powerupTxt1: Phaser.GameObjects.Text		
    private powerupTxt2: Phaser.GameObjects.Text		
    private powerupTxt3: Phaser.GameObjects.Text		
    private powerupTxt4: Phaser.GameObjects.Text		
    private powerupTxt5: Phaser.GameObjects.Text		
    private powerupTxt6: Phaser.GameObjects.Text		
    private powerupTxt7: Phaser.GameObjects.Text		
    private powerupTxt8: Phaser.GameObjects.Text		
    private powerupTxt9: Phaser.GameObjects.Text		
    private powerupTxts: Phaser.GameObjects.Text[]

    private weaponsButtons2: Phaser.GameObjects.Sprite[]
    private itemsButtons2: Phaser.GameObjects.Sprite[]
    private powerupsButtons2: Phaser.GameObjects.Sprite[]
    private weaponsButtons3: Phaser.GameObjects.Sprite[]
    private itemsButtons3: Phaser.GameObjects.Sprite[]
    private powerupsButtons3: Phaser.GameObjects.Sprite[]

    private mapTxt: Phaser.GameObjects.Text
    private recipeTxt: Phaser.GameObjects.Text
    private recipeScroll1: Phaser.GameObjects.Sprite
    private recipeScroll2: Phaser.GameObjects.Sprite
    private recipeScroll3: Phaser.GameObjects.Sprite
    private recipeScroll4: Phaser.GameObjects.Sprite
    private recipeScroll5: Phaser.GameObjects.Sprite
    private recipeScroll6: Phaser.GameObjects.Sprite
    private recipeScroll7: Phaser.GameObjects.Sprite
    
    private recipeScrolls: Phaser.GameObjects.Sprite[]

    private worldMap: Phaser.GameObjects.Sprite
    private worldMapShadow1: Phaser.GameObjects.Sprite
    private worldMapShadow2: Phaser.GameObjects.Sprite
    private worldMapShadow3: Phaser.GameObjects.Sprite
    private worldMapShadow4: Phaser.GameObjects.Sprite
    private worldMapShadow5: Phaser.GameObjects.Sprite
    private worldMapShadow6: Phaser.GameObjects.Sprite
    private worldMapShadow7: Phaser.GameObjects.Sprite
    private worldMapShadow8: Phaser.GameObjects.Sprite
    private worldMapShadow9: Phaser.GameObjects.Sprite
    private worldMapShadow10: Phaser.GameObjects.Sprite
    private worldMapShadow11: Phaser.GameObjects.Sprite
    private indicator: Phaser.GameObjects.Sprite
    private shadows: Phaser.GameObjects.Sprite[]
    
    private indicatorTween: Phaser.Tweens.Tween

    private selections: any

    private GAME_WIDTH: number
    private GAME_HEIGHT: number

    private isMultiplayer: boolean
    private inventory_page1: boolean
    private inventory_page2: boolean
    private inventory_page3: boolean
    private recipe_page: boolean
    private map_page: boolean

    private weapon1: string
    private weapon2: string
    private weapon3: string
    private weapon4: string
    private weapon5: string
    private weapon6: string
    private weapon7: string
    private weapon8: string
    private weapon9: string

    private item1: string
    private item2: string
    private item3: string
    private item4: string
    private item5: string
    private item6: string
    private item7: string
    private item8: string
    private item9: string

    private powerup1: string
    private powerup2: string
    private powerup3: string
    private powerup4: string
    private powerup5: string
    private powerup6: string
    private powerup7: string
    private powerup8: string
    private powerup9: string

    
    constructor(){
        super('PauseMenu');
    }

    private init(): void
    {
        this.isMultiplayer = System.Process.app.game.multiPlayer.isPlaying === true ? true : false;

        this.GAME_WIDTH = 0;
        this.GAME_HEIGHT = 0;


    //---------button assignments

        this.selections = { 

            inventory: {
                A: {
                    key: 'A',
                    button: null,
                    highlight: null,
                    selected: true
                },
                B: {
                    key: 'B',
                    button: null,
                    highlight: null,
                    selected: false
                },
                C: {
                    key: 'C',
                    button: null,
                    highlight: null,
                    selected: false
                },
                D: {
                    key: 'D',
                    button: null,
                    highlight: null,
                    selected: false
                }
            },
            select: (selection: any): void => {

                let selector: Object;

                for (selector of Object.entries(this.selections.inventory))  
                {
                    if (selection.key === selector[0])
                    {
                        selection.selected = true;
                        selection.highlight.setAlpha(0.5);
                    }
                    else
                    {
                        selector[1].selected = false;
                        selector[1].highlight.setAlpha(0);
                    }
                }
            },
            get selected()
            {
                let selection: any;

                for (selection of Object.entries(this.inventory))
                    if (selection[1].selected === true)
                        return selection;
            }
        }
    }

    //------------------------------------------

    private create(scene: Phaser.Scene): void
    {   

        this._scene = scene;
        this.data = scene.data;              

    //set darken on HUD scene
    
        System.Process.app.gfx.setVisible(true); 

        this.scene.stop('TextUI');

        //ui

            this.ui = this.add.image(-1000, -1000 , 'pause_menu_interface');

        //menu cursor

            this.menuCursor = this.add.sprite(-1000, -1000, 'indicator').setTint(0x292424).setScale(1.3).setAlpha(0.5);

        //paused text

            this.inventoryTxt = this.add.text(-1000, -1000, "INVENTORY", {font: "58px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 5).setShadow(2, 2, '#000000', 1, false);
        
        //-------------equipment selectors   

            this.selections.inventory.C.button = this.add.sprite(-1000, -1000, 'start_button').setInteractive().on('pointerdown', ()=> this.selections.select(this.selections.inventory.C), this);
            this.selections.inventory.D.button = this.add.sprite(-1000, -1000, 'start_button').setInteractive().on('pointerdown', ()=> this.selections.select(this.selections.inventory.D), this);
            this.selections.inventory.A.button = this.add.sprite(-1000, -1000, 'start_button').setInteractive().on('pointerdown', ()=> this.selections.select(this.selections.inventory.A), this);
            this.selections.inventory.B.button = this.add.sprite(-1000, -1000, 'start_button').setInteractive().on('pointerdown', ()=> this.selections.select(this.selections.inventory.B), this);
            
            this.selections.inventory.C.highlight = this.add.sprite(-1000, -1000, 'start_button').setTint(0x1e1e1e).setAlpha(0);
            this.selections.inventory.D.highlight = this.add.sprite(-1000, -1000, 'start_button').setTint(0x1e1e1e).setAlpha(0);
            this.selections.inventory.A.highlight = this.add.sprite(-1000, -1000, 'start_button').setTint(0x1e1e1e).setAlpha(0);
            this.selections.inventory.B.highlight = this.add.sprite(-1000, -1000, 'start_button').setTint(0x1e1e1e).setAlpha(0);
    
        //set default

            this.selections.inventory.A.button.emit('pointerdown');

    //----------------- next page buttons

    //next button right (forward / recipe page)

        this.nextBtnRight1 =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.85).on('pointerdown', () => this.changePage(this, 'recipe'), this);


    //next button left (back / inventory)

        this.nextBtnLeft1 =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.85).setFlipX(true).on('pointerdown', ()=> this.changePage(this, 'inventory 1'), this);


    //next button right (forward / map)

        this.nextBtnRight2 =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.85).on('pointerdown', ()=> this.changePage(this, 'map'), this);


    //next button left (back / recipe page)

        this.nextBtnLeft2 =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.85).setFlipX(true).on('pointerdown', ()=> this.changePage(this, 'recipe'), this);


    //------ inventory buttons

    //next button right (forward)

        this.inventory_nextBtnRight =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.6).on('pointerdown', ()=> this.changePage(this, 'inventory 2'), this);

    //next button left (back)

        this.inventory_nextBtnLeft1 =  this.add.image(-1000, -1000, 'next_button').setInteractive().setFlipX(true).setScale(0.6).on('pointerdown', ()=> this.changePage(this, 'inventory 1'), this);

    //next button right (forward)

        this.inventory_nextBtnRight2 =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.6).on('pointerdown', ()=> this.changePage(this, 'inventory 3'), this);

    //next button left (back)

        this.inventory_nextBtnLeft2 =  this.add.image(-1000, -1000, 'next_button').setInteractive().setFlipX(true).setScale(0.6).on('pointerdown', ()=> this.changePage(this, 'inventory 2'), this);

        this.inventoryButtons = [
            this.inventory_nextBtnRight, 
            this.inventory_nextBtnRight2, 
            this.inventory_nextBtnLeft1, 
            this.inventory_nextBtnLeft2
        ];
   

        this.darkenOverlay = this.add.image(-1000, -1000 , 'pause_menu_interface').setDepth(99).setVisible(false).setTintFill(0x000000).setAlpha(0.75);

    //---------------- quit game
    
            this.quitGame = this.add.text(-1000, -1000, "Quit Game?", {font: "60px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false).setVisible(false).setInteractive().setDepth(101);
            this.quitNo = this.add.text(-1000, -1000, "No", {font: "60px Digitizer"}).setColor('#FF0000').setStroke("#ffff00", 4).setShadow(2, 2, '#000000', 1, false).setActive(false).setVisible(false).setInteractive().setDepth(101);
            this.quitYes = this.add.text(-1000, -1000, "Yes", {font: "60px Digitizer"}).setColor('#FF0000').setStroke("#ffff00", 4).setShadow(2, 2, '#000000', 1, false).setActive(false).setVisible(false).setInteractive().setDepth(101);
            this.quitGameButton = this.add.text(-1000, -1000, "Quit Game", {font: "30px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false).setInteractive().setDepth(101);

            let quit = false;

            this.quitGameButton.on('pointerdown', ()=> {

                System.Process.app.audio.play('ring', 0.5, false, this, 0);
                System.Config.vibrate(20);

                this.quitGame.setVisible(true);
                this.quitGameButton.setTintFill(0xff0000).setActive(true).setVisible(true);
                this.darkenOverlay.setVisible(true); 
                this.quitNo.setActive(true).setVisible(true);
                this.quitYes.setActive(true).setVisible(true);

                    this.quitYes.on('pointerdown', (): void => {

                        if (quit)
                            return;

                        quit = true;

                        System.Process.app.audio.play('ring', 0.5, false, this, 0);
                        System.Config.vibrate(20);
                        this.quitGame.setVisible(false);
                        this.quitNo.setActive(false).setVisible(false);
                        this.quitYes.setActive(false).setVisible(false);
                        
                        System.Process.app.events.quitGame(this._scene);
                                
                    });

                    this.quitNo.on('pointerdown', (): void => {

                        System.Process.app.audio.play('bloop1', 1, false, this, 0);
                        System.Config.vibrate(20);
                        this.quitGame.setActive(false).setVisible(false);
                        this.quitYes.setActive(false).setVisible(false);
                        this.quitNo.setActive(false).setVisible(false); 
                        this.darkenOverlay.setVisible(false); 
                    });

                //implement menu selection inputs

                    System.Process.app.inputs.updatePrompts([this.quitYes, this.quitNo]);
                })
                .on('pointerup', ()=> this.quitGameButton.clearTint())
                .on('pointerover', ()=> this.quitGameButton.setTintFill(0xffff00))
                .on('pointerout', ()=> this.quitGameButton.clearTint());

        //-------------- go back

            this.goBack = this.add.text(-1000, -1000, "Go Back", {font: "30px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false)
                .setDepth(101)
                .setInteractive()
                .on('pointerdown', ()=> this.exitPause(this), this)
                .on('pointerup', ()=> this.goBack.clearTint())
                .on('pointerover', ()=> this.goBack.setTintFill(0xffff00))
                .on('pointerout', ()=> this.goBack.clearTint());       

                        
    //----------------------------------------- layouts


            this.inventorySubTxt = this.add.text(-1000, -1000, '', {font: "30px Bangers"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false);
            
    //--------------------- assign textures of weapons


                this.weapon1 = System.Process.app.inventory.weaponsArr[0];
                this.weapon2 = System.Process.app.inventory.weaponsArr[1];
                this.weapon3 = System.Process.app.inventory.weaponsArr[2];
                this.weapon4 = System.Process.app.inventory.weaponsArr[3];
                this.weapon5 = System.Process.app.inventory.weaponsArr[4];
                this.weapon6 = System.Process.app.inventory.weaponsArr[5];
                this.weapon7 = System.Process.app.inventory.weaponsArr[6];
                this.weapon8 = System.Process.app.inventory.weaponsArr[7];
                this.weapon9 = System.Process.app.inventory.weaponsArr[8];

                this.weapons1 = this.add.sprite(-1000, -1000, this.weapon1, System.Process.app.inventory.altWeapon1).setInteractive();
                this.weapons2 = this.add.sprite(-1000, -1000, this.weapon2, System.Process.app.inventory.altWeapon2).setInteractive();
                this.weapons3 = this.add.sprite(-1000, -1000, this.weapon3, System.Process.app.inventory.altWeapon3).setInteractive();
                this.weapons4 = this.add.sprite(-1000, -1000, this.weapon4).setInteractive();	
                this.weapons5 = this.add.sprite(-1000, -1000, this.weapon5).setInteractive();
                this.weapons6 = this.add.sprite(-1000, -1000, this.weapon6).setInteractive();
                this.weapons7 = this.add.sprite(-1000, -1000, this.weapon7).setInteractive();
                this.weapons8 = this.add.sprite(-1000, -1000, this.weapon8).setInteractive();
                this.weapons9 = this.add.sprite(-1000, -1000, this.weapon9).setInteractive();
               	
                this.weaponButtons = [   
                    this.weapons1, this.weapons2, this.weapons3, this.weapons4, this.weapons5,
                    this.weapons6, this.weapons7, this.weapons8, this.weapons9
                ];

            //layer2

                this.weapons2_1 = this.add.sprite(-1000, -1000, this.weapon1).setInteractive().setTintFill(0xffff00);	
                this.weapons2_2 = this.add.sprite(-1000, -1000, this.weapon2).setInteractive().setTintFill(0xffff00);	
                this.weapons2_3 = this.add.sprite(-1000, -1000, this.weapon3).setInteractive().setTintFill(0xffff00);	
                this.weapons2_4 = this.add.sprite(-1000, -1000, this.weapon4).setInteractive().setTintFill(0xffff00);	
                this.weapons2_5 = this.add.sprite(-1000, -1000, this.weapon5).setInteractive().setTintFill(0xffff00);	
                this.weapons2_6 = this.add.sprite(-1000, -1000, this.weapon6).setInteractive().setTintFill(0xffff00);	
                this.weapons2_7 = this.add.sprite(-1000, -1000, this.weapon7).setInteractive().setTintFill(0xffff00);	
                this.weapons2_8 = this.add.sprite(-1000, -1000, this.weapon8).setInteractive().setTintFill(0xffff00);	
                this.weapons2_9 = this.add.sprite(-1000, -1000, this.weapon9).setInteractive().setTintFill(0xffff00);	

                this.weaponsButtons2 = [
                    this.weapons2_1, this.weapons2_2, this.weapons2_3, this.weapons2_4, 
                    this.weapons2_5, this.weapons2_6, this.weapons2_7, this.weapons2_8, this.weapons2_9, 
                ];

            //layer3

                this.weapons3_1 = this.add.sprite(-1000, -1000, this.weapon1).setInteractive().setAlpha(0.5);	
                this.weapons3_2 = this.add.sprite(-1000, -1000, this.weapon2).setInteractive().setAlpha(0.5)
                this.weapons3_3 = this.add.sprite(-1000, -1000, this.weapon3).setInteractive().setAlpha(0.5)
                this.weapons3_4 = this.add.sprite(-1000, -1000, this.weapon4).setInteractive().setAlpha(0.5)
                this.weapons3_5 = this.add.sprite(-1000, -1000, this.weapon5).setInteractive().setAlpha(0.5)
                this.weapons3_6 = this.add.sprite(-1000, -1000, this.weapon6).setInteractive().setAlpha(0.5)
                this.weapons3_7 = this.add.sprite(-1000, -1000, this.weapon7).setInteractive().setAlpha(0.5)
                this.weapons3_8 = this.add.sprite(-1000, -1000, this.weapon8).setInteractive().setAlpha(0.5)
                this.weapons3_9 = this.add.sprite(-1000, -1000, this.weapon9).setInteractive().setAlpha(0.5)

                this.weaponsButtons3 = [];

                for (let i = 1; i < 10; i++)
                    if (this[`weapon${i}`])
                        this.weaponsButtons3.push(this[`weapons3_${i}`]);
                    

        //weapon quantities 

                this.weaponTxt1  = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);		
                this.weaponTxt2 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
                this.weaponTxt3 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
                this.weaponTxt4 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.weaponTxt5 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.weaponTxt6 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.weaponTxt7 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.weaponTxt8 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.weaponTxt9 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                
                this.weaponTxts = [
                    this.weaponTxt1,
                    this.weaponTxt2,
                    this.weaponTxt3,
                    this.weaponTxt4,
                    this.weaponTxt5,
                    this.weaponTxt6,
                    this.weaponTxt7,
                    this.weaponTxt8,
                    this.weaponTxt9
                ];
       
                this.tweens.add({targets: this.weapons2_1, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
                this.tweens.add({targets: this.weapons2_2, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
                this.tweens.add({targets: this.weapons2_3, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
                this.tweens.add({targets: this.weapons2_4, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
                this.tweens.add({targets: this.weapons2_5, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
                this.tweens.add({targets: this.weapons2_6, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
                this.tweens.add({targets: this.weapons2_7, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
                this.tweens.add({targets: this.weapons2_8, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true}); 
                this.tweens.add({targets: this.weapons2_9, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});



        //--------------------- assign textures of items
                    
                this.item1 = this.data['items'][0]; 
                this.item2 = this.data['items'][1];
                this.item3 = this.data['items'][2];
                this.item4 = this.data['items'][3];
                this.item5 = this.data['items'][4];
                this.item6 = this.data['items'][5];
                this.item7 = this.data['items'][6];
                this.item8 = this.data['items'][7];
                this.item9 = this.data['items'][8];
                        
                this.items1 = this.add.sprite(-1000, -1000, this.item1).setInteractive();
                this.items2 = this.add.sprite(-1000, -1000, this.item2).setInteractive();	
                this.items3 = this.add.sprite(-1000, -1000, this.item3).setInteractive();	
                this.items4 = this.add.sprite(-1000, -1000, this.item4).setInteractive();	
                this.items5 = this.add.sprite(-1000, -1000, this.item5).setInteractive();
                this.items6 = this.add.sprite(-1000, -1000, this.item6).setInteractive();
                this.items7 = this.add.sprite(-1000, -1000, this.item7).setInteractive();
                this.items8 = this.add.sprite(-1000, -1000, this.item8).setInteractive();
                this.items9 = this.add.sprite(-1000, -1000, this.item9).setInteractive();

                this.itemsButtons = [ 
                    this.items1,
                    this.items2,	
                    this.items3,
                    this.items4,
                    this.items5,
                    this.items6,
                    this.items7,
                    this.items8,
                    this.items9
                ];

            //layer 2
                this.itemsBtn2_1 = this.add.sprite(-1000, -1000, this.item1).setInteractive().setTintFill(0xffff00);
                this.itemsBtn2_2 = this.add.sprite(-1000, -1000, this.item2).setInteractive().setTintFill(0xffff00);
                this.itemsBtn2_3 = this.add.sprite(-1000, -1000, this.item3).setInteractive().setTintFill(0xffff00);		
                this.itemsBtn2_4 = this.add.sprite(-1000, -1000, this.item4).setInteractive().setTintFill(0xffff00);	
                this.itemsBtn2_5 = this.add.sprite(-1000, -1000, this.item5).setInteractive().setTintFill(0xffff00);	
                this.itemsBtn2_6 = this.add.sprite(-1000, -1000, this.item6).setInteractive().setTintFill(0xffff00);	
                this.itemsBtn2_7 = this.add.sprite(-1000, -1000, this.item7).setInteractive().setTintFill(0xffff00);	
                this.itemsBtn2_8 = this.add.sprite(-1000, -1000, this.item8).setInteractive().setTintFill(0xffff00);	
                this.itemsBtn2_9 = this.add.sprite(-1000, -1000, this.item9).setInteractive().setTintFill(0xffff00);	


                this.itemsButtons2 = [
                    this.itemsBtn2_1,
                    this.itemsBtn2_2,
                    this.itemsBtn2_3,	
                    this.itemsBtn2_4,
                    this.itemsBtn2_5,
                    this.itemsBtn2_6,	
                    this.itemsBtn2_7,	
                    this.itemsBtn2_8,
                    this.itemsBtn2_9
                ];

            //layer 3
                this.itemsBtn3_1 = this.add.sprite(-1000, -1000, this.item1).setInteractive().setAlpha(0.5);
                this.itemsBtn3_2 = this.add.sprite(-1000, -1000, this.item2).setInteractive().setAlpha(0.5);
                this.itemsBtn3_3 = this.add.sprite(-1000, -1000, this.item3).setInteractive().setAlpha(0.5);
                this.itemsBtn3_4 = this.add.sprite(-1000, -1000, this.item4).setInteractive().setAlpha(0.5);
                this.itemsBtn3_5 = this.add.sprite(-1000, -1000, this.item5).setInteractive().setAlpha(0.5);
                this.itemsBtn3_6 = this.add.sprite(-1000, -1000, this.item6).setInteractive().setAlpha(0.5);
                this.itemsBtn3_7 = this.add.sprite(-1000, -1000, this.item7).setInteractive().setAlpha(0.5);
                this.itemsBtn3_8 = this.add.sprite(-1000, -1000, this.item8).setInteractive().setAlpha(0.5);
                this.itemsBtn3_9 = this.add.sprite(-1000, -1000, this.item9).setInteractive().setAlpha(0.5);

                this.itemsButtons3 = [];

                for (let i = 1; i < 10; i++)
                    if (this[`item${i}`])
                        this.itemsButtons3.push(this[`itemsBtn3_${i}`]);

                this.itemsTxt1  = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);		
                this.itemsTxt2 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
                this.itemsTxt3 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
                this.itemsTxt4 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.itemsTxt5 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.itemsTxt6 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.itemsTxt7 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.itemsTxt8 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
                this.itemsTxt9 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);

                this.itemsTxts = [
                    this.itemsTxt1,
                    this.itemsTxt2,
                    this.itemsTxt3,
                    this.itemsTxt4,
                    this.itemsTxt5,
                    this.itemsTxt6,
                    this.itemsTxt7,
                    this.itemsTxt8,
                    this.itemsTxt9
                ];

            this.tweens.add({targets: this.itemsBtn2_1, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_2, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_3, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_4, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_5, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_6, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_7, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_8, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.itemsBtn2_9, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});

        
        
    //--------------------- assign textures of powerups
            
            this.powerup1 = this.data['powerups'][0];
            this.powerup2 = this.data['powerups'][1];
            this.powerup3 = this.data['powerups'][2];
            this.powerup4 = this.data['powerups'][3];
            this.powerup5 = this.data['powerups'][4];
            this.powerup6 = this.data['powerups'][5];
            this.powerup7 = this.data['powerups'][6];
            this.powerup8 = this.data['powerups'][7];
            this.powerup9 = this.data['powerups'][8];

            this.powerups1 = this.add.sprite(-1000, -1000, this.powerup1).setInteractive();
            this.powerups2 = this.add.sprite(-1000, -1000, this.powerup2).setInteractive();
            this.powerups3 = this.add.sprite(-1000, -1000, this.powerup3).setInteractive();
            this.powerups4 = this.add.sprite(-1000, -1000, this.powerup4).setInteractive();	
            this.powerups5 = this.add.sprite(-1000, -1000, this.powerup5).setInteractive();
            this.powerups6 = this.add.sprite(-1000, -1000, this.powerup6).setInteractive();
            this.powerups7 = this.add.sprite(-1000, -1000, this.powerup7).setInteractive();
            this.powerups8 = this.add.sprite(-1000, -1000, this.powerup8).setInteractive();
            this.powerups9 = this.add.sprite(-1000, -1000, this.powerup9).setInteractive();
            
            this.powerupsButtons = [   
                this.powerups1, 
                this.powerups2, 
                this.powerups3, 
                this.powerups4, 
                this.powerups5,
                this.powerups6, 
                this.powerups7, 
                this.powerups8, 
                this.powerups9
            ];

        //layer2

            this.powerup2_1 = this.add.sprite(-1000, -1000, this.powerup1).setInteractive().setTintFill(0xffff00);	
            this.powerup2_2 = this.add.sprite(-1000, -1000, this.powerup2).setInteractive().setTintFill(0xffff00);	
            this.powerup2_3 = this.add.sprite(-1000, -1000, this.powerup3).setInteractive().setTintFill(0xffff00);	
            this.powerup2_4 = this.add.sprite(-1000, -1000, this.powerup4).setInteractive().setTintFill(0xffff00);	
            this.powerup2_5 = this.add.sprite(-1000, -1000, this.powerup5).setInteractive().setTintFill(0xffff00);	
            this.powerup2_6 = this.add.sprite(-1000, -1000, this.powerup6).setInteractive().setTintFill(0xffff00);	
            this.powerup2_7 = this.add.sprite(-1000, -1000, this.powerup7).setInteractive().setTintFill(0xffff00);	
            this.powerup2_8 = this.add.sprite(-1000, -1000, this.powerup8).setInteractive().setTintFill(0xffff00);	
            this.powerup2_9 = this.add.sprite(-1000, -1000, this.powerup9).setInteractive().setTintFill(0xffff00);	

            this.powerupsButtons2 = [
                this.powerup2_1, this.powerup2_2, this.powerup2_3, this.powerup2_4, 
                this.powerup2_5, this.powerup2_6, this.powerup2_7, this.powerup2_8, this.powerup2_9, 
            ];

            
        //layer3

            this.powerup3_1 = this.add.sprite(-1000, -1000, this.powerup1).setInteractive().setAlpha(0.5);	
            this.powerup3_2 = this.add.sprite(-1000, -1000, this.powerup2).setInteractive().setAlpha(0.5);
            this.powerup3_3 = this.add.sprite(-1000, -1000, this.powerup3).setInteractive().setAlpha(0.5);
            this.powerup3_4 = this.add.sprite(-1000, -1000, this.powerup4).setInteractive().setAlpha(0.5);
            this.powerup3_5 = this.add.sprite(-1000, -1000, this.powerup5).setInteractive().setAlpha(0.5);
            this.powerup3_6 = this.add.sprite(-1000, -1000, this.powerup6).setInteractive().setAlpha(0.5);
            this.powerup3_7 = this.add.sprite(-1000, -1000, this.powerup7).setInteractive().setAlpha(0.5);
            this.powerup3_8 = this.add.sprite(-1000, -1000, this.powerup8).setInteractive().setAlpha(0.5);
            this.powerup3_9 = this.add.sprite(-1000, -1000, this.powerup9).setInteractive().setAlpha(0.5);

            this.powerupsButtons3 = [];

            for (let i = 1; i < 10; i++)
                if (this[`powerup${i}`])
                    this.powerupsButtons3.push(this[`powerup3_${i}`]);

            this.tweens.add({targets: this.powerup2_1, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.powerup2_2, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.powerup2_3, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.powerup2_4, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.powerup2_5, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.powerup2_6, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.powerup2_7, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.powerup2_8, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true}); 
            this.tweens.add({targets: this.powerup2_9, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            

        ////powerup quantities 

            this.powerupTxt1  = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);		
            this.powerupTxt2 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
            this.powerupTxt3 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
            this.powerupTxt4 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.powerupTxt5 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.powerupTxt6 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.powerupTxt7 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.powerupTxt8 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.powerupTxt9 = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);

            this.powerupTxts = [
                this.powerupTxt1,
                this.powerupTxt2,
                this.powerupTxt3,
                this.powerupTxt4,
                this.powerupTxt5,
                this.powerupTxt6,
                this.powerupTxt7,
                this.powerupTxt8,
                this.powerupTxt9
            ];

    //-----------------------------------------------------------------------------recipes
    
            this.recipeTxt = this.add.text(-1000, -1000, "Recipe", {font: "58px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 5).setShadow(2, 2, '#000000', 1, false);
            this.recipeScroll1 = this.add.sprite(-1000, -1000, 'recipe_scroll_divided', 1);
            this.recipeScroll2 = this.add.sprite(-1000, -1000, 'recipe_scroll_divided', 2);
            this.recipeScroll3 = this.add.sprite(-1000, -1000, 'recipe_scroll_divided', 3);
            this.recipeScroll4 = this.add.sprite(-1000, -1000, 'recipe_scroll_divided', 4);
            this.recipeScroll5 = this.add.sprite(-1000, -1000, 'recipe_scroll_divided', 5);
            this.recipeScroll6 = this.add.sprite(-1000, -1000, 'recipe_scroll_divided', 6);
            this.recipeScroll7 = this.add.sprite(-1000, -1000, 'recipe_scroll_divided', 7);
            
            this.recipeScrolls = [
                this.recipeScroll1,
                this.recipeScroll2,
                this.recipeScroll3,
                this.recipeScroll4,
                this.recipeScroll5,
                this.recipeScroll6,
                this.recipeScroll7
            ];

    //-------------------------------------------------------------------------------map


            this.mapTxt = this.add.text(-1000, -1000, "MAP", {font: "58px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false);
            this.worldMap = this.add.sprite(-1000, -1000, 'world_map').setScale(0.9);
       
        ////shadow
            this.worldMapShadow1 = this.add.sprite(-1000, -1000, 'world_map_shadow1').setInteractive();
            this.worldMapShadow2 = this.add.sprite(-1000, -1000, 'world_map_shadow2').setInteractive();
            this.worldMapShadow3 = this.add.sprite(-1000, -1000, 'world_map_shadow3').setInteractive();
            this.worldMapShadow4 = this.add.sprite(-1000, -1000, 'world_map_shadow4').setInteractive();
            this.worldMapShadow5 = this.add.sprite(-1000, -1000, 'world_map_shadow5').setInteractive();
            this.worldMapShadow6 = this.add.sprite(-1000, -1000, 'world_map_shadow6').setInteractive();
            this.worldMapShadow7 = this.add.sprite(-1000, -1000, 'world_map_shadow7').setInteractive();
            this.worldMapShadow8 = this.add.sprite(-1000, -1000, 'world_map_shadow8').setInteractive();
            this.worldMapShadow9 = this.add.sprite(-1000, -1000, 'world_map_shadow9').setInteractive();
            this.worldMapShadow10 = this.add.sprite(-1000, -1000, 'world_map_shadow10').setInteractive();
            this.worldMapShadow11 = this.add.sprite(-1000, -1000, 'world_map_shadow11').setInteractive();

            this.shadows = [
                this.worldMapShadow1, this.worldMapShadow2, this.worldMapShadow3, this.worldMapShadow4,
                this.worldMapShadow5, this.worldMapShadow6, this.worldMapShadow7, this.worldMapShadow8, 
                this.worldMapShadow9, this.worldMapShadow10, this.worldMapShadow11
            ];
            this.shadows.forEach((e: any) => e.setScale(0.9));

    //current position indicator

            this.indicator = this.add.sprite(-1000, -1000, 'indicator').setDepth(100);
            this.indicatorTween = this.tweens.add({targets: this.indicator, alpha: 0, duration: 1000, ease: 'Power1', repeat: -1, yoyo: true});
    
        
//------------------------------------------------------------------on screen inputs
        
    
    //// weapons
        
            this.weapons3_1.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(0, 'weapons', this.selections.selected));
            this.weapons3_2.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(1, 'weapons', this.selections.selected));
            this.weapons3_3.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(2, 'weapons', this.selections.selected));
            this.weapons3_4.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(3, 'weapons', this.selections.selected));	
            this.weapons3_5.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(4, 'weapons', this.selections.selected));	
            this.weapons3_6.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(5, 'weapons', this.selections.selected));
            this.weapons3_7.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(6, 'weapons', this.selections.selected));
            this.weapons3_8.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(7, 'weapons', this.selections.selected));
            this.weapons3_9.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(8, 'weapons', this.selections.selected));
        
        //// items
    
            this.itemsBtn3_1.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(0, 'items', this.selections.selected));
            this.itemsBtn3_2.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(1, 'items', this.selections.selected));
            this.itemsBtn3_3.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(2, 'items', this.selections.selected));
            this.itemsBtn3_4.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(3, 'items', this.selections.selected));
            this.itemsBtn3_5.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(4, 'items', this.selections.selected));
            this.itemsBtn3_6.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(5, 'items', this.selections.selected));
            this.itemsBtn3_7.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(6, 'items', this.selections.selected));
            this.itemsBtn3_8.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(7, 'items', this.selections.selected));
            this.itemsBtn3_9.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(8, 'items', this.selections.selected));


        ////power ups
        
            this.powerup3_1.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(0, 'powerups', this.selections.selected));
            this.powerup3_2.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(1, 'powerups', this.selections.selected));
            this.powerup3_3.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(2, 'powerups', this.selections.selected));
            this.powerup3_4.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(3, 'powerups', this.selections.selected));
            this.powerup3_5.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(4, 'powerups', this.selections.selected));
            this.powerup3_6.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(5, 'powerups', this.selections.selected));
            this.powerup3_7.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(6, 'powerups', this.selections.selected));
            this.powerup3_8.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(7, 'powerups', this.selections.selected));
            this.powerup3_9.on('pointerdown', ()=> System.Process.app.inventory.setItemPause(8, 'powerups', this.selections.selected));

    //call resize

        System.Process.app.ui.listen(this, 'PauseMenu', this.updatePosition);

    //implement menu prompts

        System.Process.app.inputs.implementMenuSelections(this, [], this._scene);

    //set page default
							
        this.changePage(this, 'inventory 1');
   

    }

    
//----------------------------------------------------------------------------------------

    public update(): void
    {

    //darken overlap follows ui position and rotation
    
        this.darkenOverlay.setPosition(this.ui.x, this.ui.y).setRotation(this.ui.rotation);


    //----------------------------- weapons
    
        this.weapon1 !== null ? this.weapons1.setVisible(true).clearTint().setInteractive() : this.weapons1.setVisible(false).disableInteractive();
        this.weapon2 !== null ? this.weapons2.setVisible(true).clearTint().setInteractive() : this.weapons2.setVisible(false).disableInteractive();
        this.weapon3 !== null ? this.weapons3.setVisible(true).clearTint().setInteractive() : this.weapons3.setVisible(false).disableInteractive();
        this.weapon4 !== null ? this.weapons4.setVisible(true).clearTint().setInteractive() : this.weapons4.setVisible(false).disableInteractive();
        this.weapon5 !== null ? this.weapons5.setVisible(true).clearTint().setInteractive() : this.weapons5.setVisible(false).disableInteractive();
        this.weapon6 !== null ? this.weapons6.setVisible(true).clearTint().setInteractive() : this.weapons6.setVisible(false).disableInteractive();
        this.weapon7 !== null ? this.weapons7.setVisible(true).clearTint().setInteractive() : this.weapons7.setVisible(false).disableInteractive();
        this.weapon8 !== null ? this.weapons8.setVisible(true).clearTint().setInteractive() : this.weapons8.setVisible(false).disableInteractive();
        this.weapon9 !== null ? this.weapons9.setVisible(true).clearTint().setInteractive() : this.weapons9.setVisible(false).disableInteractive();
        
        this.weapons2_1.setVisible(this.inventory_page1 === true && this.weapons2_1.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_2.setVisible(this.inventory_page1 === true && this.weapons2_2.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_3.setVisible(this.inventory_page1 === true && this.weapons2_3.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_4.setVisible(this.inventory_page1 === true && this.weapons2_4.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_5.setVisible(this.inventory_page1 === true && this.weapons2_5.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_6.setVisible(this.inventory_page1 === true && this.weapons2_6.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_7.setVisible(this.inventory_page1 === true && this.weapons2_7.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_8.setVisible(this.inventory_page1 === true && this.weapons2_8.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.weapons2_9.setVisible(this.inventory_page1 === true && this.weapons2_9.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);

        this.weapons3_1.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_2.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_3.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_4.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_5.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_6.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_7.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_8.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_9.setVisible(this.inventory_page1 === true ? true : false);

    //------------------------------ items
        
        this.item1 !== null ? this.items1.setVisible(true).clearTint().setInteractive() : this.items1.setVisible(false).disableInteractive();
        this.item2 !== null ? this.items2.setVisible(true).clearTint().setInteractive() : this.items2.setVisible(false).disableInteractive();
        this.item3 !== null ? this.items3.setVisible(true).clearTint().setInteractive() : this.items3.setVisible(false).disableInteractive();
        this.item4 !== null ? this.items4.setVisible(true).clearTint().setInteractive() : this.items4.setVisible(false).disableInteractive();
        this.item5 !== null ? this.items5.setVisible(true).clearTint().setInteractive() : this.items5.setVisible(false).disableInteractive();
        this.item6 !== null ? this.items6.setVisible(true).clearTint().setInteractive() : this.items6.setVisible(false).disableInteractive();
        this.item7 !== null ? this.items7.setVisible(true).clearTint().setInteractive() : this.items7.setVisible(false).disableInteractive();
        this.item8 !== null ? this.items8.setVisible(true).clearTint().setInteractive() : this.items8.setVisible(false).disableInteractive();
        this.item9 !== null ? this.items9.setVisible(true).clearTint().setInteractive() : this.items9.setVisible(false).disableInteractive();
        
        this.itemsBtn2_1.setVisible(this.inventory_page2 === true && this.itemsBtn2_1.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_2.setVisible(this.inventory_page2 === true && this.itemsBtn2_2.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_3.setVisible(this.inventory_page2 === true && this.itemsBtn2_3.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_4.setVisible(this.inventory_page2 === true && this.itemsBtn2_4.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_5.setVisible(this.inventory_page2 === true && this.itemsBtn2_5.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_6.setVisible(this.inventory_page2 === true && this.itemsBtn2_6.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_7.setVisible(this.inventory_page2 === true && this.itemsBtn2_7.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_8.setVisible(this.inventory_page2 === true && this.itemsBtn2_8.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.itemsBtn2_9.setVisible(this.inventory_page2 === true && this.itemsBtn2_9.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);

        this.itemsBtn3_1.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_2.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_3.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_4.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_5.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_6.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_7.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_8.setVisible(this.inventory_page2 === true ? true : false);
        this.itemsBtn3_9.setVisible(this.inventory_page2 === true ? true : false);

    //--------------------------- powerups

        this.powerup1 !== null ? this.powerups1.setVisible(true).clearTint().setInteractive() : this.powerups1.setVisible(false).disableInteractive();
        this.powerup2 !== null ? this.powerups2.setVisible(true).clearTint().setInteractive() : this.powerups2.setVisible(false).disableInteractive();
        this.powerup3 !== null ? this.powerups3.setVisible(true).clearTint().setInteractive() : this.powerups3.setVisible(false).disableInteractive();
        this.powerup4 !== null ? this.powerups4.setVisible(true).clearTint().setInteractive() : this.powerups4.setVisible(false).disableInteractive();
        this.powerup5 !== null ? this.powerups5.setVisible(true).clearTint().setInteractive() : this.powerups5.setVisible(false).disableInteractive();
        this.powerup6 !== null ? this.powerups6.setVisible(true).clearTint().setInteractive() : this.powerups6.setVisible(false).disableInteractive();
        this.powerup7 !== null ? this.powerups7.setVisible(true).clearTint().setInteractive() : this.powerups7.setVisible(false).disableInteractive();
        this.powerup8 !== null ? this.powerups8.setVisible(true).clearTint().setInteractive() : this.powerups8.setVisible(false).disableInteractive();
        this.powerup9 !== null ? this.powerups9.setVisible(true).clearTint().setInteractive() : this.powerups9.setVisible(false).disableInteractive();

        this.powerup2_1.setVisible(this.inventory_page3 === true && this.powerup2_1.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_2.setVisible(this.inventory_page3 === true && this.powerup2_2.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_3.setVisible(this.inventory_page3 === true && this.powerup2_3.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_4.setVisible(this.inventory_page3 === true && this.powerup2_4.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_5.setVisible(this.inventory_page3 === true && this.powerup2_5.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_6.setVisible(this.inventory_page3 === true && this.powerup2_6.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_7.setVisible(this.inventory_page3 === true && this.powerup2_7.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_8.setVisible(this.inventory_page3 === true && this.powerup2_8.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);
        this.powerup2_9.setVisible(this.inventory_page3 === true && this.powerup2_9.texture.key === this.data['selects'][this.selections.selected[0]].key ? true : false);

        this.powerup3_1.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_2.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_3.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_4.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_5.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_6.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_7.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_8.setVisible(this.inventory_page3 === true ? true : false);
        this.powerup3_9.setVisible(this.inventory_page3 === true ? true : false);

    //----------------inventory_page 1

        if (this.inventory_page1 === true)
        { 

        //next buttons

            this.nextBtnRight1.setVisible(this.isMultiplayer ? false : true).setActive(this.isMultiplayer ? false : true);
            this.nextBtnLeft1.setVisible(false).setActive(false);
            this.nextBtnRight2.setVisible(false).setActive(false);
            this.nextBtnLeft2.setVisible(false).setActive(false);
            this.inventory_nextBtnRight.setVisible(true).setActive(true);
            this.inventory_nextBtnLeft1.setVisible(false).setActive(false);
            this.inventory_nextBtnRight2.setVisible(false).setActive(false);
            this.inventory_nextBtnLeft2.setVisible(false).setActive(false);
            this.inventoryTxt.setVisible(true);
            this.recipeTxt.setVisible(false);
            this.recipeScrolls.forEach(i => i.setVisible(false));
            this.mapTxt.setVisible(false);
            this.worldMap.setVisible(false);
            this.powerupTxts.forEach(i => i.setVisible(false));
            this.itemsTxts.forEach(i => i.setVisible(false));
            this.powerupsButtons2.forEach(i => i.setVisible(false));
            this.powerupsButtons.forEach(i => i.setVisible(false));

            this.indicator.setVisible(false);
            this.shadows.forEach(e => e.setVisible(false));

            this.itemsButtons.forEach(e => e.setVisible(false));
            this.inventorySubTxt.setVisible(true).setText('Weapons');

            this.weaponButtons.forEach(e => e.setVisible(true));

            this.selections.inventory.A.button.setVisible(true).setInteractive();
            this.selections.inventory.B.button.setVisible(true).setInteractive();
            this.selections.inventory.C.button.setVisible(true).setInteractive();
            this.selections.inventory.D.button.setVisible(true).setInteractive();
            
            this.selections.inventory.A.highlight.setVisible(true);
            this.selections.inventory.B.highlight.setVisible(true);
            this.selections.inventory.C.highlight.setVisible(true);
            this.selections.inventory.D.highlight.setVisible(true);

            this.updateItemQuantity('weapons', 'weaponTxt'); 

                
        }

        //----------------------inventory_page 2

        if (this.inventory_page2 === true)
        {

        //next buttons

            this.inventory_nextBtnRight.setVisible(false).setActive(false);
            this.inventory_nextBtnLeft1.setVisible(true).setActive(true);
            this.inventory_nextBtnRight2.setVisible(true).setActive(true);
            this.inventory_nextBtnLeft2.setVisible(false).setActive(false);
            this.powerupsButtons2.forEach(i => i.setVisible(false));
            this.weaponsButtons2.forEach(e => e.setVisible(false));
            this.inventoryTxt.setVisible(true);
            this.recipeTxt.setVisible(false);
            this.weaponButtons.forEach(e => e.setVisible(false));
            this.powerupsButtons.forEach(i => i.setVisible(false));
            this.weaponTxts.forEach(i => i.setVisible(false));
            this.powerupTxts.forEach(i => i.setVisible(false));
            this.itemsTxts.forEach(i => i.setVisible(true));
            this.mapTxt.setVisible(false);
            this.indicator.setVisible(false);
            this.inventorySubTxt.setVisible(true).setText('Items');
            this.itemsButtons.forEach(e => e.setVisible(true));
            this.worldMap.setVisible(false);
            this.shadows.forEach(e => e.setVisible(false));

            //item quantities

                this.updateItemQuantity('items', 'itemsTxt');

            }

    //-----------------inventory_page 3

        if (this.inventory_page3 === true)
        {
        
        //next buttons
            this.inventory_nextBtnRight.setVisible(false).setActive(false);
            this.inventory_nextBtnLeft1.setVisible(false).setActive(false);
            this.inventory_nextBtnRight2.setVisible(false).setActive(false);
            this.inventory_nextBtnLeft2.setVisible(true).setActive(true);
            this.mapTxt.setVisible(false);
            this.inventorySubTxt.setVisible(true).setText('Power-ups');
            this.powerupsButtons.forEach(i => i.setVisible(true));
            this.weaponTxts.forEach(i => i.setVisible(false));
            this.powerupTxts.forEach(i => i.setVisible(true));
            this.itemsTxts.forEach(i => i.setVisible(false));
            this.mapTxt.setVisible(false);
            this.worldMap.setVisible(false);
            this.shadows.forEach(e => e.setVisible(false));
            this.indicator.setVisible(false);
            this.recipeTxt.setVisible(false);
            this.itemsButtons.forEach(e => e.setVisible(false));
            this.weaponButtons.forEach(e => e.setVisible(false));

            // power up quantities

            this.updateItemQuantity('powerups', 'powerupTxt');

        }

    //------------------recipe
    
        if (this.recipe_page === true)
        {

        //next buttons

            this.inventoryButtons.forEach(i => i.setVisible(false).setActive(false));
            this.nextBtnRight1.setVisible(false).setActive(false);
            this.nextBtnLeft1.setVisible(true).setActive(true);
            this.nextBtnRight2.setVisible(true).setActive(true);
            this.nextBtnLeft2.setVisible(false).setActive(false);
            this.recipeTxt.setVisible(true);
            this.recipeScroll1.setVisible(this.data['recipes']._1 === true ? true : false);
            this.recipeScroll2.setVisible(this.data['recipes']._2 === true ? true : false);
            this.recipeScroll3.setVisible(this.data['recipes']._3 === true ? true : false);
            this.recipeScroll4.setVisible(this.data['recipes']._4 === true ? true : false);
            this.recipeScroll5.setVisible(this.data['recipes']._5 === true ? true : false);
            this.recipeScroll6.setVisible(this.data['recipes']._6 === true ? true : false);
            this.recipeScroll7.setVisible(this.data['recipes']._7 === true ? true : false);
            this.inventoryTxt.setVisible(false);
            this.inventorySubTxt.setVisible(false);
            this.mapTxt.setVisible(false);
            this.worldMap.setVisible(false);
            this.shadows.forEach(e => e.setVisible(false));

            this.powerupsButtons2.forEach(i => i.setVisible(false));
            this.powerupsButtons.forEach(i => i.setVisible(false));
            this.powerupTxts.forEach(i => i.setVisible(false));
            this.weaponTxts.forEach(i => i.setVisible(false));
            this.itemsTxts.forEach(i => i.setVisible(false));

            this.indicator.setVisible(false);

            this.itemsButtons.forEach(e => e.setVisible(false));
            this.itemsButtons2.forEach(e => e.setVisible(false));
            this.weaponsButtons2.forEach(e => e.setVisible(false));
            this.weaponButtons.forEach(e => e.setVisible(false));
            this.selections.inventory.A.button.setVisible(false).disableInteractive();
            this.selections.inventory.B.button.setVisible(false).disableInteractive();
            this.selections.inventory.C.button.setVisible(false).disableInteractive();
            this.selections.inventory.D.button.setVisible(false).disableInteractive();
            this.selections.inventory.A.highlight.setVisible(false);
            this.selections.inventory.B.highlight.setVisible(false);
            this.selections.inventory.C.highlight.setVisible(false);
            this.selections.inventory.D.highlight.setVisible(false);
            this.mapTxt.setVisible(false);
            this.worldMap.setVisible(false);
            this.shadows.forEach(e => e.setVisible(false));

        }

    //---------------------------map

        if (this.map_page === true)
        {

        //next buttons

            this.inventoryButtons.forEach(i => i.setVisible(false).setActive(false));
            this.nextBtnRight1.setVisible(false).setActive(false);
            this.nextBtnLeft1.setVisible(false).setActive(false);
            this.nextBtnRight2.setVisible(false).setActive(false);
            this.nextBtnLeft2.setVisible(true).setActive(true);
            this.recipeTxt.setVisible(false);
            this.recipeScrolls.forEach(i => i.setVisible(false));
            this.mapTxt.setVisible(true);
            this.worldMap.setVisible(true);
            this.shadows.forEach(e => e.setVisible(true));

            this.inventoryTxt.setVisible(false);
            this.inventorySubTxt.setVisible(false);
            this.powerupsButtons2.forEach(i => i.setVisible(false));
            this.powerupsButtons.forEach(i => i.setVisible(false));
            this.weaponTxts.forEach(i => i.setVisible(false));
            this.powerupTxts.forEach(i => i.setVisible(false));
            this.itemsTxts.forEach(i => i.setVisible(false));

            this.indicator.setVisible(false);

            this.itemsButtons.forEach(e => e.setVisible(false));
            this.itemsButtons2.forEach(e => e.setVisible(false));
            this.weaponButtons.forEach(e => e.setVisible(false));
            this.weaponsButtons2.forEach(e => e.setVisible(false));
            this.selections.inventory.A.button.setVisible(false).disableInteractive();
            this.selections.inventory.B.button.setVisible(false).disableInteractive();
            this.selections.inventory.C.button.setVisible(false).disableInteractive();
            this.selections.inventory.D.button.setVisible(false).disableInteractive();
            this.selections.inventory.A.highlight.setVisible(false);
            this.selections.inventory.B.highlight.setVisible(false);
            this.selections.inventory.C.highlight.setVisible(false);
            this.selections.inventory.D.highlight.setVisible(false);

        //unlocked levels

                if (this.data['shadows'].shadow1 >= 1)
                {   
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow1.setVisible(true);
                }
                if (this.data['shadows'].shadow2 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow2.setVisible(true);
                }
                if (this.data['shadows'].shadow3 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow3.setVisible(true);
                }
                if (this.data['shadows'].shadow4 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow4.setVisible(true);
                }
                if (this.data['shadows'].shadow5 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow5.setVisible(true);
                }
                if (this.data['shadows'].shadow6 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow6.setVisible(true);
                }
                if (this.data['shadows'].shadow7 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow7.setVisible(true);
                }
                if (this.data['shadows'].shadow8 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow8.setVisible(true);
                }
                if (this.data['shadows'].shadow9 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow9.setVisible(true);
                }
                if (this.data['shadows'].shadow10 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow10.setVisible(true);
                }
                if (this.data['shadows'].shadow11 >= 1)
                {
                    this.shadows.forEach(i => i.setVisible(false));
                    this.worldMapShadow11.setVisible(true);
                }
                if (this.data['shadows'].shadow12 >= 1)
                    this.shadows.forEach(i => i.setVisible(false));

            ////map indicator
                    this.indicator.setVisible(true);
            }

    }


//------------------------------------------------------------------------------

    public updatePosition (scene: Phaser.Scene): void
    {
        setTimeout(()=> {
            
            if (scene.scene.settings.active === true)
            {

                if (System.Config.isLandscape(scene)) 
                {
                
                    scene.cameras.main.centerOn(400, 400);

                    scene['ui'].setPosition(400, 400).setAngle(90);

                    scene['nextBtnRight1'].setPosition(180, 500)
                    scene['nextBtnLeft1'].setPosition(110, 500);
                    scene['nextBtnRight2'].setPosition(180, 500);
                    scene['nextBtnLeft2'].setPosition(110, 500);

                    scene['inventoryTxt'].setPosition(90, 150);
                    scene['inventorySubTxt'].setPosition(480, 150); 
                    scene['inventory_nextBtnRight'].setPosition(560, 220);
                    scene['inventory_nextBtnLeft1'].setPosition(490, 220);
                    scene['inventory_nextBtnRight2'].setPosition(560, 220);
                    scene['inventory_nextBtnLeft2'].setPosition(490, 220);

                    scene['selections'].inventory.C.button.setPosition(110, 230);
                    scene['selections'].inventory.D.button.setPosition(195, 230);
                    scene['selections'].inventory.A.button.setPosition(280, 230);
                    scene['selections'].inventory.B.button.setPosition(365, 230);

                    scene['selections'].inventory.C.highlight.setPosition(110, 230);
                    scene['selections'].inventory.D.highlight.setPosition(195, 230);
                    scene['selections'].inventory.A.highlight.setPosition(280, 230);
                    scene['selections'].inventory.B.highlight.setPosition(365, 230);

                    scene['quitGame'].setPosition(230, 370);
                    scene['quitGameButton'].setPosition(80, 600);
                    scene['quitNo'].setPosition(250, 450);
                    scene['quitYes'].setPosition(420, 450);
                    scene['goBack'].setPosition(90, 550);	
            
                    scene['weapons1'].setPosition(350, 330); 
                    scene['weapons2'].setPosition(350, 430);
                    scene['weapons3'].setPosition(350, 530);
                    scene['weapons4'].setPosition(490, 330);	
                    scene['weapons5'].setPosition(490, 430);
                    scene['weapons6'].setPosition(490, 530);
                    scene['weapons7'].setPosition(630, 530);
                    scene['weapons8'].setPosition(630, 430);
                    scene['weapons9'].setPosition(630, 330);
        

                    scene['weapons2_1'].setPosition(350, 330);
                    scene['weapons2_2'].setPosition(350, 430);	
                    scene['weapons2_3'].setPosition(350, 530);	
                    scene['weapons2_4'].setPosition(490, 330);	
                    scene['weapons2_5'].setPosition(490, 430);	
                    scene['weapons2_6'].setPosition(490, 530);
                    scene['weapons2_7'].setPosition(630, 530);
                    scene['weapons2_8'].setPosition(630, 430);
                    scene['weapons2_9'].setPosition(630, 330);	

                    scene['weapons3_1'].setPosition(350, 330);
                    scene['weapons3_2'].setPosition(350, 430);	
                    scene['weapons3_3'].setPosition(350, 530);	
                    scene['weapons3_4'].setPosition(490, 330);	
                    scene['weapons3_5'].setPosition(490, 430);	
                    scene['weapons3_6'].setPosition(490, 530);
                    scene['weapons3_7'].setPosition(630, 530);
                    scene['weapons3_8'].setPosition(630, 430);
                    scene['weapons3_9'].setPosition(630, 330);	

                    scene['weaponTxt1'].setPosition(380, 340);		
                    scene['weaponTxt2'].setPosition(380, 460);	
                    scene['weaponTxt3'].setPosition(380, 560);	
                    scene['weaponTxt4'].setPosition(520, 360);
                    scene['weaponTxt5'].setPosition(520, 460);
                    scene['weaponTxt6'].setPosition(520, 560);		
                    scene['weaponTxt7'].setPosition(650, 560);	
                    scene['weaponTxt8'].setPosition(650, 460);	
                    scene['weaponTxt9'].setPosition(650, 360);
            
                    scene['items1'].setPosition(330, 340);
                    scene['items2'].setPosition(450, 340);	
                    scene['items3'].setPosition(570, 340);	
                    scene['items4'].setPosition(330, 460);	
                    scene['items5'].setPosition(450, 460);
                    scene['items6'].setPosition(570, 460);
                    scene['items7'].setPosition(330, 580);
                    scene['items8'].setPosition(450, 580);
                    scene['items9'].setPosition(570, 580);

                    scene['itemsBtn2_1'].setPosition(330, 340);
                    scene['itemsBtn2_2'].setPosition(450, 340);
                    scene['itemsBtn2_3'].setPosition(570, 340);		
                    scene['itemsBtn2_4'].setPosition(330, 460);	
                    scene['itemsBtn2_5'].setPosition(450, 460);	
                    scene['itemsBtn2_6'].setPosition(570, 460);	
                    scene['itemsBtn2_7'].setPosition(330, 580);	
                    scene['itemsBtn2_8'].setPosition(450, 580);	
                    scene['itemsBtn2_9'].setPosition(570, 580);

                    
                    scene['itemsBtn3_1'].setPosition(330, 340);
                    scene['itemsBtn3_2'].setPosition(450, 340);
                    scene['itemsBtn3_3'].setPosition(570, 340);		
                    scene['itemsBtn3_4'].setPosition(330, 460);	
                    scene['itemsBtn3_5'].setPosition(450, 460);	
                    scene['itemsBtn3_6'].setPosition(570, 460);	
                    scene['itemsBtn3_7'].setPosition(330, 580);	
                    scene['itemsBtn3_8'].setPosition(450, 580);	
                    scene['itemsBtn3_9'].setPosition(570, 580);

                    scene['itemsTxt1'].setPosition(370, 360);		
                    scene['itemsTxt2'].setPosition(490, 360);	
                    scene['itemsTxt3'].setPosition(610, 360);	
                    scene['itemsTxt4'].setPosition(370, 480);
                    scene['itemsTxt5'].setPosition(490, 480);
                    scene['itemsTxt6'].setPosition(610, 480);		
                    scene['itemsTxt7'].setPosition(370, 600);	
                    scene['itemsTxt8'].setPosition(490, 600);	
                    scene['itemsTxt9'].setPosition(610, 600);

                    scene['powerups1'].setPosition(330, 340); 
                    scene['powerups2'].setPosition(450, 340);
                    scene['powerups3'].setPosition(570, 340);
                    scene['powerups4'].setPosition(330, 460);	
                    scene['powerups5'].setPosition(450, 460);
                    scene['powerups6'].setPosition(570, 460);
                    scene['powerups7'].setPosition(330, 580);
                    scene['powerups8'].setPosition(450, 580);	
                    scene['powerups9'].setPosition(570, 580);
                        
                    scene['powerup2_1'].setPosition(330, 340);
                    scene['powerup2_2'].setPosition(450, 340);
                    scene['powerup2_3'].setPosition(570, 340);
                    scene['powerup2_4'].setPosition(330, 460);	
                    scene['powerup2_5'].setPosition(450, 460);	
                    scene['powerup2_6'].setPosition(570, 460);	
                    scene['powerup2_7'].setPosition(330, 580);	
                    scene['powerup2_8'].setPosition(450, 580);	
                    scene['powerup2_9'].setPosition(570, 580);

                    scene['powerup3_1'].setPosition(330, 340);
                    scene['powerup3_2'].setPosition(450, 340);
                    scene['powerup3_3'].setPosition(570, 340);
                    scene['powerup3_4'].setPosition(330, 460);	
                    scene['powerup3_5'].setPosition(450, 460);	
                    scene['powerup3_6'].setPosition(570, 460);	
                    scene['powerup3_7'].setPosition(330, 580);	
                    scene['powerup3_8'].setPosition(450, 580);	
                    scene['powerup3_9'].setPosition(570, 580);

                    scene['powerupTxt1'].setPosition(370, 360);		
                    scene['powerupTxt2'].setPosition(490, 360);	
                    scene['powerupTxt3'].setPosition(610, 360);	
                    scene['powerupTxt4'].setPosition(370, 480);
                    scene['powerupTxt5'].setPosition(490, 480);
                    scene['powerupTxt6'].setPosition(610, 480);		
                    scene['powerupTxt7'].setPosition(370, 600);	
                    scene['powerupTxt8'].setPosition(490, 600);	
                    scene['powerupTxt9'].setPosition(610, 600);

                    scene['recipeTxt'].setPosition(90, 150);
                    scene['recipeScrolls'].forEach(i => i.setPosition(510, 400));

                    scene['mapTxt'].setPosition(100, 150);
                    scene['worldMap'].setPosition(510, 400);
                    scene['worldMapShadow1'].setPosition(510, 400);
                    scene['worldMapShadow2'].setPosition(510, 400);
                    scene['worldMapShadow3'].setPosition(510, 400);
                    scene['worldMapShadow4'].setPosition(510, 400);
                    scene['worldMapShadow5'].setPosition(510, 400);
                    scene['worldMapShadow6'].setPosition(510, 400);
                    scene['worldMapShadow7'].setPosition(510, 400);
                    scene['worldMapShadow8'].setPosition(510, 400);
                    scene['worldMapShadow9'].setPosition(510, 400);
                    scene['worldMapShadow10'].setPosition(510, 400);
                    scene['worldMapShadow11'].setPosition(510, 400);


                }

                else
                {
                            
                    scene['ui'].setPosition(400, 580).setAngle(0).setScale(1);
                    scene['inventoryTxt'].setPosition(240, 250);
                    scene['inventorySubTxt'].setPosition(350, 360);

                    scene['selections'].inventory.C.button.setPosition(272, 330);
                    scene['selections'].inventory.D.button.setPosition(357, 330);
                    scene['selections'].inventory.A.button.setPosition(444, 330);
                    scene['selections'].inventory.B.button.setPosition(527, 330);

                    scene['selections'].inventory.C.highlight.setPosition(272, 330);
                    scene['selections'].inventory.D.highlight.setPosition(357, 330);
                    scene['selections'].inventory.A.highlight.setPosition(444, 330);
                    scene['selections'].inventory.B.highlight.setPosition(527, 330);


                    scene['nextBtnRight1'].setPosition(630, 250);
                    scene['nextBtnLeft1'].setPosition(170, 250);
                    scene['nextBtnRight2'].setPosition(630, 250);
                    scene['nextBtnLeft2'].setPosition(170, 250);

                    scene['inventory_nextBtnRight'].setPosition(490, 380);
                    scene['inventory_nextBtnLeft1'].setPosition(300, 380);
                    scene['inventory_nextBtnRight2'].setPosition(490, 380);
                    scene['inventory_nextBtnLeft2'].setPosition(300, 380);

                    scene['quitGame'].setPosition(230, 550);
                    scene['quitGameButton'].setPosition(400, 850);
                    scene['quitNo'].setPosition(250, 630);
                    scene['quitYes'].setPosition(420, 630);
                    scene['goBack'].setPosition(210, 850);	

                    scene['weapons1'].setPosition(280, 500); 
                    scene['weapons2'].setPosition(400, 500);
                    scene['weapons3'].setPosition(520, 500);
                    scene['weapons4'].setPosition(280, 620);	
                    scene['weapons5'].setPosition(400, 620);
                    scene['weapons6'].setPosition(520, 620);
                    scene['weapons7'].setPosition(280, 750);
                    scene['weapons8'].setPosition(400, 750);	
                    scene['weapons9'].setPosition(520, 750);
                        
                    scene['weapons2_1'].setPosition(280, 500);
                    scene['weapons2_2'].setPosition(400, 500);
                    scene['weapons2_3'].setPosition(520, 500);
                    scene['weapons2_4'].setPosition(280, 620);	
                    scene['weapons2_5'].setPosition(400, 620);	
                    scene['weapons2_6'].setPosition(520, 620);	
                    scene['weapons2_7'].setPosition(280, 750);	
                    scene['weapons2_8'].setPosition(400, 750);	
                    scene['weapons2_9'].setPosition(520, 750);	

                    scene['weapons3_1'].setPosition(280, 500);
                    scene['weapons3_2'].setPosition(400, 500);
                    scene['weapons3_3'].setPosition(520, 500);
                    scene['weapons3_4'].setPosition(280, 620);	
                    scene['weapons3_5'].setPosition(400, 620);	
                    scene['weapons3_6'].setPosition(520, 620);	
                    scene['weapons3_7'].setPosition(280, 750);	
                    scene['weapons3_8'].setPosition(400, 750);	
                    scene['weapons3_9'].setPosition(520, 750);	
                    
                    scene['weaponTxt1'].setPosition(290, 540);		
                    scene['weaponTxt2'].setPosition(410, 540);	
                    scene['weaponTxt3'].setPosition(530, 540);	
                    scene['weaponTxt4'].setPosition(290, 660);
                    scene['weaponTxt5'].setPosition(410, 660);
                    scene['weaponTxt6'].setPosition(530, 660);		
                    scene['weaponTxt7'].setPosition(290, 790);	
                    scene['weaponTxt8'].setPosition(410, 790);	
                    scene['weaponTxt9'].setPosition(530, 790);

                    scene['items1'].setPosition(280, 500);
                    scene['items2'].setPosition(400, 500);	
                    scene['items3'].setPosition(520, 500);	
                    scene['items4'].setPosition(280, 620);	
                    scene['items5'].setPosition(400, 620);
                    scene['items6'].setPosition(520, 620);
                    scene['items7'].setPosition(280, 740);
                    scene['items8'].setPosition(400, 740);
                    scene['items9'].setPosition(520, 740);

                    scene['itemsBtn2_1'].setPosition(280, 500);
                    scene['itemsBtn2_2'].setPosition(400, 500);
                    scene['itemsBtn2_3'].setPosition(520, 500);		
                    scene['itemsBtn2_4'].setPosition(280, 620);	
                    scene['itemsBtn2_5'].setPosition(400, 620);	
                    scene['itemsBtn2_6'].setPosition(520, 620);	
                    scene['itemsBtn2_7'].setPosition(280, 740);	
                    scene['itemsBtn2_8'].setPosition(400, 740);	
                    scene['itemsBtn2_9'].setPosition(520, 740);

                    scene['itemsBtn3_1'].setPosition(280, 500);
                    scene['itemsBtn3_2'].setPosition(400, 500);
                    scene['itemsBtn3_3'].setPosition(520, 500);		
                    scene['itemsBtn3_4'].setPosition(280, 620);	
                    scene['itemsBtn3_5'].setPosition(400, 620);	
                    scene['itemsBtn3_6'].setPosition(520, 620);	
                    scene['itemsBtn3_7'].setPosition(280, 740);	
                    scene['itemsBtn3_8'].setPosition(400, 740);	
                    scene['itemsBtn3_9'].setPosition(520, 740);

                    scene['itemsTxt1'].setPosition(290, 540);		
                    scene['itemsTxt2'].setPosition(410, 540);	
                    scene['itemsTxt3'].setPosition(530, 540);	
                    scene['itemsTxt4'].setPosition(290, 660);
                    scene['itemsTxt5'].setPosition(410, 660);
                    scene['itemsTxt6'].setPosition(530, 660);		
                    scene['itemsTxt7'].setPosition(290, 790);	
                    scene['itemsTxt8'].setPosition(410, 790);	
                    scene['itemsTxt9'].setPosition(530, 790);

                    scene['powerups1'].setPosition(280, 500); 
                    scene['powerups2'].setPosition(400, 500);
                    scene['powerups3'].setPosition(520, 500);
                    scene['powerups4'].setPosition(280, 620);	
                    scene['powerups5'].setPosition(400, 620);
                    scene['powerups6'].setPosition(520, 620);
                    scene['powerups7'].setPosition(280, 750);
                    scene['powerups8'].setPosition(400, 750);	
                    scene['powerups9'].setPosition(520, 750);
                        
                    scene['powerup2_1'].setPosition(280, 500);
                    scene['powerup2_2'].setPosition(400, 500);
                    scene['powerup2_3'].setPosition(520, 500);
                    scene['powerup2_4'].setPosition(280, 620);	
                    scene['powerup2_5'].setPosition(400, 620);	
                    scene['powerup2_6'].setPosition(520, 620);	
                    scene['powerup2_7'].setPosition(280, 750);	
                    scene['powerup2_8'].setPosition(400, 750);	
                    scene['powerup2_9'].setPosition(520, 750);

                    scene['powerup3_1'].setPosition(280, 500);
                    scene['powerup3_2'].setPosition(400, 500);
                    scene['powerup3_3'].setPosition(520, 500);
                    scene['powerup3_4'].setPosition(280, 620);	
                    scene['powerup3_5'].setPosition(400, 620);	
                    scene['powerup3_6'].setPosition(520, 620);	
                    scene['powerup3_7'].setPosition(280, 750);	
                    scene['powerup3_8'].setPosition(400, 750);	
                    scene['powerup3_9'].setPosition(520, 750);

                    scene['powerupTxt1'].setPosition(290, 540);		
                    scene['powerupTxt2'].setPosition(410, 540);	
                    scene['powerupTxt3'].setPosition(530, 540);	
                    scene['powerupTxt4'].setPosition(290, 660);
                    scene['powerupTxt5'].setPosition(410, 660);
                    scene['powerupTxt6'].setPosition(530, 660);		
                    scene['powerupTxt7'].setPosition(290, 790);	
                    scene['powerupTxt8'].setPosition(410, 790);	
                    scene['powerupTxt9'].setPosition(530, 790);

                    scene['recipeTxt'].setPosition(300, 250);
                    scene['recipeScrolls'].forEach(i => i.setPosition(420, 570));

                    scene['worldMap'].setPosition(400, 600);
                    scene['mapTxt'].setPosition(340, 250);
                    scene['worldMapShadow1'].setPosition(400, 600);
                    scene['worldMapShadow2'].setPosition(400, 600);
                    scene['worldMapShadow3'].setPosition(400, 600);
                    scene['worldMapShadow4'].setPosition(400, 600);
                    scene['worldMapShadow5'].setPosition(400, 600);
                    scene['worldMapShadow6'].setPosition(400, 600);
                    scene['worldMapShadow7'].setPosition(400, 600);
                    scene['worldMapShadow8'].setPosition(400, 600);
                    scene['worldMapShadow9'].setPosition(400, 600);
                    scene['worldMapShadow10'].setPosition(400, 600);
                    scene['worldMapShadow11'].setPosition(400, 600);

                } 
                
      
        //--------map indicator

                switch(scene.data['currentStage'])
                {
                    case 'Lab' : scene['indicator'].setPosition(!System.Config.isLandscape(scene) ? 470 : 570, !System.Config.isLandscape(scene) ? 750 : 550); break;
                    case 'Swanky Franks' : case 'Greater GraterVille' : case 'Flukrainian Club' : scene['indicator'].setPosition(!System.Config.isLandscape(scene) ? 250 : 450, !System.Config.isLandscape(scene) ? 780 : 550); break;
                    case 'Herb Garden' : case 'Crucif Forest' : scene['indicator'].setPosition(!System.Config.isLandscape(scene) ? 300 : 400, !System.Config.isLandscape(scene) ? 650 : 460); break;
                    case 'Freezer' : case 'Freezer Courtyard' : scene['indicator'].setPosition(!System.Config.isLandscape(scene) ? 270 : 370, !System.Config.isLandscape(scene) ? 590 : 410); break;
                    case 'Leaning Tower Of Pizza' : case 'Cotton Candy Clouds' : scene['indicator'].setPosition(470, !System.Config.isLandscape(scene) ? 600 : 500); break;
                    case 'Beercano' : case 'Secret Club' : scene['indicator'].setPosition(600, !System.Config.isLandscape(scene) ? 600 : 500); break;
                    case 'Scone Beach' : scene['indicator'].setPosition(!System.Config.isLandscape(scene) ? 580 : 630, !System.Config.isLandscape(scene) ? 550 : 320); break;
                    case 'Strip Club' : case 'Fish Town' : case 'Sushi Restaurant' : scene['indicator'].setPosition(!System.Config.isLandscape(scene) ? 270 : 450, !System.Config.isLandscape(scene) ? 480 : 280); break;
                    case 'Middle Yeast' : case 'Red Sea' : case 'Tomb' : scene['indicator'].setPosition(400, !System.Config.isLandscape(scene) ? 450 : 320); break;
                    case 'Melon Land' : scene['indicator'].setPosition(550, !System.Config.isLandscape(scene) ? 450 : 300); break;
                    case 'The Oven' : case 'Carb Kingdom' : case 'Tunnel' : scene['indicator'].setPosition(!System.Config.isLandscape(scene) ? 370 : 470, !System.Config.isLandscape(scene) ? 570 : 350); break;
                    case 'Meatball Mountain' : scene['indicator'].setPosition(300, !System.Config.isLandscape(scene) ? 400 : 270); break;
                }
            }
        }, 250); 
    }

    //---------------------------------------------------- update inventory text quantities


    public async updateItemQuantity(target: string, targetText: string): Promise<void>
    {
        for (let i = 1; i < 10/* 9 */; i++)
        {
            let
                item = this[target + i],
                text = this[targetText + i];

            if (item)
            {
               const quant = await System.Process.app.inventory.assignItemQuantity(item);
               text.setText(quant).setVisible(quant !== null ? true : false);
            }
        }
    }


    //------------------------------ exit pause


    private exitPause (scene: Phaser.Scene): void
    {
        System.Process.app.gfx.setVisible(false); 
        System.Process.app.audio.play('ring_echo', 1.1, false, scene, 0);
        System.Config.vibrate(20);
        System.Process.app.events.ee.emit('resume'); 
        scene.scene.get('Controller')['_inputs'].isPaused = false;
    }


    //------------------------------- change pages


    private changePage(scene: Phaser.Scene, page: string): void
    {

        System.Process.app.audio.play('sword_swipe', 0.5, false, scene, 0);
        System.Config.vibrate(20);

        let equippedButtons = [
            this.selections.inventory.C.button,
            this.selections.inventory.D.button,
            this.selections.inventory.A.button,
            this.selections.inventory.B.button
        ];

        switch (page)
        {
            case 'inventory 1': 

                this.inventory_page1 = true; 
                this.inventory_page2 = false; 
                this.inventory_page3 = false; 
                this.recipe_page = false;
                this.map_page = false;

                System.Process.app.inputs.updatePrompts ([
                    this.inventory_nextBtnRight, 
                    this.nextBtnRight1, 
                    ...equippedButtons, 
                    ...this.weaponsButtons3, 
                    this.goBack, 
                    this.quitGameButton
                ]);
        

            break;

            case 'inventory 2':

                this.inventory_page2 = true;
                this.inventory_page1 = false; 
                this.inventory_page3 = false; 
                this.recipe_page = false;
                this.map_page = false;

                System.Process.app.inputs.updatePrompts([
                    this.inventory_nextBtnLeft1, 
                    this.inventory_nextBtnRight2, 
                    this.nextBtnRight1,
                    ...equippedButtons,  
                    ...this.itemsButtons3, 
                    this.goBack, 
                    this.quitGameButton
                ]);
               

            break;

            case 'inventory 3':

                this.inventory_page2 = false;
                this.inventory_page1 = false; 
                this.inventory_page3 = true; 
                this.recipe_page = false;
                this.map_page = false;

                System.Process.app.inputs.updatePrompts([
                    this.nextBtnRight1, 
                    this.inventory_nextBtnLeft2, 
                    ...equippedButtons, 
                    ...this.powerupsButtons3, 
                    this.goBack, 
                    this.quitGameButton
                ]);
               

            break;

            case 'recipe': 

            // view recipe quest if not in multiplayer mode

                if (this.isMultiplayer === false)
                {
                    this.inventory_page2 = false;
                    this.inventory_page1 = false; 
                    this.inventory_page3 = false; 
                    this.recipe_page = true;
                    this.map_page = false;

                    System.Process.app.inputs.updatePrompts([
                        this.nextBtnRight2, 
                        this.nextBtnLeft1, 
                        this.goBack, 
                        this.quitGameButton
                    ]);
             
                }
              
            break;

            case 'map':

            // view map if not in multiplayer mode

                if (this.isMultiplayer === false)
                {
                    this.inventory_page2 = false;
                    this.inventory_page1 = false; 
                    this.inventory_page3 = false; 
                    this.recipe_page = false;
                    this.map_page = true;

                    System.Process.app.inputs.updatePrompts([
                        this.nextBtnRight2, 
                        this.nextBtnLeft2, 
                        this.goBack, 
                        this.quitGameButton
                    ]);
               
                }

            break;
        }
    }


}



