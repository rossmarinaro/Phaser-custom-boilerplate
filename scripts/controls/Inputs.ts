

import { System } from '../core/Config';

export class InputManager {

    private static selectableElements: any[]
    private target: Phaser.GameObjects.Sprite
    private actionInputs: string[]
    private directionalInputs: string[]
    private optionInputs: string[]
    private refresh: any
    private gamePads: any
    private toggleZoom: boolean
    private isClicked: boolean
    
    public pastaPumpFilled: boolean 
    public pastaPumpFired: boolean 
    public miniGameIsPlaying: boolean 
    public startToggle: boolean
    public resumeBrief: boolean
    public stopGame: boolean
    public instrumentPlaying: boolean
    public baseRect1: any 
    public graphicsBkgnd: any
    public ee: Phaser.Events.EventEmitter
    public pauseMenu: any
    public currentInput: any
    public controllerInterface: Phaser.GameObjects.GameObject | null 
    public guide: Phaser.GameObjects.GameObject | null; 

    public buttons: {
        humanButtons: Phaser.GameObjects.GameObject[] | null
        pastaformButtons: Phaser.GameObjects.GameObject[] | null
        select: Phaser.GameObjects.Rectangle | null
        start: Phaser.GameObjects.Rectangle | null
        chatBtn: Phaser.GameObjects.GameObject | null
        zoomIcon: Phaser.GameObjects.GameObject | null
        A: Phaser.GameObjects.Arc | null
        B: Phaser.GameObjects.Arc | null
        C: Phaser.GameObjects.Arc | null
        D: Phaser.GameObjects.Arc | null
        left: Phaser.GameObjects.Arc | null
        up: Phaser.GameObjects.Arc | null
        right: Phaser.GameObjects.Arc | null
        down : Phaser.GameObjects.Arc | null
        arrows: {
            up: Phaser.GameObjects.Image | null
            down: Phaser.GameObjects.Image | null
            left: Phaser.GameObjects.Image | null
            right: Phaser.GameObjects.Image | null
        }
    }

    public states: {
        left: boolean
        right: boolean
        up: boolean
        down: boolean
        A: boolean
        B: boolean
        C: boolean
        D: boolean
        enter: boolean
        start: boolean
        select: boolean
    };

    public get state()
    {
        for (let [key, val] of Object.entries(this.states))
            if (val === true)
                return key;
    }

    constructor(scene: Phaser.Scene, target: Phaser.GameObjects.Sprite)
    {
        
        this.ee = scene.events;
        this.target = target;
        this.gamePads = navigator.getGamepads();
        this.isClicked = false;
        this.pastaPumpFilled = false; 
        this.pastaPumpFired = false; 
        this.miniGameIsPlaying = false; 
        this.startToggle = false;
        this.resumeBrief = false; 
        this.stopGame = false;
        this.instrumentPlaying = false;
        this.controllerInterface = null; 
        this.guide = null; 
        this.baseRect1 = null; 
        this.graphicsBkgnd = null;

        this.pauseMenu = {
            isPaused : false,
            cursorPos : 0
        }

        this.currentInput = {
            type: null,
            boomerangBool: false,
            pennePistolBool: false, 
            itemThrown: false,
            fireBoomerang: false, 
            firePennePistol: false, 
            fireAutomac1000: false, 
            fireRigatoniRocketLauncher: false,
        };

        this.states = {
            left: false,
            right: false,
            up: false,
            down: false,
            A: false,
            B: false,
            C: false,
            D: false,
            enter: false,
            start: false,
            select: false
        };

      
        this.buttons = {
            A: null, 
            B: null,  
            C: null, 
            D: null, 
            left: null, 
            up: null, 
            right: null, 
            down : null, 
            chatBtn: null, 
            zoomIcon: null,
            select: null,
            start: null, 
            humanButtons: [], 
            pastaformButtons: [],
            arrows: {
                up: null,
                down: null,
                left: null,
                right: null
            }
        }

        this.actionInputs = ['A', 'B', 'C', 'D'];
        this.directionalInputs = ['left', 'right', 'up', 'down'];
        this.optionInputs = ['start', 'select'];


        this.refresh = {
            default: () =>{
                for (let [i, e] of Object.entries(this.currentInput))
                    e = false;
                this.pauseMenu.isPaused = false;
                this.isClicked = false;
                this.pauseMenu.cursorPos = 0;
            }
        };


    }

