//------------------------- BASE UI CLASS

import { System } from '../core/Config'


export class UI {

    public x: number
    public y: number
    public ammoTextQuantity: number
    public PI: Phaser.GameObjects.Graphics[] 
    public PI2: Phaser.GameObjects.Graphics[] 
    public smallGraphics1: Phaser.GameObjects.Graphics 
    public smallGraphics2: Phaser.GameObjects.Graphics 
    public largeGraphics1: Phaser.GameObjects.Graphics
    public largeGraphics2: Phaser.GameObjects.Graphics
    public hpIcons: Phaser.GameObjects.Image[] 
    public healthBar: Phaser.GameObjects.Image 
    public hp1: Phaser.GameObjects.Image 
    public hp2: Phaser.GameObjects.Image 
    public hp3: Phaser.GameObjects.Image 
    public hp4: Phaser.GameObjects.Image 
    public hp5: Phaser.GameObjects.Image 
    public hp6: Phaser.GameObjects.Image 
    public hp7: Phaser.GameObjects.Image  
    public hp8: Phaser.GameObjects.Image 
    public hp9: Phaser.GameObjects.Image 
    public hp10: Phaser.GameObjects.Image  
    public healthText: Phaser.GameObjects.Text
    public lowHealthText: Phaser.GameObjects.Text
    public pickedUpText: Phaser.GameObjects.Text
    public ammoText: Phaser.GameObjects.Text
    public completedTextQuant: Phaser.GameObjects.Text
    public doughQuantity: Phaser.GameObjects.Text
    public equipped : any
    public quantities: any


    //---------------------------------------

    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.equipped = {
            A: null,
            B: null,
            C: null,
            D: null
        };
        this.quantities = {
            A: null,
            B: null,
            C: null,
            D: null
        };
    }
    
