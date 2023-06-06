import * as ENABLE3D from '@enable3d/phaser-extension';
import { System } from '../../core/Config';


export class Menu3D extends Phaser.Scene {

    public GAME_WIDTH: number
    public GAME_HEIGHT: number

    private inventory_page1: boolean
    private inventory_page2: boolean
 
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

    private _scene: ENABLE3D.Scene3D
    private ui: Phaser.GameObjects.Image
    private darkenOverlay: Phaser.GameObjects.Image
    private inventory_nextBtnLeft: Phaser.GameObjects.Image
    private inventory_nextBtnRight: Phaser.GameObjects.Image

    private goBack: Phaser.GameObjects.Text
    private quitGame: Phaser.GameObjects.Text
    private quitGameButton: Phaser.GameObjects.Text
    private quitYes: Phaser.GameObjects.Text
    private quitNo: Phaser.GameObjects.Text
    private inventoryTxt: Phaser.GameObjects.Text
    private inventorySubTxt: Phaser.GameObjects.Text

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

    private weapons3_1: Phaser.GameObjects.Sprite	
    private weapons3_2: Phaser.GameObjects.Sprite	
    private weapons3_3: Phaser.GameObjects.Sprite	
    private weapons3_4: Phaser.GameObjects.Sprite	
    private weapons3_5: Phaser.GameObjects.Sprite	
    private weapons3_6: Phaser.GameObjects.Sprite	
    private weapons3_7: Phaser.GameObjects.Sprite	
    private weapons3_8: Phaser.GameObjects.Sprite	
    private weapons3_9: Phaser.GameObjects.Sprite

    private weaponButtons: Phaser.GameObjects.Sprite[]

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

    private items1: Phaser.GameObjects.Sprite
    private items2: Phaser.GameObjects.Sprite
    private items3: Phaser.GameObjects.Sprite
    private items4: Phaser.GameObjects.Sprite
    private items5: Phaser.GameObjects.Sprite
    private items6: Phaser.GameObjects.Sprite
    private items7: Phaser.GameObjects.Sprite
    private items8: Phaser.GameObjects.Sprite
    private items9: Phaser.GameObjects.Sprite

    private item2_1: Phaser.GameObjects.Sprite
    private item2_2: Phaser.GameObjects.Sprite
    private item2_3: Phaser.GameObjects.Sprite
    private item2_4: Phaser.GameObjects.Sprite
    private item2_5: Phaser.GameObjects.Sprite
    private item2_6: Phaser.GameObjects.Sprite
    private item2_7: Phaser.GameObjects.Sprite
    private item2_8: Phaser.GameObjects.Sprite
    private item2_9: Phaser.GameObjects.Sprite

    private item3_1: Phaser.GameObjects.Sprite
    private item3_2: Phaser.GameObjects.Sprite
    private item3_3: Phaser.GameObjects.Sprite
    private item3_4: Phaser.GameObjects.Sprite
    private item3_5: Phaser.GameObjects.Sprite
    private item3_6: Phaser.GameObjects.Sprite
    private item3_7: Phaser.GameObjects.Sprite
    private item3_8: Phaser.GameObjects.Sprite
    private item3_9: Phaser.GameObjects.Sprite

    private itemsButtons: Phaser.GameObjects.Sprite[]

    private itemTxt1: Phaser.GameObjects.Text	
    private itemTxt2: Phaser.GameObjects.Text	
    private itemTxt3: Phaser.GameObjects.Text	
    private itemTxt4: Phaser.GameObjects.Text	
    private itemTxt5: Phaser.GameObjects.Text	
    private itemTxt6: Phaser.GameObjects.Text	
    private itemTxt7: Phaser.GameObjects.Text	
    private itemTxt8: Phaser.GameObjects.Text	
    private itemTxt9: Phaser.GameObjects.Text	

    private itemsTxts: Phaser.GameObjects.Text[]

