
/***  TEXT / SCENE UI for text ****/

import { System } from './Config';

export class Text {

    public static texts: number = 0
    public static textContent: string[] = []
    public static color: string = ''
    public static acceptString: string = ''
    public static fontSystem: Object = {
        intro: System.Config.mobileAndTabletCheck() ? '2.4rem' : '3rem',
        game: System.Config.mobileAndTabletCheck() ? '1.7rem' : '3rem',
        select: System.Config.mobileAndTabletCheck() ? '3rem' : '4rem'
    }

//--------------------- reset text array

    public static resetTexts(): void
    {
        Text.textContent = [];
		Text.texts = 0;
    }

//--------------------- set interactive options

    public static async setInteractiveText(scene: Phaser.Scene, text: string, bool: boolean): Promise<string | null>
    {
        const _scene = scene.scene.get('TextUI'),
        
        timeOut = async () => { return new Promise(res => scene.time.delayedCall(2000, () => res(1))); }

        if (_scene['blockOptions'])
            await timeOut();

        return bool ? _scene['showOptions'](scene, text) : null;
    }

//---------------------- output text to ui 

    public static async exec (

        scene: Phaser.Scene, 
        textType: string, 
        content: string, 
        textColor?: string | number, 
        options?: boolean, 
        optionsArray?: string[] | undefined, 
        stage?: string, 
        bool?: boolean

    ): Promise<string>
    {

        if (stage !== undefined && stage !== null)
            textType = 'select';

        this.textContent.push(content);

        scene.scene.run('TextUI', [
            scene, 
            textType, 
            textColor, 
            optionsArray ? options : false, 
            optionsArray ? optionsArray : null
        ]);
       
        scene.time.delayedCall(500, ()=> {

            let isSelectable = textType === 'select' || textType === 'dialog' ? true : false;

            if (isSelectable && stage && bool)
            {
                scene.time.delayedCall(1500, ()=> this.setInteractiveText(scene, stage, bool));
                this.textContent = [];
            }
        });

    //text content

        return content;

    }

    
//------------------------ players's interaction with other characters and options, speech bubble exclamation


    public static async characterInteractionDialog (
        
        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        flipX: boolean, 
        overlap: Phaser.Physics.Arcade.Collider, 
        _message: string, 
        optionsArr?: any, 
        bool?: boolean, 
        stage?: string

    ): Promise<void>
    {

    //clear any text that may be in the array 
    
        Text.resetTexts();

        System.Process.app.game.interact = true;

        if (overlap !== null)
        {
            overlap.active = false;
            System.Process.app.physics.collisions.blockCollideCallback(overlap);
        }

    //is this text related to selections?

        const options =  optionsArr !== null ? true : false,
            message = _message + '                                       ',
            speechBub = scene.add.sprite(x, y, 'speech_bub').play('speech_bub_anims').setFlipX(flipX).setDepth(y + 1),
            txt = scene.add.text(speechBub.x, speechBub.y - 30, `!`, { font: "90px Digitizer"}).setColor('#000000').setDepth(y + 2);
        
        if (optionsArr === null)
            optionsArr = [];

        System.Process.app.text.exec(scene, 'dialog', message, null, options, optionsArr, stage, bool);

        scene.time.delayedCall(3000, ()=> {

            let fade = scene.tweens.add({
                targets: [speechBub, txt], alpha: { value: 0, ease: 'Power1', duration: 1000 }, repeat: 0, 
                onComplete: ()=> {

                    speechBub.destroy();
                    txt.destroy();
                    fade.remove();

                    if (overlap !== null)
                        overlap.active = true;

                    System.Process.app.game.interact = false;
                }
            });
        });
    }
    
} 

//---------------------------------------------------- Text UI 


export class TextUI extends Phaser.Scene {

    public blockOptions: boolean 
    public textYes: Phaser.GameObjects.Text
    public textNo: Phaser.GameObjects.Text
    public textOpA: Phaser.GameObjects.Text
    public textOpB: Phaser.GameObjects.Text
    public textOpC: Phaser.GameObjects.Text