//--------------------------------------- player interfaces

    public init(ui: Phaser.Scene, scene: Phaser.Scene): void
    { 

        this.hpIcons = [this.hp1, this.hp2, this.hp3, this.hp4, this.hp5, this.hp6, this.hp7, this.hp8, this.hp9, this.hp10];

    ////text box
        this.smallGraphics1 = ui.add.graphics({fillStyle: {color: 0xB50003, alpha: 0.8}}).fillRoundedRect(10, 5, 340, 170, 20);
        this.smallGraphics2 = ui.add.graphics({lineStyle: {width: 3, color: 0xffff00, alpha: 0.95}}).strokeRoundedRect(10, 5, 340, 170, 20);
        this.PI = [this.smallGraphics1, this.smallGraphics2];

    ////large textbox

        this.largeGraphics1 = ui.add.graphics({fillStyle: {color: 0xB50003, alpha: 0.8}}).fillRoundedRect(360, 5, 375, 170, 20);
        this.largeGraphics2 = ui.add.graphics({lineStyle: {width: 3, color: 0xffff00, alpha: 0.95}}).strokeRoundedRect(360, 5, 375, 170, 20);
        this.PI2 = [this.largeGraphics1, this.largeGraphics2];

        //health text

            this.healthText = ui.add.text(135, 20, 'Health', {fontSize: '25px', fontFamily: 'Digitizer'}).setColor('#ffff00').setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);
            
        ////low health

            this.lowHealthText = ui.add.text(135, 20, 'Health', {fontSize: '25px', fontFamily: 'Digitizer'}).setColor('#ff0000').setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);

            this.healthBar = ui.add.image(180, 80, 'meter_interface');
            this.hp1 = ui.add.image(45, 80, 'health_bar');
            this.hp2 = ui.add.image(75, 80, 'health_bar');
            this.hp3 = ui.add.image(105, 80, 'health_bar');
            this.hp4 = ui.add.image(135, 80, 'health_bar');
            this.hp5 = ui.add.image(165, 80, 'health_bar');
            this.hp6 = ui.add.image(195, 80, 'health_bar');
            this.hp7 = ui.add.image(225, 80, 'health_bar');
            this.hp8 = ui.add.image(255, 80, 'health_bar');
            this.hp9 = ui.add.image(285, 80, 'health_bar');
            this.hp10 = ui.add.image(315, 80, 'health_bar');
            this.hpIcons = [this.hp1, this.hp2, this.hp3, this.hp4, this.hp5, this.hp6, this.hp7, this.hp8, this.hp9, this.hp10];
              
            //// game completed

                ui.add.text(25, 125, 'Complete:', {fontSize: '20px', fontFamily: 'Digitizer'}).setColor('#ffff00').setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);
                
                this.completedTextQuant = ui.add.text(140, 127, scene.data['completed'], {fontSize: '21px', fontFamily: 'Digitizer'}).setColor('#ff0000').setStroke('#ffff00', 4).setShadow(2, 2, '#000000', 1, false);
            
            ////dough

                ui.add.text(200, 125, 'Dough:', {fontSize: '20px', fontFamily: 'Digitizer'}).setColor('#ffff00').setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);
            
            ////dough quantity

                this.doughQuantity = ui.add.text(280, 127, `$${scene.data['doughAvailable']}`, {fontSize: '21px', fontFamily: 'Digitizer'}).setColor('#ff0000').setStroke('#ffff00', 4).setShadow(2, 2, '#000000', 1, false); 
            
            ////equipped

                ui.add.text(490, 20, 'Equipped', {fontSize: '25px', fontFamily: 'Digitizer'}).setColor('#ffff00').setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);
                
                ui.add.graphics({fillStyle: {color: 0xffff00, alpha: 1}}).fillRect(374, 65, 350, 90);
                
                ui.add.graphics({fillStyle: {color: 0xB50003, alpha: 1}}).fillRect(382, 70, 80, 80);
                ui.add.graphics({fillStyle: {color: 0xB50003, alpha: 1}}).fillRect(467, 70, 80, 80);
                ui.add.graphics({fillStyle: {color: 0xB50003, alpha: 1}}).fillRect(552, 70, 80, 80);
                ui.add.graphics({fillStyle: {color: 0xB50003, alpha: 1}}).fillRect(637, 70, 80, 80);

                ui.add.sprite(420, 110, 'equipment_icon_overlay');
                ui.add.sprite(505, 110, 'equipment_icon_overlay');
                ui.add.sprite(595, 110, 'equipment_icon_overlay');
                ui.add.sprite(677, 110, 'equipment_icon_overlay');

            ////equipped

                this.equipped.C = ui.add.sprite(423, 110, scene.data['selects'].C.key).setScale(0.65);  
                this.equipped.D = ui.add.sprite(507, 110, scene.data['selects'].D.key).setScale(0.65);
                this.equipped.A = ui.add.sprite(592, 110, scene.data['selects'].A.key).setScale(0.65);
                this.equipped.B = ui.add.sprite(675, 110, scene.data['selects'].B.key).setScale(0.65);

            ////equipment quantities

                this.quantities.C = ui.add.text(413, 120, '', {fontSize: '18px', fontFamily: 'Digitizer'}).setColor('#ff0000').setStroke('#ffff00', 4).setShadow(2, 2, '#000000', 1, false); 
                this.quantities.D = ui.add.text(497, 120, '', {fontSize: '18px', fontFamily: 'Digitizer'}).setColor('#ff0000').setStroke('#ffff00', 4).setShadow(2, 2, '#000000', 1, false); 
                this.quantities.A = ui.add.text(582, 120, '', {fontSize: '18px', fontFamily: 'Digitizer'}).setColor('#ff0000').setStroke('#ffff00', 4).setShadow(2, 2, '#000000', 1, false); 
                this.quantities.B = ui.add.text(665, 120, '', {fontSize: '18px', fontFamily: 'Digitizer'}).setColor('#ff0000').setStroke('#ffff00', 4).setShadow(2, 2, '#000000', 1, false); 


        /////alert text for item picked up

            this.pickedUpText = ui.add.text(100, System.Process.app.scale.height / 1.3, ``, {fontSize: '40px', fontFamily: 'Bangers'}).setColor('#ffff00').setShadow(3, 2, '#000000', 1, false).setVisible(false);
     
    }

//---------------------- display message 


    public displayMessage(message: string, bool: boolean, isDesktop: boolean): void
    {

    ///true: native toast, false: xml toast (android only)

        let cordova = window['cordova'];

        if (cordova !== undefined && cordova !== 'undefined') 
            cordova.plugins.hello.showToast([message, bool]);

        else if (isDesktop) 
            alert(message);
    }

//-----------------------------------------------------------

    public listen (scene: Phaser.Scene, key: string, callback?: Function): void
    {
   
        const 
            _resize = (scene: Phaser.Scene, key: string) => {

                scene.scene.settings.visible = false;   //disable scene visibility / call resize method
                    
                System.Process.app.ui.resize(scene, key);
                if (callback)
                    callback(scene);
            },
            _resizeCheck = (scene: Phaser.Scene, key: string) => {
                if (scene.scene.settings.active) 
                    _resize(scene, key);
            };

        _resize(scene, key);

        scene.scale.on('resize', ()=> _resizeCheck(scene, key), scene);
        screen.orientation?.addEventListener('change', ()=> _resizeCheck(scene, key), false);
        screen.orientation?.addEventListener('webkitfullscreenchange', ()=> _resizeCheck(scene, key), false);
    }

    //-------------------------------------------------------------

    public resize(scene: Phaser.Scene, key: string): void
    {
    
        const orientation = this.checkOrientation(scene, key); 

        if (!orientation)
            return;
        
        scene['GAME_WIDTH'] = orientation[0];
        scene['GAME_HEIGHT'] = orientation[1];
        
        this.callSizer(scene);

        setTimeout(async ()=> {

            const position: any = await this.getPosition(scene, key);

            if (position)
                this.setCamera(scene, position[0], position[1], position[2]);

        }, 300);
    }

    
