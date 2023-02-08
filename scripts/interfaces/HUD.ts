

//----------------------------------------------------------------------- HUD UI SCENE

import { System } from '../core/Config';



export class HUD extends Phaser.Scene
{

    private _scene: Phaser.Scene

    private meterQuantity: number
    private meterText: Phaser.GameObjects.Text
    private usersOnline: Phaser.GameObjects.Text
    private progressBox: Phaser.GameObjects.Graphics
    private progressBox2: Phaser.GameObjects.Graphics
    private progressBarGraphics: Phaser.GameObjects.Graphics

    constructor (){
        super('HUD');
    }
    
    private create (_scene: Phaser.Scene): void
    {  
        this._scene = _scene; 

        System.Process.app.ui.init(this, this._scene);
        System.Process.app.ui.listen(this, 'HUD');

    //// multiplayer 
        if (System.Process.app.game.multiPlayer.isPlaying === true) 
            fetch('checkCap-BRAWL', System.Process.app.ajax.request('GET', null))
                .then(obj => obj.json())
                .then(data => this.deathMatch(System.Process.app.game.multiPlayer.username, data.spawns));

    }

    
//------------------------------- item emoji


    public createEmojiPopup(scene: Phaser.Scene, x: number, y: number): void
    {
        let emoji = scene.physics.add.sprite(x, y, 'ayokay_emoji').setVelocityY(-150);
        scene.time.delayedCall(1500, ()=> emoji.destroy());
    }



//---------------------------------------------------------------------------- update
   

    public async update(): Promise<void>
    {

        if (System.Process.app.game.gameState === false)
            return;
        
    //---------- update texture images of inventory 

        let selection: any;

        for (selection of Object.entries(this._scene.data['selects']))
        {
            if(selection[1].key !== undefined && selection[1].key !== null)
            {
                if (selection[1].key.substr(0, 16) === 'pastaform_weapon')
                {
                    let key = selection[1].key.substr(0, 16),
                        frame = selection[1].key.substr(17, 21);
                    System.Process.app.ui.equipped[selection[0]].setTexture(key, frame);
                } 
                else
                    System.Process.app.ui.equipped[selection[0]].setTexture(selection[1].key);
            }
            else if (selection[1].key === null && System.Process.app.ui.equipped[selection[0]] !== undefined) //set invisible
                System.Process.app.ui.equipped[selection[0]].setVisible(false);
        }
  
    //-------- equipped item quantities

        for (const [key, val] of Object.entries(System.Process.app.ui.equipped))
        {
            const quantityText = System.Process.app.ui.quantities[key],
                  quantity = await System.Process.app.inventory.assignItemQuantity(val);

            if (val instanceof Phaser.GameObjects.Sprite)
                val.setVisible(
                    val.texture.key === '__MISSING' || 
                    (quantity <= 0 && System.Process.app.inventory.disposableInventory.includes(val) 
                ) ? false : true); 
            
            if (quantityText)
                quantityText.setText(quantity);
        
        }

    //--------- game completed

        if (System.Process.app.ui.completedTextQuant)
            System.Process.app.ui.completedTextQuant.setText(`${System.Process.app.dataManager.completed.toFixed(0)}%`);


    //------------ dough

        if (System.Process.app.ui.doughQuantity)
            System.Process.app.ui.doughQuantity.setText(this._scene.data['doughAvailable']);
        
        if (this._scene.data['doughAvailable'] <= 0 && System.Process.app.ui.doughQuantity) 
            System.Process.app.ui.doughQuantity.setText(`$`+ 0);
        if (this._scene.data['doughAvailable'] > 500 && System.Process.app.ui.doughQuantity) 
            System.Process.app.ui.doughQuantity.setText(`$`+ 500);
        else if (System.Process.app.ui.doughQuantity)
            System.Process.app.ui.doughQuantity.setText(`$${this._scene.data['doughAvailable']}`);

               
    //// health
        
        switch (this._scene.data['healthScore'] >= 1)
        {
            case this._scene.data['healthScore'] >= 11 : this._scene.data['healthScore'] = 10;
            break;
            case this._scene.data['healthScore'] === 10 :  System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint()); break;
            case this._scene.data['healthScore'] === 9 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 8 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp9.setTint(0x000000);
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 7 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp8.setTint(0x000000);
                System.Process.app.ui.hp9.setTint(0x000000);
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 6 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp7.setTint(0x000000);
                System.Process.app.ui.hp8.setTint(0x000000);
                System.Process.app.ui.hp9.setTint(0x000000);
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 5 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp6.setTint(0x000000);
                System.Process.app.ui.hp7.setTint(0x000000);
                System.Process.app.ui.hp8.setTint(0x000000);
                System.Process.app.ui.hp9.setTint(0x000000);
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 4 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp5.setTint(0x000000);
                System.Process.app.ui.hp6.setTint(0x000000);
                System.Process.app.ui.hp7.setTint(0x000000);
                System.Process.app.ui.hp8.setTint(0x000000);
                System.Process.app.ui.hp9.setTint(0x000000);
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 3 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp4.setTint(0x000000);
                System.Process.app.ui.hp5.setTint(0x000000);
                System.Process.app.ui.hp6.setTint(0x000000);
                System.Process.app.ui.hp7.setTint(0x000000);
                System.Process.app.ui.hp8.setTint(0x000000);
                System.Process.app.ui.hp9.setTint(0x000000);
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 2 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.clearTint());
                System.Process.app.ui.hp3.setTint(0x000000);
                System.Process.app.ui.hp4.setTint(0x000000);
                System.Process.app.ui.hp5.setTint(0x000000);
                System.Process.app.ui.hp6.setTint(0x000000);
                System.Process.app.ui.hp7.setTint(0x000000);
                System.Process.app.ui.hp8.setTint(0x000000);
                System.Process.app.ui.hp9.setTint(0x000000);
                System.Process.app.ui.hp10.setTint(0x000000);
            }
            break;
            case this._scene.data['healthScore'] === 1 :
            {
                System.Process.app.ui.hpIcons.forEach((e: Phaser.GameObjects.Image) => e.setTint(0x000000));
                System.Process.app.ui.hp1.clearTint();
            }
        }    
        if (this._scene.data['healthScore'] <= 3) 
        {
            System.Process.app.ui.lowHealthText.setVisible(true); 
            System.Process.app.ui.healthText.setVisible(false);
        }
        if (this._scene.data['healthScore'] >= 4) 
        {
            System.Process.app.ui.lowHealthText.setVisible(false); 
            System.Process.app.ui.healthText.setVisible(true);
            System.Process.app.ui.hp1.clearTint();
            System.Process.app.ui.hp2.clearTint();
            System.Process.app.ui.hp3.clearTint();
        }

    
    }

