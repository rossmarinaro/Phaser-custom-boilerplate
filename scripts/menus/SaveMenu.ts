import { System } from '../core/Config';

`use strict`;

export class SaveMenu extends Phaser.Scene {

    private _scene: Phaser.Scene
    private gameSavedTxt: Phaser.GameObjects.Text
    private saveGameTxt: Phaser.GameObjects.Text
    private XButton: Phaser.GameObjects.Sprite

    constructor(){
        super('SaveMenu');
    }

    private create(scene: Phaser.Scene): void
    {   

        this._scene = scene;
        this.scene.pause('Quest');

        this.gameSavedTxt = this.add.text(-1000, -1000, "Game Saved!", {font: "60px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false).setVisible(false).setInteractive().setDepth(100),
        this.saveGameTxt = this.add.text(-1000, -1000, "Save Game?", {font: "60px Digitizer"}).setColor('#FFFF00').setStroke("#ff0000", 4).setShadow(2, 2, '#000000', 1, false).setInteractive()
        .once('pointerdown', ()=>{

            this.saveGameTxt.setVisible(false);
            this.gameSavedTxt.setVisible(true);
            this.XButton.setVisible(false);
            System.Process.app.audio.play('ring_echo', 1.1, false, this, 0);
            System.Process.app.ui.displayMessage('file written.', true); 
            System.Config.vibrate(20);
            
        //save game
            this.save(this._scene.data);

            this.time.delayedCall(2000, ()=> this.exitMenu());
        })
        .on('pointerover', ()=> this.saveGameTxt.setTintFill(0xff0000))
        .on('pointerout', ()=> this.saveGameTxt.clearTint()),

        this.XButton = this.add.sprite(-1000, -1000, 'X_btn_light').setInteractive()
        .on('pointerdown', ()=> this.exitMenu(), false)
        .on('pointerup', ()=> this.XButton.clearTint())
        .on('pointerover', ()=> this.XButton.setTint(0xffff00))
        .on('pointerout', ()=> this.XButton.clearTint());       

        System.Process.app.ui.listen(this, 'PauseMenu', this.updatePosition);

    //menu inputs
							
        System.Process.app.inputs.implementMenuSelections(this, [this.saveGameTxt, this.XButton], scene);

    }

//-------------------------------------- save data

    private async save(data: any): Promise<void>
    {

        System.Process.app.game.gameSaved = true; 

        let player = data.player.self;
        
        this._scene.data['spawnPoint'] = 'totem';
        
        return new Promise(res => {

            data.player.self = null; 
            localStorage.setItem('save', JSON.stringify(data));

            res( 
                System.Process.app.ajax.xhr('save', 'POST', { loggedIn: System.Process.app.account.loggedIn, data })
                    .then((json: JSON) => console.log('SAVED DATA: ', json))
                    .catch((err: Error) => console.log('SAVED TO LOCAL STORAGE. ERROR:', err))
            );
        })
        .then(()=> data.player.self = player);
    }
    

//------------------------------------------------------------------------------

    public updatePosition (scene: Phaser.Scene): void
    {
        setTimeout(()=> {
        
            if (scene.scene.settings.active === true)
            {
                scene['saveGameTxt'].setPosition(System.Config.isLandscape(scene) ? 300 : 250, 400);
                scene['gameSavedTxt'].setPosition(230, 400);
                scene['XButton'].setPosition(200, 400);	
            }
        }, 250);
    }

//------------------------------ exit pause

    private exitMenu (): void
    {
        System.Process.app.audio.play('bloop1', 1, false, this, 0);
        this.scene.get('Controller')['_inputs'].states.select = false;
        this.scene.resume('Quest', this._scene);
        this.scene.stop('SaveMenu');
    }

}