//-----------------------------------------------------------

    private callSizer (scene: Phaser.Scene): Phaser.Structs.Size | any
    {
        return (
            scene['parent'] = new Phaser.Structs.Size(scene.scale.gameSize.width, scene.scale.gameSize.height).setSize(scene.scale.gameSize.width, scene.scale.gameSize.height),
            scene['sizer'] = new Phaser.Structs.Size(scene['GAME_WIDTH'], scene['GAME_HEIGHT'], Phaser.Structs.Size.FIT, scene['parent']).setSize(scene.scale.gameSize.width, scene.scale.gameSize.height)
        );
    }

//-----------------------------------------------------------

    private checkOrientation (scene: Phaser.Scene, key: string): [number, number] | undefined
    {
        switch (key)
        {
            case 'Preload': 
                return[
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1400 : scene.scale.width,
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1800 : scene.scale.height
                ];
            case 'Controller':
                return[scene.scale.width, scene.scale.height]; 
            case 'Modal':
                return [450, 800];
            case 'Mini':
                return [800, 1200];
            case 'Shop':
                return [800, 1100];
            case 'HUD':
                return[
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1400 : 740,
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 1800 : 960
                ];
            case 'PauseMenu':
                if (!System.Config.isDesktop(scene))
                    return System.Config.isLandscape(scene) ? [1700, 1200] : [800, 1200];
                else 
                    return [2200, 980];
        }
    }


//------------------------------------------------------------

    private async getPosition (scene: Phaser.Scene, key: string): Promise<[number, number, boolean] | undefined>
    {
        switch(key)
        {
            case 'Controller': case 'Mini': case 'Shop':
                return[scene['GAME_WIDTH'] / 2, scene['GAME_HEIGHT'] / 2, false];
            case 'Preload': 
                if (System.Config.isDesktop(scene))
                    return[scene['GAME_WIDTH'] / 2, scene['GAME_HEIGHT'] / 3.5, false];
                else
                    return[
                        System.Config.isLandscape(scene) ? 180 : scene['GAME_WIDTH'] / 2, 
                        System.Config.isLandscape(scene) ? scene['GAME_HEIGHT'] / 2 : scene['GAME_HEIGHT'] / 3.5, 
                        false
                    ];
            case 'Modal': 
                    return[
                        System.Config.isDesktop(scene) ? 200 : scene['GAME_WIDTH'] / 2, 
                        System.Config.isDesktop(scene) ? scene['GAME_HEIGHT'] / 2 : scene['GAME_HEIGHT'] / 2.5, 
                        false
                    ];
            case 'HUD':
                return[
                    !System.Config.isDesktop(scene) && System.Config.isLandscape(scene) ? 
                    scene['GAME_WIDTH'] / 3.5 : scene['GAME_WIDTH'] / 2, scene['GAME_HEIGHT'] / 2,
                    false
                ];
            case 'PauseMenu':
                if (System.Config.isLandscape(scene))
                    return[
                        !System.Config.isDesktop(scene) ? 420 : 30, 
                        !System.Config.isDesktop(scene) ? 650 : scene['GAME_HEIGHT'] / 2.4, 
                        !System.Config.isDesktop(scene) ? false : true
                    ];
                else                 
                    return[
                        scene['GAME_WIDTH'] / 2, 
                        !System.Config.isDesktop(scene) ? scene['GAME_HEIGHT'] / 2.5 : scene['GAME_HEIGHT'] / 2, 
                        false
                    ];
        }
    }

//-------------------------------------------------------------

    private setCamera (scene: Phaser.Scene, x: number, y: number, pos: boolean): void
    {
        if (pos === true)
        {
            let posX = System.Config.isDesktop(scene) ? 40 : scene['GAME_HEIGHT'] > 400 ? 140 : scene['GAME_WIDTH'] / 2 - 150;

            scene.cameras.main.setPosition(posX, screenTop /* - 150 */)  

            if (!System.Config.isDesktop(scene))
                scene.cameras.main.setZoom(
                    Math.min(
                        scene['sizer'].width / scene['GAME_WIDTH'], 
                        scene['sizer'].height / scene['GAME_HEIGHT']
                    )
                );
        }
        else 
        {
            if (scene.cameras.main)
                scene.cameras.main
                    .setViewport(Math.ceil((scene['parent'].width - scene['sizer'].width) * 0.5), screenTop, scene['sizer'].width, scene['sizer'].height)
                    .setZoom(Math.max(scene['sizer'].width / scene['GAME_WIDTH'], scene['sizer'].height / scene['GAME_HEIGHT']))
                    .centerOn(x, y);
        }

    //make scene visible
    
        scene.scene.settings.visible = true;
    }



}