//------------------------------------------------------------------------ picked up item

    public pickedUpItem(notification: string, success: boolean): void
    {
        if (!this.scene.settings.active)
            return;

        let showText = true;
        System.Process.app.ui.pickedUpText.setText(notification).setVisible(true);

        this.time.delayedCall(3000, ()=> {

            if (!showText)
                return;

            showText = false;
            System.Process.app.ui.pickedUpText.setVisible(false);

        });
        if (success === true)
        {
            System.Process.app.audio.play('ring', 0.5, false, this, []); 
            System.Process.app.audio.play('sick', 1, false, this, []);
        }
    }

//--------------------------------------------------------------------------------

    public createMeter(x: number, y: number, subject: string, quantity: number): void
    { 
        System.Process.app.ui.x = x + 10; 
        System.Process.app.ui.y = y + 10;
        this.meterQuantity = quantity;
        this.meterText = this.add.text(x + 80, y - 40, subject, {fontSize: '20px', fontFamily: 'Digitizer'}).setColor('#000000').setStroke('#ff0000', 4);
        this.progressBox = this.add.graphics().fillStyle(0xffff00, 1).fillRoundedRect(x, y, 250, 60);
        this.progressBox2 = this.add.graphics().fillStyle(0xff0000, 1).fillRoundedRect(System.Process.app.ui.x, System.Process.app.ui.y, 230, 40);
        this.progressBarGraphics = this.add.graphics().fillRoundedRect(System.Process.app.ui.x, System.Process.app.ui, x, y);
    }
    
