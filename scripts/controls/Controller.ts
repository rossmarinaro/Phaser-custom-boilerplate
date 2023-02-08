
import { System } from '../core/Config';
import { InputManager } from './Inputs';

//-- controller layout


export class Controller extends Phaser.Scene {

    private isVisible: boolean
    private _scene: Phaser.Scene 
    public _inputs: InputManager

    constructor (){
        super('Controller');
    }  
    private create ([scene, isVisible]): void
    { 

       this.isVisible = isVisible;
       this._scene = scene; 
       this._inputs = new System.Process.app.inputs(scene, scene.player);

    ////controller types
    
        if (this.isVisible === true && System.Process.app.input.virtual === true)
            this._inputs.virtualControllerInterface(scene, this, System.Process.app.input.type === 'touch' ? false : true);  

        this._inputs.keyboardControls(scene);
        this._inputs.gamepadControls(scene);

        this.input.gamepad.once('connected', ()=> console.log('gamepad initialized.', this.input.gamepad));

 
    ////resize window orientation
    
        System.Process.app.ui.listen(this, 'Controller', this.resizeWindow);

        this.cameras.main.fadeIn(3000, 0, 0, 0);

    }
    
//---------------------------------- resize

    private resizeWindow(scene: Phaser.Scene): void 
    {

        if (!scene.scene.settings.active || System.Process.app.input.virtual === false)
            return;

            if (System.Process.app.input.type === 'touch' && scene['isVisible'] === true)
            {
                if (System.Config.isPortrait(scene)) //-----portrait
                { 
                    scene['GAME_WIDTH'] = scene.cameras.main.width;
                    scene['GAME_HEIGHT'] = scene.cameras.main.height;
                    scene['_inputs'].buttons.zoomIcon.setVisible(true).setPosition((50 / 100) * scene['GAME_WIDTH'], (80 / 100) * scene['GAME_HEIGHT']);
                    scene['_inputs'].controllerInterface.setVisible(false).setPosition(scene['GAME_WIDTH'] / 2, scene['_inputs'].buttons.zoomIcon.y).setScale(System.Process.app.scale.scaleRatio /* * 0.85 */);
                    scene['_inputs'].graphicsBkgnd.setPosition(-400, scene['_inputs'].controllerInterface.y - scene['_inputs'].controllerInterface.height / 3.5).setVisible(true);
                    scene['_inputs'].buttons.start.setPosition((45 / 100) * scene['GAME_WIDTH'], (85 / 100) * scene['GAME_HEIGHT']).setScale(System.Process.app.scale.scaleRatio);
                    scene['_inputs'].buttons.select.setPosition((55 / 100) * scene['GAME_WIDTH'], (85 / 100) * scene['GAME_HEIGHT']).setScale(System.Process.app.scale.scaleRatio);
                    if (System.Process.app.input.mode === 'A')
                    {
                        scene['_inputs'].buttons.left.setPosition((8 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.right.setPosition(scene['_inputs'].buttons.left.x + (14 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.up.setPosition((76 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.down.setPosition((90 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.D.setPosition(scene['_inputs'].buttons.left.x + (14 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y - (20 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                    }
                    else 
                    {
                        scene['_inputs'].buttons.left.setPosition((76 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.right.setPosition((90 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.up.setPosition((8 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.down.setPosition(scene['_inputs'].buttons.up.x + (14 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y + (15 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                        scene['_inputs'].buttons.D.setPosition(scene['_inputs'].buttons.up.x + (14 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y - (20 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                    }
                    scene['_inputs'].buttons.A.setPosition((76 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y - (20 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                    scene['_inputs'].buttons.B.setPosition((90 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y - (20 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                    scene['_inputs'].buttons.C.setPosition((8 / 100) * scene['GAME_WIDTH'], scene['_inputs'].controllerInterface.y - (20 / 100) * (scene['_inputs'].controllerInterface.height * scene['_inputs'].controllerInterface.scale));
                }
            else  //---- landscape
                { 
                    scene['_inputs'].controllerInterface.setVisible(false);
                    scene['_inputs'].graphicsBkgnd.setVisible(false);
                    scene['_inputs'].buttons.zoomIcon.setVisible(false).setActive(false);
                    if (System.Process.app.input.mode === 'A')
                    {
                        scene['_inputs'].buttons.left.setPosition(50, (65 / 100) * scene['_inputs'].controllerInterface.height);  
                        scene['_inputs'].buttons.right.setPosition(scene['_inputs'].buttons.left.x + (10 / 100) * scene.cameras.main.width, (65 / 100) * scene['_inputs'].controllerInterface.height);
                        scene['_inputs'].buttons.up.setPosition((85 / 100) * scene.cameras.main.width, (65 / 100) * scene['_inputs'].controllerInterface.height);
                        scene['_inputs'].buttons.down.setPosition((95 / 100) * scene.cameras.main.width, (65 / 100) * scene['_inputs'].controllerInterface.height);
                    }
                    else 
                    {
                        scene['_inputs'].buttons.left.setPosition((85 / 100) * scene.cameras.main.width, (65 / 100) * scene['_inputs'].controllerInterface.height);  
                        scene['_inputs'].buttons.right.setPosition((95 / 100) * scene.cameras.main.width, (65 / 100) * scene['_inputs'].controllerInterface.height);
                        scene['_inputs'].buttons.up.setPosition(50, (65 / 100) * scene['_inputs'].controllerInterface.height);
                        scene['_inputs'].buttons.down.setPosition(scene['_inputs'].buttons.up.x + (10 / 100) * scene.cameras.main.width, (65 / 100) * scene['_inputs'].controllerInterface.height);
                    
                    }
                
                ////action buttons

                    scene['_inputs'].buttons.A.setPosition(scene['_inputs'].buttons.up.x, scene['_inputs'].buttons.up.y - 70);
                    scene['_inputs'].buttons.B.setPosition(scene['_inputs'].buttons.down.x, scene['_inputs'].buttons.down.y - 70);
                    scene['_inputs'].buttons.C.setPosition(scene['_inputs'].buttons.left.x, scene['_inputs'].buttons.left.y - 70);
                    scene['_inputs'].buttons.D.setPosition(scene['_inputs'].buttons.right.x, scene['_inputs'].buttons.right.y - 70);

                    scene['_inputs'].buttons.start.setPosition(scene['_inputs'].buttons.C.x, scene['_inputs'].buttons.C.y - 80);
                    scene['_inputs'].buttons.select.setPosition(scene['_inputs'].buttons.B.x, scene['_inputs'].buttons.B.y - 80); 
                } 

            ////arrows /  zones

                scene['_inputs'].buttons.arrows.up.setPosition(scene['_inputs'].buttons.up.x, scene['_inputs'].buttons.up.y);
                scene['_inputs'].buttons.arrows.down.setPosition(scene['_inputs'].buttons.down.x, scene['_inputs'].buttons.down.y);
                scene['_inputs'].buttons.arrows.left.setPosition(scene['_inputs'].buttons.left.x, scene['_inputs'].buttons.left.y);
                scene['_inputs'].buttons.arrows.right.setPosition(scene['_inputs'].buttons.right.x, scene['_inputs'].buttons.right.y);


         }

    }


}        

  