  ////----------------------------------------------------- apply button

  private _applyButton (scene: Phaser.Scene, button: string, tint: number): void 
  {

  ////change tint fill if virtual controls enabled

      if (System.Process.app.input.type === 'touch' && System.Process.app.input.virtual === true) 
      {
          System.Config.vibrate(20);
          if (this.buttons !== null)
              this.buttons[button].setFillStyle(tint, 1);
      }
      
  ////cancel walk if using item

      if (this.actionInputs.includes(button))
          for (let i in this.directionalInputs)
          {
              this.states[this.directionalInputs[i]] = false;
              
              if (this.target)
                this.target['_setState']('idle', scene);
          }

  //// button type

    switch (button)
    {
          
      case 'start':

        if (
            System.Process.app.game.multiPlayer.chat === false && 
            System.Process.app.game.miniGames.race.isPlaying === false &&
            this.instrumentPlaying === false)
        {
            System.Process.app.audio.play('bloop1', 1, false, scene, 0);

            if (this.isClicked === false) 
            {
                this.isClicked = true;
                System.Process.app.events.ee.emit('pause', true);
                this.pauseMenu.isPaused = true;
                this.isClicked = false;
            }
        }
      break;

      case 'select':

        if (this.instrumentPlaying === true)
            return;


        System.Process.app.audio.play('ring', 0.5, false, scene, 0); 
        System.Process.app.audio.play('bloop1', 1, false, scene, 0);
        this.instrumentPlaying = false;
        this.states.select = true;

      // multiplayer toggles chat window

          if (System.Process.app.game.multiPlayer.isPlaying === true && this.pauseMenu.isPaused === false) 
            scene.scene.get('Chat')['toggleChatWindow']();

      break;

      case 'enter':

          if (System.Process.app.game.multiPlayer.isPlaying === true) 
          {
              scene.scene.get('Chat')['sendMessage']();
              scene.scene.get('Chat')['toggleChatWindow']();
          }
      break;

      case 'left':

          if (System.Process.app.game.cutScene === true || this.instrumentPlaying === true)
            return;

          scene.cameras.main.setLerp(0.1).setFollowOffset(150, 0);
         this.states.right = false;  
          this.states.left = true;

          if (System.Process.app.game.miniGames.race.isPlaying === false)
              this.target['_setState']('walk', scene); 

      break;

      case 'right':

        if (System.Process.app.game.cutScene === true || this.instrumentPlaying === true)
            return;
            
          scene.cameras.main.setLerp(0.1).setFollowOffset(-150, 0);
          this.states.left = false; 
          this.states.right = true;

          if (System.Process.app.game.miniGames.race.isPlaying === false)
              this.target['_setState']('walk', scene);

      break;  

      case 'up': 

            if (
                System.Process.app.game.cutScene === true || 
                (!this.target || this.target['isHuman'] && !this.target['isTouching'].ground && !this.target['isCrouching']) ||
                this.instrumentPlaying === true
            )
                return;

            if (System.Process.app.game.miniGames.race.isPlaying === false)
            {
                this.target['waterOverlap'] = false;
                if (this.states.down === true) 
                {
                    this.states.down = false; 
                    this.states.up = false; 
                }
                else  
                {
                    this.states.up = true;
                    scene.time.delayedCall(100, ()=> this.states.up = false);
                    this.target['_setState']('jump', scene);
                }

            }

      break;

      case 'down':
            if (System.Process.app.game.cutScene === true || this.instrumentPlaying === true)
                return;
    
         if (
              System.Process.app.game.gameState === true && System.Process.app.game.cutScene === false &&
              this.states.A === false && this.states.B === false &&
              System.Process.app.game.miniGames.race.isPlaying === false
          )
          {
              this.states.down = true;
              this.states.up = false;
              if (scene.data['player'].human === true) 
              this.target['_setState']('crouch', scene);
              else 
              {
                  this.target['_setState']('down', scene);
                  scene.cameras.main.setLerp(0.1).setFollowOffset(0, -150);
              }
          }
      break;

      default: // A, B, C, D
      
          if (this.pauseMenu.isPaused === false)
          {
          //// block propagation if directional

              if (this.states.right === true || this.states.left === true)
                return;

              this.states[button] = true;
              
              if (this.states[button] === true && System.Process.app.game.miniGames.race.isPlaying === false)
              {
              
                if (
                    System.Process.app.game.cutScene === false && this.instrumentPlaying === false && scene['player'].usingLadle === false && 
                    this.states.down === false && this.currentInput.boomerangBool === false && scene['player'].isHit === false
                )
                this.target['_setState'](scene.data['selects'][button].key, scene);
                      
              ////////////// multiplayer only 
              
                  if (System.Process.app.game.multiPlayer.isPlaying === true)
                  {
                    if (System.Process.app.game.multiPlayer.attackBool === true) 
                        return;
                        
                    System.Process.app.game.multiPlayer.attackBool = true;
                    System.Process.app.events.socketEmit('player action', scene.scene.get('Brawl')['playerDataSnapshot']());  
                  }
                  System.Config.vibrate(20);
              }
          }

      break;
      
      }

  //// if A, B, C, D: deselect directional inputs

      if (this.states.A || this.states.B || this.states.C || this.states.D) 
      {
          if (this.directionalInputs.includes(button))
              this.states[button] = false;  
      }
  }

//---------------------------------------------- release button