//--------------------------------------------------------------------------------

    public decrementMeter(health: number): void
    {   
        let _10percent = Phaser.Math.Between(1, (10 / 100) * this.meterQuantity),
            _20percent = Phaser.Math.Between((11 / 100) * this.meterQuantity, (20 / 100) * this.meterQuantity), 
            _30percent = Phaser.Math.Between((21 / 100) * this.meterQuantity, (30 / 100) * this.meterQuantity), 
            _40percent = Phaser.Math.Between((31 / 100) * this.meterQuantity, (40 / 100) * this.meterQuantity), 
            _50percent = Phaser.Math.Between((41 / 100) * this.meterQuantity, (50 / 100) * this.meterQuantity),
            _60percent = Phaser.Math.Between((51 / 100) * this.meterQuantity, (60 / 100) * this.meterQuantity),
            _70percent = Phaser.Math.Between((61 / 100) * this.meterQuantity, (70 / 100) * this.meterQuantity),
            _80percent = Phaser.Math.Between((71 / 100) * this.meterQuantity, (80 / 100) * this.meterQuantity),
            _90percent = Phaser.Math.Between((81 / 100) * this.meterQuantity, (90 / 100) * this.meterQuantity),

    // calc percent

        calcPercent = (x: number, y: number, w: number, h: number) =>{

            this.progressBarGraphics.clear();
            this.progressBox2.setVisible(false); 
            this.progressBarGraphics.fillStyle(0xff0000, 1).fillRoundedRect(x, y, w, h);
        }
    

    // update meter

        switch(health)
        {
            case _90percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 220, 40); break;
            case _80percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 200, 40); break;
            case _70percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 180, 40); break;
            case _60percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 140, 40); break;
            case _50percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 120, 40); break;
            case _40percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 100, 40); break;
            case _30percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 80, 40); break;
            case _20percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 40, 40); break;
            case _10percent: calcPercent(System.Process.app.ui.x, System.Process.app.ui.y, 20, 40); break;
        }; 
        if (health <= 0 && System.Process.app.game.gameState === true)
            this.destroyMeter();
    }

//-----------------------------------------------------------------------------------------

    private destroyMeter(): void
    {
        this.progressBarGraphics.destroy();
        this.progressBox.destroy();
        this.progressBox2.destroy();
        this.meterText.destroy();
    }

//--------------------------------------------------------------------------- multiplayer

    public deathMatch(username: string, users: number): void
    {
        this.add.text(50, 180, 'ONLINE: ', {font: "25px Digitizer"}).setColor('#ffff00').setStroke("#ff0000", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);
        this.usersOnline = this.add.text(150, 180, users.toString(), {font: "25px Digitizer"}).setColor('#ffff00').setStroke("#ff0000", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', 1, false);
//        System.Process.app.events.socket.on('players online', _users => this.usersOnline.setText(_users));
//        System.Process.app.events.socket.on('new player', client => this.usersOnline.setText(client.Spawns.length));
        // this.colors = [
        //     this.red = this.add.text(100, 120, '', {font: "30px Digitizer", fill: '#ff0000'}).setStroke("#ffffff", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', true, false),
        //     this.orange = this.add.text(150, 120, '', {font: "30px Digitizer", fill: '##FF9100'}).setStroke("#ffffff", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', true, false),
        //     this.yellow = this.add.text(200, 120, '', {font: "30px Digitizer", fill: '#ffff00'}).setStroke("#ffffff", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', true, false),
        //     this.green = this.add.text(250, 120, '', {font: "30px Digitizer", fill: '#00ff00'}).setStroke("#ffffff", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', true, false),
        //     this.blue = this.add.text(300, 120, '', {font: "30px Digitizer", fill: '#0000FF'}).setStroke("#ffffff", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', true, false),
        //     this.indigo = this.add.text(350, 120, '', {font: "30px Digitizer", fill: '#A700FF'}).setStroke("#ffffff", 4).setStroke('#000000', 4).setShadow(2, 2, '#000000', true, false),
        //     this.violet = this.add.text(400, 120, '', {font: "30px Digitizer", fill: '#7C00FF'}).setStroke("#ffffff", .setStr0000'#ffff00', 4)4).setShadow(2, 2, '#000000', true, false)
        // ];
        // System.Process.app.events.socket.on('new player', client =>{
        //     this.colors.forEach(color => { 
        //         if (client.skin === color.fill) color.setText(client.name);
        //     });
        // });
        // System.Process.app.events.socket.on('current players', client => {
        //     this.colors.forEach(color => {
        //         if (client.skin === color.fill) color.setText(client.name);
        //     });
        // });
        // this.colors.forEach(color => {
        //     if (client.skin === color.fill) color.setText(username);
        // });
        //this.add.text(100, 120, username, {font: "30px Digitizer", fill: System.Process.app.game.player.self.color}).setStroke("#ffffff", .setStr0000'#ffff00', 4)4).setShadow(2, 2, '#000000', true, false)
    }

}