    private weaponsButtons2: Phaser.GameObjects.Sprite[]
    private itemsButtons2: Phaser.GameObjects.Sprite[]
    private weaponsButtons3: Phaser.GameObjects.Sprite[]
    private itemsButtons3: Phaser.GameObjects.Sprite[]


    constructor(){
        super('Menu3D');
    }

    private init(scene: ENABLE3D.Scene3D): void
    {

        this.GAME_WIDTH = 0;
        this.GAME_HEIGHT = 0;
        scene.input.mouse.releasePointerLock();
    }

    private create(scene: ENABLE3D.Scene3D): void
    {   

        this._scene = scene;
        this.data = scene.data;              

        this.ui = this.add.image(-1000, -1000 , 'pause_menu_interface');

        this.inventoryTxt = this.add.text(-1000, -1000, "INVENTORY", {font: "58px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 5).setShadow(2, 2, '#000000', 1, false);

    //page toggle

        this.inventory_nextBtnRight =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.6).on('pointerdown', ()=> this.changePage('inventory 2'))

        this.inventory_nextBtnLeft =  this.add.image(-1000, -1000, 'next_button').setInteractive().setScale(0.6).setFlipX(true).on('pointerdown', ()=> this.changePage('inventory 1'));

        this.darkenOverlay = this.add.image(-1000, -1000 , 'pause_menu_interface').setDepth(99).setVisible(false).setTintFill(0x000000).setAlpha(0.75);

    //quit game
    
        this.quitGame = this.add.text(-1000, -1000, "Quit Game?", {font: "60px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false).setVisible(false).setInteractive().setDepth(101);
        this.quitNo = this.add.text(-1000, -1000, "No", {font: "60px Digitizer"}).setColor('#ff0000').setStroke("#ffff00", 4).setShadow(2, 2, '#000000', 1, false).setActive(false).setVisible(false).setInteractive().setDepth(101);
        this.quitYes = this.add.text(-1000, -1000, "Yes", {font: "60px Digitizer"}).setColor('#FF0000').setStroke("#ffff00", 4).setShadow(2, 2, '#000000', 1, false).setActive(false).setVisible(false).setInteractive().setDepth(101);
        this.quitGameButton = this.add.text(-1000, -1000, "Quit Game", {font: "30px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false).setInteractive().setDepth(101);

        this.quitGameButton.on('pointerdown', (): void => {

                System.Process.app.audio.play('ring', 0.5, false, this, 0);
                System.Config.vibrate(20);
                this.quitGame.setVisible(true);
                this.quitGameButton.setTintFill(0xff0000).setActive(true).setVisible(true);
                this.darkenOverlay.setVisible(true); 
                this.quitNo.setActive(true).setVisible(true);
                this.quitYes.setActive(true).setVisible(true);

                let quit = false;

                this.quitYes.on('pointerdown', (): void => {
                    
                    if (quit)
                        return;

                    quit = true;

                    this.exitGame();
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
            .on('pointerover', ()=>this.quitGameButton.setTintFill(0xff0000))
            .on('pointerout', ()=>this.quitGameButton.clearTint());

    //--------------go back

        this.goBack = this.add.text(-1000, -1000, "Go Back", {font: "30px Digitizer"}).setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false)
            .setDepth(101)
            .setInteractive()
            .on('pointerdown', ()=> this.exitPause(this))
            .on('pointerup', ()=>this.goBack.clearTint())
            .on('pointerover', ()=> this.goBack.setTintFill(0xffff00))
            .on('pointerout', ()=> this.goBack.clearTint());       


            this.inventorySubTxt = this.add.text(-1000, -1000, 'Weapons', {font: "30px Bangers"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false);
            
    //--------------------- assign textures of weapons

            this.weapon1 = this.data['weapons'][0];
            this.weapon2 = this.data['weapons'][1];
            this.weapon3 = this.data['weapons'][2];
            this.weapon4 = this.data['weapons'][3];
            this.weapon5 = this.data['weapons'][4];
            this.weapon6 = this.data['weapons'][5];
            this.weapon7 = this.data['weapons'][6];
            this.weapon8 = this.data['weapons'][7];
            this.weapon9 = this.data['weapons'][8];

            this.weapons1 = this.add.sprite(-1000, -1000, this.weapon1).setInteractive();
            this.weapons2 = this.add.sprite(-1000, -1000, this.weapon2).setInteractive();
            this.weapons3 = this.add.sprite(-1000, -1000, this.weapon3).setInteractive();
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

            this.weapons3_1 = this.add.sprite(-1000, -1000, this.weapon1).setInteractive().setAlpha(0.5);	
            this.weapons3_2 = this.add.sprite(-1000, -1000, this.weapon2).setInteractive().setAlpha(0.5);	
            this.weapons3_3 = this.add.sprite(-1000, -1000, this.weapon3).setInteractive().setAlpha(0.5);	
            this.weapons3_4 = this.add.sprite(-1000, -1000, this.weapon4).setInteractive().setAlpha(0.5);	
            this.weapons3_5 = this.add.sprite(-1000, -1000, this.weapon5).setInteractive().setAlpha(0.5);	
            this.weapons3_6 = this.add.sprite(-1000, -1000, this.weapon6).setInteractive().setAlpha(0.5);	
            this.weapons3_7 = this.add.sprite(-1000, -1000, this.weapon7).setInteractive().setAlpha(0.5);	
            this.weapons3_8 = this.add.sprite(-1000, -1000, this.weapon8).setInteractive().setAlpha(0.5);	
            this.weapons3_9 = this.add.sprite(-1000, -1000, this.weapon9).setInteractive().setAlpha(0.5);	

            this.weaponsButtons3 = [];

                for (let i = 1; i < 10; i++)
                    if (this[`weapon${i}`])
                        this.weaponsButtons3.push(this[`weapons3_${i}`]);

        //weapon quantities 

            this.weaponTxt1  = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setStroke('#000000', 2);		
            this.weaponTxt2 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
            this.weaponTxt3 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
            this.weaponTxt4 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.weaponTxt5 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.weaponTxt6 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.weaponTxt7 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.weaponTxt8 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.weaponTxt9 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            
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

        //layer2

            this.item2_1 = this.add.sprite(-1000, -1000, this.item1).setInteractive().setTintFill(0xffff00);	
            this.item2_2 = this.add.sprite(-1000, -1000, this.item2).setInteractive().setTintFill(0xffff00);	
            this.item2_3 = this.add.sprite(-1000, -1000, this.item3).setInteractive().setTintFill(0xffff00);	
            this.item2_4 = this.add.sprite(-1000, -1000, this.item4).setInteractive().setTintFill(0xffff00);	
            this.item2_5 = this.add.sprite(-1000, -1000, this.item5).setInteractive().setTintFill(0xffff00);	
            this.item2_6 = this.add.sprite(-1000, -1000, this.item6).setInteractive().setTintFill(0xffff00);	
            this.item2_7 = this.add.sprite(-1000, -1000, this.item7).setInteractive().setTintFill(0xffff00);	 
            this.item2_8 = this.add.sprite(-1000, -1000, this.item8).setInteractive().setTintFill(0xffff00);	
            this.item2_9 = this.add.sprite(-1000, -1000, this.item9).setInteractive().setTintFill(0xffff00);	

            this.itemsButtons2 = [
                this.item2_1, this.item2_2, this.item2_3, this.item2_4, 
                this.item2_5, this.item2_6, this.item2_7, this.item2_8, this.item2_9, 
            ];

        //layer 3

            this.item3_1 = this.add.sprite(-1000, -1000, this.item1).setInteractive().setAlpha(0.5);
            this.item3_2 = this.add.sprite(-1000, -1000, this.item2).setInteractive().setAlpha(0.5);
            this.item3_3 = this.add.sprite(-1000, -1000, this.item3).setInteractive().setAlpha(0.5);
            this.item3_4 = this.add.sprite(-1000, -1000, this.item4).setInteractive().setAlpha(0.5);
            this.item3_5 = this.add.sprite(-1000, -1000, this.item5).setInteractive().setAlpha(0.5);
            this.item3_6 = this.add.sprite(-1000, -1000, this.item6).setInteractive().setAlpha(0.5);
            this.item3_7 = this.add.sprite(-1000, -1000, this.item7).setInteractive().setAlpha(0.5);
            this.item3_8 = this.add.sprite(-1000, -1000, this.item8).setInteractive().setAlpha(0.5);
            this.item3_9 = this.add.sprite(-1000, -1000, this.item9).setInteractive().setAlpha(0.5);

            this.itemsButtons3 = [];

            for (let i = 1; i < 10; i++)
                if (this[`item${i}`])
                    this.itemsButtons3.push(this[`item3_${i}`]);

            this.tweens.add({targets: this.item2_1, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.item2_2, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.item2_3, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.item2_4, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.item2_5, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.item2_6, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.item2_7, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            this.tweens.add({targets: this.item2_8, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true}); 
            this.tweens.add({targets: this.item2_9, alpha: 0, duration: 2000, ease: 'Power1', repeat: -1, yoyo: true});
            

        //item quantities 

            this.itemTxt1  = this.add.text(-1000, -1000, '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);		
            this.itemTxt2 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
            this.itemTxt3 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);	
            this.itemTxt4 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.itemTxt5 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.itemTxt6 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.itemTxt7 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.itemTxt8 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);
            this.itemTxt9 = this.add.text(-1000, -1000,  '', {font: "15px Digitizer"}).setColor('#ffffff').setStroke('#000000', 2);

            this.itemsTxts = [
                this.itemTxt1,
                this.itemTxt2,
                this.itemTxt3,
                this.itemTxt4,
                this.itemTxt5,
                this.itemTxt6,
                this.itemTxt7,
                this.itemTxt8,
                this.itemTxt9
            ];

        
//------------------------------------------------------------------on screen inputs
 
    
    // weapons
    
        this.weapons3_1.on('pointerdown', ()=> this.setItem(this._scene, this.weapon1));
        this.weapons3_2.on('pointerdown', ()=> this.setItem(this._scene, this.weapon2));
        this.weapons3_3.on('pointerdown', ()=> this.setItem(this._scene, this.weapon3));
        this.weapons3_4.on('pointerdown', ()=> this.setItem(this._scene, this.weapon4));	
        this.weapons3_5.on('pointerdown', ()=> this.setItem(this._scene, this.weapon5));	
        this.weapons3_6.on('pointerdown', ()=> this.setItem(this._scene, this.weapon6));
        this.weapons3_7.on('pointerdown', ()=> this.setItem(this._scene, this.weapon7));
        this.weapons3_8.on('pointerdown', ()=> this.setItem(this._scene, this.weapon8));
        this.weapons3_9.on('pointerdown', ()=> this.setItem(this._scene, this.weapon9));
    

    // power ups
    
        this.item3_1.on('pointerdown', ()=> this.setItem(this._scene, this.item1));
        this.item3_2.on('pointerdown', ()=> this.setItem(this._scene, this.item2));
        this.item3_3.on('pointerdown', ()=> this.setItem(this._scene, this.item3));
        this.item3_4.on('pointerdown', ()=> this.setItem(this._scene, this.item4));
        this.item3_5.on('pointerdown', ()=> this.setItem(this._scene, this.item5));
        this.item3_6.on('pointerdown', ()=> this.setItem(this._scene, this.item6));
        this.item3_7.on('pointerdown', ()=> this.setItem(this._scene, this.item7));
        this.item3_8.on('pointerdown', ()=> this.setItem(this._scene, this.item8));
        this.item3_9.on('pointerdown', ()=> this.setItem(this._scene, this.item9));


    //call resize

        System.Process.app.ui.listen(this, 'PauseMenu', this.updatePosition);

    //implement menu prompts

        System.Process.app.inputs.implementMenuSelections(this, [], null);

    //set page default
							
        this.changePage('inventory 1');


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
        
        this.weapons2_1.setVisible(this.inventory_page1 === true && this.weapons2_1.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_2.setVisible(this.inventory_page1 === true && this.weapons2_2.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_3.setVisible(this.inventory_page1 === true && this.weapons2_3.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_4.setVisible(this.inventory_page1 === true && this.weapons2_4.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_5.setVisible(this.inventory_page1 === true && this.weapons2_5.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_6.setVisible(this.inventory_page1 === true && this.weapons2_6.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_7.setVisible(this.inventory_page1 === true && this.weapons2_7.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_8.setVisible(this.inventory_page1 === true && this.weapons2_8.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.weapons2_9.setVisible(this.inventory_page1 === true && this.weapons2_9.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);

        this.weapons3_1.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_2.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_3.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_4.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_5.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_6.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_7.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_8.setVisible(this.inventory_page1 === true ? true : false);
        this.weapons3_9.setVisible(this.inventory_page1 === true ? true : false);


    //--------------------------- items

        this.item1 !== null ? this.items1.setVisible(true).clearTint().setInteractive() : this.items1.setVisible(false).disableInteractive();
        this.item2 !== null ? this.items2.setVisible(true).clearTint().setInteractive() : this.items2.setVisible(false).disableInteractive();
        this.item3 !== null ? this.items3.setVisible(true).clearTint().setInteractive() : this.items3.setVisible(false).disableInteractive();
        this.item4 !== null ? this.items4.setVisible(true).clearTint().setInteractive() : this.items4.setVisible(false).disableInteractive();
        this.item5 !== null ? this.items5.setVisible(true).clearTint().setInteractive() : this.items5.setVisible(false).disableInteractive();
        this.item6 !== null ? this.items6.setVisible(true).clearTint().setInteractive() : this.items6.setVisible(false).disableInteractive();
        this.item7 !== null ? this.items7.setVisible(true).clearTint().setInteractive() : this.items7.setVisible(false).disableInteractive();
        this.item8 !== null ? this.items8.setVisible(true).clearTint().setInteractive() : this.items8.setVisible(false).disableInteractive();
        this.item9 !== null ? this.items9.setVisible(true).clearTint().setInteractive() : this.items9.setVisible(false).disableInteractive();

        this.item2_1.setVisible(this.inventory_page2 === true && this.item2_1.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_2.setVisible(this.inventory_page2 === true && this.item2_2.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_3.setVisible(this.inventory_page2 === true && this.item2_3.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_4.setVisible(this.inventory_page2 === true && this.item2_4.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_5.setVisible(this.inventory_page2 === true && this.item2_5.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_6.setVisible(this.inventory_page2 === true && this.item2_6.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_7.setVisible(this.inventory_page2 === true && this.item2_7.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_8.setVisible(this.inventory_page2 === true && this.item2_8.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);
        this.item2_9.setVisible(this.inventory_page2 === true && this.item2_9.texture.key === System.Process.app.ThirdDimension.Inventory3D.currentSelection ? true : false);

        this.item3_1.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_2.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_3.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_4.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_5.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_6.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_7.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_8.setVisible(this.inventory_page2 === true ? true : false);
        this.item3_9.setVisible(this.inventory_page2 === true ? true : false);

        //---------------------inventory_page 1

        if (this.inventory_page1 === true)
        { 
            this.inventory_nextBtnRight.setVisible(true).setActive(true);
            this.inventory_nextBtnLeft.setVisible(false).setActive(false);
            this.inventoryTxt.setVisible(true);
            this.itemsTxts.forEach(i => i.setVisible(false));
            this.itemsButtons2.forEach((i: any) => i.setVisible(false));
            this.itemsButtons.forEach(i => i.setVisible(false));
            this.inventorySubTxt.setVisible(true).setText('Weapons');
            this.weaponButtons.forEach(e => e.setVisible(true));

            //this.updateItemQuantity('weapons', 'weaponTxt');
                
        }

        //------------------------inventory_page 2

        if (this.inventory_page2 === true)
        {

            this.inventory_nextBtnRight.setVisible(false).setActive(false);
            this.inventory_nextBtnLeft.setVisible(true).setActive(true);
            this.itemsButtons2.forEach((i: any) => i.setVisible(false));
            this.weaponsButtons2.forEach((e: any) => e.setVisible(false));
            this.inventoryTxt.setVisible(true);
            this.weaponButtons.forEach(e => e.setVisible(false));
            this.itemsButtons.forEach(i => i.setVisible(false));
            this.weaponTxts.forEach(i => i.setVisible(false));
            this.inventorySubTxt.setVisible(true).setText('Items');

            //item quantities

            //this.updateItemQuantity('items', 'itemsTxt');
                
        }

    }


//------------------------------------------------------------------------------

    public updatePosition (scene: any): void
    {
        setTimeout(()=> {
            
            if (scene.scene.settings.active === true) 
            {
                if (System.Config.isLandscape(scene)) 
                {
                    scene.cameras.main.centerOn(400, 400);
                    
                    scene.ui.setPosition(400, 400).setAngle(90); 

                    scene.inventoryTxt.setPosition(90, 150);
                    scene.inventorySubTxt.setPosition(480, 150); 
                    scene.inventory_nextBtnRight.setPosition(560, 220);
                    scene.inventory_nextBtnLeft.setPosition(490, 220);

                    scene.quitGame.setPosition(230, 370);
                    scene.quitGameButton.setPosition(80, 600);
                    scene.quitNo.setPosition(250, 450);
                    scene.quitYes.setPosition(420, 450);
                    scene.goBack.setPosition(90, 550);	
                    scene.weapons9.setPosition(680, 330);
                    scene.weapons8.setPosition(680, 430);	
                    scene.weapons7.setPosition(680, 530);
                    scene.weapons4.setPosition(490, 330);	
                    scene.weapons5.setPosition(490, 430);
                    scene.weapons6.setPosition(490, 530);
                    scene.weapons3.setPosition(350, 530);
                    scene.weapons2.setPosition(350, 430);
                    scene.weapons1.setPosition(350, 330); 

                    scene.weapons2_9.setPosition(680, 530);	
                    scene.weapons2_4.setPosition(490, 330);	
                    scene.weapons2_5.setPosition(490, 430);	
                    scene.weapons2_6.setPosition(490, 530);	
                    scene.weapons2_3.setPosition(350, 530);	
                    scene.weapons2_2.setPosition(350, 430);	
                    scene.weapons2_1.setPosition(350, 330);

                    scene.weapons3_9.setPosition(680, 530);	
                    scene.weapons3_4.setPosition(490, 330);	
                    scene.weapons3_5.setPosition(490, 430);	
                    scene.weapons3_6.setPosition(490, 530);	
                    scene.weapons3_3.setPosition(350, 530);	
                    scene.weapons3_2.setPosition(350, 430);	
                    scene.weapons3_1.setPosition(350, 330);

                    scene.weaponTxt1.setPosition(380, 340);		
                    scene.weaponTxt2.setPosition(380, 460);	
                    scene.weaponTxt3.setPosition(380, 560);	
                    scene.weaponTxt4.setPosition(520, 360);
                    scene.weaponTxt5.setPosition(520, 460);
                    scene.weaponTxt6.setPosition(520, 560);		
                    scene.weaponTxt7.setPosition(710, 560);	
                    scene.weaponTxt8.setPosition(710, 460);	
                    scene.weaponTxt9.setPosition(710, 360);

                    scene.items1.setPosition(330, 340); 
                    scene.items2.setPosition(450, 340);
                    scene.items3.setPosition(570, 340);
                    scene.items4.setPosition(330, 460);	
                    scene.items5.setPosition(450, 460);
                    scene.items6.setPosition(570, 460);
                    scene.items7.setPosition(330, 580);
                    scene.items8.setPosition(450, 580);	
                    scene.items9.setPosition(570, 580);
                        
                    scene.item2_1.setPosition(330, 340);
                    scene.item2_2.setPosition(450, 340);
                    scene.item2_3.setPosition(570, 340);
                    scene.item2_4.setPosition(330, 460);	
                    scene.item2_5.setPosition(450, 460);	
                    scene.item2_6.setPosition(570, 460);	
                    scene.item2_7.setPosition(330, 580);	
                    scene.item2_8.setPosition(450, 580);	
                    scene.item2_9.setPosition(570, 580);

                    scene.item3_1.setPosition(330, 340);
                    scene.item3_2.setPosition(450, 340);
                    scene.item3_3.setPosition(570, 340);
                    scene.item3_4.setPosition(330, 460);	
                    scene.item3_5.setPosition(450, 460);	
                    scene.item3_6.setPosition(570, 460);	
                    scene.item3_7.setPosition(330, 580);	
                    scene.item3_8.setPosition(450, 580);	
                    scene.item3_9.setPosition(570, 580);

                    scene.itemTxt1.setPosition(370, 360);		
                    scene.itemTxt2.setPosition(490, 360);	
                    scene.itemTxt3.setPosition(610, 360);	
                    scene.itemTxt4.setPosition(370, 480);
                    scene.itemTxt5.setPosition(490, 480);
                    scene.itemTxt6.setPosition(610, 480);		
                    scene.itemTxt7.setPosition(370, 600);	
                    scene.itemTxt8.setPosition(490, 600);	
                    scene.itemTxt9.setPosition(610, 600);
                }
                else
                {    
                    scene.ui.setPosition(400, 580).setAngle(0).setScale(1);

                    scene.inventoryTxt.setPosition(240, 250);
                    scene.inventorySubTxt.setPosition(350, 360);
                    scene.inventory_nextBtnRight.setPosition(490, 380);
                    scene.inventory_nextBtnLeft.setPosition(300, 380);

                    scene.quitGame.setPosition(230, 550);
                    scene.quitGameButton.setPosition(400, 850);
                    scene.quitNo.setPosition(250, 630);
                    scene.quitYes.setPosition(420, 630);
                    scene.goBack.setPosition(210, 850);	

                    scene.weapons1.setPosition(280, 500); 
                    scene.weapons2.setPosition(400, 500);
                    scene.weapons3.setPosition(520, 500);
                    scene.weapons4.setPosition(280, 620);	
                    scene.weapons5.setPosition(400, 620);
                    scene.weapons6.setPosition(520, 620);
                    scene.weapons7.setPosition(280, 750);
                    scene.weapons8.setPosition(400, 750);	
                    scene.weapons9.setPosition(520, 750);
                        
                    scene.weapons2_1.setPosition(280, 500);
                    scene.weapons2_2.setPosition(400, 500);
                    scene.weapons2_3.setPosition(520, 500);
                    scene.weapons2_4.setPosition(280, 620);	
                    scene.weapons2_5.setPosition(400, 620);	
                    scene.weapons2_6.setPosition(520, 620);	
                    scene.weapons2_7.setPosition(280, 750);	
                    scene.weapons2_8.setPosition(400, 750);	
                    scene.weapons2_9.setPosition(520, 750);	

                    scene.weapons3_1.setPosition(280, 500);
                    scene.weapons3_2.setPosition(400, 500);
                    scene.weapons3_3.setPosition(520, 500);
                    scene.weapons3_4.setPosition(280, 620);	
                    scene.weapons3_5.setPosition(400, 620);	
                    scene.weapons3_6.setPosition(520, 620);	
                    scene.weapons3_7.setPosition(280, 750);	
                    scene.weapons3_8.setPosition(400, 750);	
                    scene.weapons3_9.setPosition(520, 750);	
                    
                    scene.weaponTxt1.setPosition(290, 540);		
                    scene.weaponTxt2.setPosition(410, 540);	
                    scene.weaponTxt3.setPosition(530, 540);	
                    scene.weaponTxt4.setPosition(290, 660);
                    scene.weaponTxt5.setPosition(410, 660);
                    scene.weaponTxt6.setPosition(530, 660);		
                    scene.weaponTxt7.setPosition(290, 790);	
                    scene.weaponTxt8.setPosition(410, 790);	
                    scene.weaponTxt9.setPosition(530, 790);

                    scene.items1.setPosition(280, 500); 
                    scene.items2.setPosition(400, 500);
                    scene.items3.setPosition(520, 500);
                    scene.items4.setPosition(280, 620);	
                    scene.items5.setPosition(400, 620);
                    scene.items6.setPosition(520, 620);
                    scene.items7.setPosition(280, 750);
                    scene.items8.setPosition(400, 750);	
                    scene.items9.setPosition(520, 750);
                        
                    scene.item2_1.setPosition(280, 500);
                    scene.item2_2.setPosition(400, 500);
                    scene.item2_3.setPosition(520, 500);
                    scene.item2_4.setPosition(280, 620);	
                    scene.item2_5.setPosition(400, 620);	
                    scene.item2_6.setPosition(520, 620);	
                    scene.item2_7.setPosition(280, 750);	
                    scene.item2_8.setPosition(400, 750);	
                    scene.item2_9.setPosition(520, 750);

                    scene.item3_1.setPosition(280, 500);
                    scene.item3_2.setPosition(400, 500);
                    scene.item3_3.setPosition(520, 500);
                    scene.item3_4.setPosition(280, 620);	
                    scene.item3_5.setPosition(400, 620);	
                    scene.item3_6.setPosition(520, 620);	
                    scene.item3_7.setPosition(280, 750);	
                    scene.item3_8.setPosition(400, 750);	
                    scene.item3_9.setPosition(520, 750);


                    scene.itemTxt1.setPosition(290, 540);		
                    scene.itemTxt2.setPosition(410, 540);	
                    scene.itemTxt3.setPosition(530, 540);	
                    scene.itemTxt4.setPosition(290, 660);
                    scene.itemTxt5.setPosition(410, 660);
                    scene.itemTxt6.setPosition(530, 660);		
                    scene.itemTxt7.setPosition(290, 790);	
                    scene.itemTxt8.setPosition(410, 790);	
                    scene.itemTxt9.setPosition(530, 790);
                } 
            }

        });
    }

    //------------------------------ change pages

    private changePage(page: string): void
    {

        System.Process.app.audio.play('sword_swipe', 0.5, false, this, 0);
        System.Config.vibrate(20);

        switch (page)
        {
            case 'inventory 1':

                this.inventory_page1 = true; 
                this.inventory_page2 = false;  

                System.Process.app.inputs.updatePrompts ([
                    this.inventory_nextBtnRight, 
                    ...this.weaponsButtons3, 
                    this.goBack, 
                    this.quitGameButton
                ]);

            break;

            case 'inventory 2':

                this.inventory_page2 = true;
                this.inventory_page1 = false; 

                System.Process.app.inputs.updatePrompts ([ 
                    this.inventory_nextBtnLeft,
                    ...this.itemsButtons3, 
                    this.goBack, 
                    this.quitGameButton
                ]);

            break;
        }
    }


    //------------------------------- set item


    private setItem (_scene: ENABLE3D.Scene3D, selection: string): void
    {
        System.Process.app.ThirdDimension.Inventory3D.setItem(_scene, selection);
        System.Process.app.audio.play('macaroni_ring', 1, false, this, 0);
    }


    //------------------------------ exit menu


    public exitPause (scene: Phaser.Scene): void
    {
        
        System.Process.app.audio.play('ring_echo', 1.1, false, this, 0);

        System.Config.vibrate(20);
        
        scene.scene.stop('Menu3D');
    }


    //------------------------------ exit main game


    private exitGame (): void
    {

        System.Process.app.audio.play('ring', 0.7, false, this, 0);

        System.Config.vibrate(20);

        System.Process.app.events.quitGame(); 
        
        System.Process.app.ThirdDimension.shutDown(this._scene);

    }

}