    private _scene: Phaser.Scene
    private avatar: Phaser.GameObjects.Image
    private textOutput: Phaser.GameObjects.Text
    private txtGraphics: Phaser.GameObjects.Graphics
    private fadeOutDialog: Phaser.Tweens.Tween
    private options: boolean
    private textType: string
    private optionsArray: string[]
    private eventTyping: any
    private textToShow: string
    private messageToShow: string
    private txt: any 

    constructor(){
        super('TextUI');
    }


    private create([scene, textType, textColor, options, optionsArray]): void
    {   
        this._scene = scene;
        this.options = options;
        this.textType = textType;
        this.optionsArray = optionsArray;
        this.eventTyping = undefined;
        this.textToShow = "";
        this.messageToShow = "";
        this.txt = null; 
        this.blockOptions = false;

    // avatar

        this.avatar = this.add.image(20, 50, `avatar_player_${textColor}`).setVisible(false); 

    // text showing the message
    
        switch(textType)
        {
            case 'intro' : this.textOutput = this.add.text((5 / 100) * this.cameras.main.width, 0, "", { font: `${System.Process.app.text.fontSystem.intro} Bangers`, wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(4, 4, '#000000', 1, false).setDepth(2); break;
            case 'dialog' : case 'select' : this.textOutput = this.add.text((5 / 100) * this.cameras.main.width, 0, "", { font: `${System.Process.app.text.fontSystem.game} Bangers`, wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor('#ffffff').setStroke('#000000', 5).setDepth(2); break;
            case 'multiplayer' : 
                    this.textOutput = this.add.text(this.avatar.x + 50, this.avatar.y, "", { fontSize: `${System.Process.app.text.fontSystem.game}`, wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor(textColor).setStroke('#000000', 5).setDepth(2); 
                //show avatar of other players
                    if (textColor !== null && !textColor.startsWith('#'))
                        this.avatar.setVisible(true);
            break;
        }

        this.txtGraphics = this.add.graphics();
        this.txtGraphics.fillStyle(0x1f317d, 0.6);
        this.txtGraphics.fillRect(200, 400, 500, 110).setVisible(false);

    // fade out text

        this.fadeOutDialog = this.tweens.add({targets: this.textOutput, alpha: 0, duration: 1500, ease: 'Power1', onComplete: ()=> this.textOutput.visible = false}).pause();

    // start sequence

        this.showDialogue(this.txt);
    } 

    //---------------------------------------
 
    public update(): void
    {
        System.Config.isPortrait(this) || this.cameras.main.height > this.cameras.main.width ? 
            this.textOutput.setY(50) : this.textOutput.setY(0);

        // if (this.optionsArray !== null && this.scene.isActive('PauseMenu') && System.Process.app.game.fightBoss === false) //close if paused
        // {
        //     System.Process.app.game.cutScene = false; 
        //     this.blockOptions = false;
        //     this.scene.stop('TextUI');
        // }
    }

    //-------------------------------------------show options

    public showOptions (scene: Phaser.Scene, text: string): void 
    {
        if (this.blockOptions === true)
        {
            this.scene.stop('TextUI');
            return;
        }

        System.Process.app.game.cutScene = true;

        if (this.textType === 'select') //if entering new map
        {
            
            this.textYes = this.add.text((35 / 100) * this.scale.width, this.scale.height / 2, "Yes", { font: '50px Bangers', wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(4, 4, '#000000', 1, false).setDepth(2).setInteractive()
            .on('pointerdown', () =>{
                System.Process.app.events.ee.emit('game', System.Process.app.text.acceptString);  
                this.time.delayedCall(800, ()=> this.scene.stop('TextUI'));
            });
            this.textNo = this.add.text((65 / 100) * this.scale.width, this.scale.height / 2, "No", { font: '50px Bangers', wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(4, 4, '#000000', 1, false).setDepth(2).setInteractive()
            .on('pointerdown', () => {
                System.Process.app.game.cutScene = false;
                this.options = false;
                this.time.delayedCall(800, ()=> this.scene.stop('TextUI'));
            });
            System.Process.app.text.textContext = scene;
            System.Process.app.text.acceptString = text;
        }

        else if (this.optionsArray !== null) //if dialog
        {

            this.textOpA = this.add.text((25 / 100) * this.scale.width, this.scale.height / 1.5, this.optionsArray[0], { font: '50px Bangers', wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(4, 4, '#000000', 1, false).setDepth(2).setInteractive()
            .on('pointerdown', () =>{
                System.Process.app.game.cutScene = false;
                this.options = false;
                System.Process.app.events.ee.emit('dialog', true);
                this.time.delayedCall(800, ()=> this.scene.stop('TextUI'));
            });

            this.textOpB = this.add.text((25 / 100) * this.scale.width, this.scale.height / 2, this.optionsArray[1], { font: '50px Bangers', wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(4, 4, '#000000', 1, false).setDepth(2).setInteractive()
            .on('pointerdown', () =>{
                System.Process.app.game.cutScene = false;
                this.options = false;
                System.Process.app.events.ee.emit('dialog', false);
                this.time.delayedCall(800, ()=> this.scene.stop('TextUI'));
            });

        //optional third param

            if (this.optionsArray[2] !== 'undefined')
            {
                this.textOpC = this.add.text((28 / 100) * this.scale.width, this.textOpB.y - 100, this.optionsArray[2], { font: '50px Bangers', wordWrap: { width: this.scale.width - (10 / 100) * this.scale.width, useAdvancedWrap: true}, align: 'left'}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(4, 4, '#000000', 1, false).setDepth(2).setInteractive()
                .on('pointerdown', () =>{
                    System.Process.app.game.cutScene = false;
                    this.options = false;
                    System.Process.app.events.ee.emit('dialog', null);
                    this.time.delayedCall(800, ()=> this.scene.stop('TextUI'));
                });
            }
        }

        //menu inputs
							
            System.Process.app.inputs.implementMenuSelections(
            this, 
            [             
                this.textYes,
                this.textNo,
                this.textOpA,
                this.textOpB,
                this.textOpC
            ], 
            scene.scene.get('Modal')
        );
    
    }

    //------------------------------------------message

    private hideDialogue (): void
    { 
        //hide the current dialogue or goes to the next one in a sequential dialog, increment text output

        System.Process.app.text.texts++; 
        this.showDialogue(this.txt);     
      
        if (System.Process.app.text.texts >= System.Process.app.text.textContent.length) 
        {
            System.Process.app.text.texts = 0;    
            //let textId = System.Process.app.text.textContent.join(' '); 
            System.Process.app.text.textContent = []; 
            this.fadeOutDialog.play(); 

            if (this.options === false)
                this.scene.stop('TextUI');
            //console.log(`texts: ${System.Process.app.text.texts}`, `content array ${System.Process.app.text.textContent}`, this.textId);
        } 
    }

    //------------------------------------shows the dialogue window with a specific message

    private showDialogue (text: string): void 
    { 
        text = System.Process.app.text.textContent[System.Process.app.text.texts];

        if (text != null)
        {
            let i = 0;

            this.messageToShow = text;
            this.textToShow = ``;
            this.textOutput.text = this.textToShow;
            
            if (this.eventTyping !== undefined) 
                this.eventTyping.remove(false); 

            this.eventTyping = this.time.addEvent(
                { 
                    delay: 50, args: [text], repeat: text.length - 1,
                    callback: (text: any): void => {
                        this.textToShow += text[i]
                        this.textOutput.text = this.textToShow;
                        i++;
                }
            });
            this.time.addEvent({ 
                args: [text], delay: text.length * 50 + 500,
                callback: () => this.hideDialogue()
            });
        }
        else if (this.options === false || this.blockOptions === true)
            this.scene.stop('TextUI');
       
    }


}








