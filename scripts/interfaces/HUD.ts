

//----------------------------------------------------------------------- HUD UI SCENE

import { System } from '../core/Config';



export class HUD extends Phaser.Scene
{

    private _scene: Phaser.Scene

    private meterQuantity: number
    private meterText: Phaser.GameObjects.Text
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
                System.Process.app.ui.equipped[selection[0]].setTexture(selection[1].key);
            
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

    
    }

//--------------------------------------------------------------------------------

    public createMeter(x: number, y: number, subject: string, quantity: number): void
    { 
        System.Process.app.ui.x = x + 10; 
        System.Process.app.ui.y = y + 10;
        this.meterQuantity = quantity;
        this.meterText = this.add.text(x + 80, y - 40, subject, {fontSize: '20px', fontFamily: 'Arial'}).setColor('#000000').setStroke('#ff0000', 4);
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



}