  private async _releaseButton (scene: Phaser.Scene, button: string): Promise<void>
  {

        if (this.directionalInputs.includes(button))
            this.states[button] = false;   
        else if (this.actionInputs.includes(button))
            this.states[button] = System.Process.app.game.miniGames.race.isPlaying === false ? scene['player'].hitbox.anims.isPlaying && false : false;     
        else if (this.optionInputs.includes(button))
            this.states[button] = false;   

        if (System.Process.app.game.miniGames.race.isPlaying === false)
            this.target['_getState'](scene);

        if (System.Process.app.input.type === 'touch' && System.Process.app.input.virtual === true) 
          this.buttons[button].setFillStyle(0x464646, 0.6);

        for (let [i, j] of Object.entries(this.currentInput)) 
            j = false;

        System.Process.app.audio.stop('automac1000_shot', scene);
    
   }

  
//-----------------VIRTUAL CONTROLLER


   public virtualControllerInterface(scene: Phaser.Scene, controller: Phaser.Scene, displayOnly: boolean): void
   {

        this.resumeBrief = false;   
        this.stopGame = false;

        if (displayOnly === false)
        {
            //virtual buttons 
            controller.input.addPointer(1);

    //portrait
            this.controllerInterface = controller.add.image(0, 0, 'controller_interface').setDepth(2);
            this.baseRect1 = new Phaser.Geom.Rectangle(0, 0, 3000, 3000);
            this.graphicsBkgnd = controller.add.graphics({fillStyle: {color: 0x000000}}).fillRectShape(this.baseRect1).setAlpha(0.8).setDepth(1);    

    //left button
        this.buttons.left = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3);
        this.buttons.arrows.left = controller.add.sprite(300, 300, 'arrow_btn').setAngle(-90).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 0.75).setInteractive()
            .on('pointerout', ()=> this._releaseButton(scene, 'left'), false)
            .on('pointerdown', ()=> this._applyButton(scene, 'left', 0xffff00), false)
            .on('pointerover', ()=> this._applyButton(scene, 'left', 0xffff00), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'left'), false);

    // jump button
        this.buttons.up = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3);
        this.buttons.arrows.up = controller.add.sprite(-3000, -3000, 'arrow_btn').setDepth(100).setScale(System.Process.app.scale.scaleRatio * 0.75).setInteractive()
            .on('pointerout', ()=> this._releaseButton(scene, 'up'), false)
            .on('pointerdown', ()=> this._applyButton(scene, 'up', 0xffff00), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'up'), false);

    // right button
        this.buttons.right = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3);
        this.buttons.arrows.right = controller.add.sprite(-3000, -3000, 'arrow_btn').setAngle(90).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 0.75).setInteractive()
            .on('pointerout', ()=> this._releaseButton(scene, 'right'), false)
            .on('pointerdown', ()=> this._applyButton(scene, 'right', 0xffff00), false) 
            .on('pointerover', ()=> this._applyButton(scene, 'right', 0xffff00), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'right'), false);

    //crouch button
        this.buttons.down = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3);
        this.buttons.arrows.down = controller.add.sprite(-3000, -3000, 'arrow_btn').setFlipY(true).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 0.75).setInteractive()
            .on('pointerout', ()=> this._releaseButton(scene, 'down'), false)
            .on('pointerdown', ()=> this._applyButton(scene, 'down', 0xffff00), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'down'), false);

    //A button
        this.buttons.A = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3).setInteractive()
            .on('pointerout', ()=> this._releaseButton(scene, 'A'), false)
            .on('pointerdown', ()=> this._applyButton(scene, 'A', 0x960C13), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'A'), false);

    // B button
        this.buttons.B = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3).setInteractive()
            .on('pointerout', ()=> this._releaseButton(scene, 'B'), false)
            .on('pointerdown',()=> this._applyButton(scene, 'B', 0x041996), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'B'), false);

    //C button

        this.buttons.C = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3).setInteractive()
            .on('pointerdown', ()=> this._applyButton(scene, 'C', 0x0A8200), false)
            .on('pointerout', ()=> this._releaseButton(scene, 'C'), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'C'), false);

    //// D button
        this.buttons.D = controller.add.circle(-3000, -3000, 40).setFillStyle(0x464646, 0.6).setStrokeStyle(3, 0x000000, 1).setDepth(100).setScale(System.Process.app.scale.scaleRatio * 1.3).setInteractive()
            .on('pointerdown', ()=> this._applyButton(scene, 'D', 0xBC7F04), false)
            .on('pointerout', ()=> this._releaseButton(scene, 'D'), false)
            .on('pointerup', ()=> this._releaseButton(scene, 'D'), false);

        }



    //------------------------------------------menu button for current controller

    //start text

        this.startToggle = false;
        this.toggleZoom = false;

        this.buttons.zoomIcon = controller.add.sprite(320, 920, 'zoom_icon').setInteractive().setDepth(101)
        .on('pointerdown', ()=> {
            if (System.Process.app.game.gameState === true && System.Process.app.game.cutScene === false && System.Process.app.game.fightBoss === false)
            {
                if (this.toggleZoom === false)
                {
                    this.toggleZoom = true;
                    scene.cameras.main.setZoom(0.6);
                } 
                else 
                {
                    this.toggleZoom = false;
                    scene.cameras.main.setZoom(1);
                }
            }
        });

        this.buttons.start = controller.add.rectangle(-3000, -3000, 70, 50, 0, 0.6).setDepth(100).setFillStyle(0x464646, 0.6).setStrokeStyle(2.5, 0x000000).setInteractive()
        .on('pointerdown', ()=> this._applyButton(scene, 'start', 0x464646), false)
        .on('pointerup', ()=> this._releaseButton(scene, 'start'), false)
        .on('pointerout', ()=> this._releaseButton(scene, 'start'), false);

    //select button

        this.buttons.select = controller.add.rectangle(-3000, -3000, 70, 50, 0, 0.6).setDepth(100).setFillStyle(0x464646, 0.6).setStrokeStyle(2.5, 0x000000).setInteractive()
        .on('pointerdown', ()=> this._applyButton(scene, 'select', 0x464646), false)
        .on('pointerup', ()=> this._releaseButton(scene, 'select'), false)
        .on('pointerout', ()=> this._releaseButton(scene, 'select'), false);


    }


  //-------------------------------------------------cursors and keys 'WASD'


    public keyboardControls(scene: Phaser.Scene): void
    {

        scene.input.keyboard.clearCaptures();

        if (System.Process.app.game.gameState === true)
        {

        //start
            scene.input.keyboard.on('keydown-SPACE', ()=> this._applyButton(scene, 'start', 0), false).on('keyup-SPACE', ()=> this._releaseButton(scene, 'start'), false); 
        //select
            scene.input.keyboard.on('keydown-SHIFT', ()=> this._applyButton(scene, 'select', 0), false).on('keyup-SHIFT', ()=> this._releaseButton(scene, 'select'), false);
        //up
            scene.input.keyboard.on('keydown-UP', ()=> this._applyButton(scene, 'up', 0), false).on('keyup-UP', ()=> this._releaseButton(scene, 'up'), false);
        //down
            scene.input.keyboard.on('keydown-DOWN', ()=> this._applyButton(scene, 'down', 0), false).on('keyup-DOWN', ()=> this._releaseButton(scene, 'down'), false);
        //left
            scene.input.keyboard.on('keydown-LEFT', ()=> this._applyButton(scene, 'left', 0), false).on('keyup-LEFT', ()=> this._releaseButton(scene, 'left'), false);
        //right
            scene.input.keyboard.on('keydown-RIGHT', ()=> this._applyButton(scene, 'right', 0), false).on('keyup-RIGHT', ()=> this._releaseButton(scene, 'right'), false);

      //wasd

        //s A
            scene.input.keyboard.on('keydown-S', ()=> this._applyButton(scene, 'A', 0), false).on('keyup-S', ()=> this._releaseButton(scene, 'A'), false);
        //d B  
            scene.input.keyboard.on('keydown-D', ()=> this._applyButton(scene, 'B', 0), false).on('keyup-D', ()=> this._releaseButton(scene, 'B'), false); 
        //w  C
            scene.input.keyboard.on('keydown-W', ()=> this._applyButton(scene, 'C', 0), false).on('keyup-W', ()=> this._releaseButton(scene, 'C'), false);
        //a D
            scene.input.keyboard.on('keydown-A', ()=> this._applyButton(scene, 'D', 0), false).on('keyup-A', ()=> this._releaseButton(scene, 'D'), false);
        //enter CHAT
            scene.input.keyboard.on('keydown-ENTER', ()=> this._applyButton(scene, 'enter', 0), false);

        }   
    }

  //------------------------------------ gamepad   

    // haptic actuator if gamepad is connected

    private hapticFeedback(duration: string): void
    { 
        System.Config.vibrate(duration === 'long' ? 1000 : 20); 
    }

    //-----------------------------------------------------------------------------------

      public gamepadControls(scene: Phaser.Scene): void
      {
          scene.input.gamepad.on('down', (pad: any, button: any, e: number): void => {

            //if (this.gamePads[0] !== undefined && this.gamePads[0] !== null) this.gamePads[0].vibrationActuator.playEffect("dual-rumble", {startDelay: 0, duration: 20, weakMagnitude: 0.5, strongMagnitude: 0.5});  
            
            if (System.Process.app.game.gameState === true && System.Process.app.game.cutScene === false)
            {
                if (button.index === 9) 
                    this._applyButton(scene, 'start', 0);
                if (button.index === 8) 
                    this._applyButton(scene, 'select', 0);
                if (pad.left) 
                    this._applyButton(scene, 'left', 0);
                if (pad.right) 
                    this._applyButton(scene, 'right', 0);
                if (pad.up || pad.L2) 
                    this._applyButton(scene, 'up', 0);
                if (pad.down || pad.L1) 
                    this._applyButton(scene, 'down', 0);

                if (System.Process.app.input.mode === 'A')
                {
                    if (pad.A || pad.R1) 
                        this._applyButton(scene, 'A', 0);
                    if (pad.B || pad.R2) 
                        this._applyButton(scene, 'B', 0);
                    if (pad.Y) 
                        this._applyButton(scene, 'C', 0);
                    if (pad.X) 
                        this._applyButton(scene, 'D', 0);
                }
                else
                {
                    if (pad.B || pad.R1) 
                        this._applyButton(scene, 'A', 0);
                    if (pad.A || pad.R2) 
                        this._applyButton(scene, 'B', 0);
                    if (pad.X) 
                        this._applyButton(scene, 'C', 0);
                    if (pad.Y) 
                        this._applyButton(scene, 'D', 0);
                }
            }
          })
          .on('up', (pad: any, button: any, e: number): void => { 

            this._releaseButton(scene, 'start');
            this._releaseButton(scene, 'select');
            this._releaseButton(scene, 'left');
            this._releaseButton(scene, 'right');
            this._releaseButton(scene, 'up');
            this._releaseButton(scene, 'down');
            this._releaseButton(scene, 'A');
            this._releaseButton(scene, 'B');
            this._releaseButton(scene, 'C');
            this._releaseButton(scene, 'D');
          });
      } 


    //-------------------------------------- update on screen selection prompts


    public static updatePrompts(args: any[]): void
    {
        InputManager.selectableElements = [];
        InputManager.selectableElements.push(...args); 
    }


    //-------------------------------------- implement on screen menu selection prompts (supports game objects (sprites, images, text) and dom elements)


    public static implementMenuSelections(scene: Phaser.Scene, selections: any[], __scene?: Phaser.Scene | null): void
    {

       InputManager.selectableElements = selections; 

       const

        _scene = !__scene ? scene : __scene,

        activeAltScene = (active: boolean): boolean => {

            if (__scene === null)
                return false;

            return active ? 
                _scene.scene.settings.active ? true : false :
                !_scene.scene.settings.active ? true : false;
        },

        isGameObject = (type: any): boolean => {

            return (
                (
                    type instanceof Phaser.GameObjects.Sprite ||
                    type instanceof Phaser.GameObjects.Image ||
                    type instanceof Phaser.GameObjects.Text
                ) 
            ) ? 
            true : false;
        },

        emitPointerUp = (type: any): void => {

            if (isGameObject(type))
                type?.emit('pointerup');
        },

        emitPointerDown = (type: any): void => {

            if (isGameObject(type))
                type?.emit('pointerdown');
           
            else if (typeof type?.click === 'function')
                type?.click();
        },

        exitMenu = (sceneToReturn: string): void => {
            
            switch (sceneToReturn)
            {
                case 'PauseMenu':  _scene.scene.get(sceneToReturn)['exitPause'](_scene); 

                break;
            
                case 'Menu3D':
                
                    System.Process.app.audio.play('ring_echo', 1.1, false, scene, 0);
                    System.Config.vibrate(20);
                    _scene?.scene.stop('Menu3D');

                break;
            }

            if (System.Process.app.game.fightBoss === false)
                _scene?.scene.stop('TextUI');
        },

        returnToScene = (): void => { 

            switch (scene.scene.key)
            {
                case 'WarpMenu': _scene?.scene.get('WarpMenu')['exit'](_scene); return;
                case 'SaveMenu': _scene?.scene.get('SaveMenu')['exitMenu'](); return;
                case 'BassUI': _scene?.scene.get('BassUI')['resumeGame'](); return;
                case 'SamplerUI': _scene?.scene.get('SamplerUI')['resumeGame'](); return;
                default: break;
            }

            if (_scene)
                _scene['Xout']?.click();

        //stop main scene src

            if (_scene?.scene.key !== 'Quest')
                _scene?.scene.stop(); 

        //restore button functionality to main menu

            if (scene.scene.key === 'MainMenu')
            {
                InputManager.updatePrompts([scene['playGame'], scene['signIn'], scene['settingsTxt']]); 
                scene['playGame'].clearTint();
                scene['signIn'].clearTint();
                scene['settingsTxt'].clearTint();
            }
        },

        highlightOptions = (): void => {

            if (iteratorX >= InputManager.selectableElements.length || iteratorX < 0)
                iteratorX = 0;

            if (iteratorY >= InputManager.selectableElements.length || iteratorY < 0)
                iteratorY = 0;

            //clear non selected tints
           
            InputManager.selectableElements.filter((i: any): void => {

                if (
                    selection && 
                    i !== selection &&
                    isGameObject(selection)
                )
                selection.clearTint();

            });

            //set tint to selection

            if (activeAltScene(true)) //if html
            {

                iteratorX = 0;
                selection = document.getElementById(InputManager.selectableElements[iteratorY]);
            
                if (selection)
                    for (let i in InputManager.selectableElements) 
                    {
                        const element = document.getElementById(InputManager.selectableElements[i]);

                        if (element === selection)
                            selection.style.color = '#ff0000';

                        else if (element)
                            element.style.color = '#ffff00';
                    }
                    
            }
            else 
            {
                // else selections are game objects

                iteratorY = 0;
                selection = InputManager.selectableElements[iteratorX];

                for (let i in InputManager.selectableElements) 
                    if (
                        selection && 
                        InputManager.selectableElements[i] === selection &&
                        isGameObject(selection)
                    )
                    selection.setTint(0xff0000);
            }

        }

        //---------------------

        let 
            iteratorX = 0,
            iteratorY = 0,
            selection = activeAltScene(true) ? 
                document.getElementById(InputManager.selectableElements[iteratorY]) : 
                InputManager.selectableElements[iteratorX];

        //------inputs (keys)

        scene.input.keyboard.on('keydown', ( ev: KeyboardEvent ) => {  

            if (ev.key === 'ArrowRight')
                iteratorX++;

            if (ev.key === 'ArrowLeft')
                iteratorX--;

            if (ev.key === 'ArrowUp')
                iteratorY--;

            if (ev.key === 'ArrowDown')
                iteratorY++;

            if (ev.key === 'Enter' || ev.key === 'Shift')
                emitPointerDown(selection); 

            if (ev.key === ' ' || ev.key === 'Space')
                scene.scene.key === 'PauseMenu' || scene.scene.key === 'Menu3D' ? 
                    exitMenu(scene.scene.key) : returnToScene();
            
            highlightOptions();

        })
        .on('keyup', ( ev: KeyboardEvent ) => {  

            if (ev.key === 'Enter' || ev.key === 'Shift')
                emitPointerUp(selection); 
        });

        //-------inputs (gamepad)

        scene.input.gamepad.on('down', (pad: any, button: any, e: number): void => { 
            
            if (pad.left) 
                iteratorX--;
        
            if (pad.right) 
                iteratorX++;
            
            if (pad.down) 
                iteratorY++;
        
            if (pad.up) 
                iteratorY--;

            if (button.index === 9 || button.index === 8 || pad.A || pad.R1) 
            {

                System.Process.app.audio.play('ring_echo', 0.5, false, scene, 0);   

                if (button.index === 9) //return pause menu (start button)
                {

                    if (scene.scene.key === 'PauseMenu' || scene.scene.key === 'Menu3D')
                    {
                        exitMenu(scene.scene.key);

                        return;
                    }
                }
                
                let sel = selection;

               InputManager.selectableElements = [];

                emitPointerDown(sel);
                
                selection = null;

            }
            else
                System.Process.app.audio.play('sword_swipe', 0.5, false, scene, 0);
    

            if (pad.B || pad.R2) 
                returnToScene();


            highlightOptions();

        })
        .on('up', (pad: any, button: any, e: number): void => {

            if (button.index === 9 || button.index === 8 || pad.A || pad.R1)
                emitPointerUp(selection);

        });
    }
}
