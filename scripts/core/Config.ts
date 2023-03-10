
import * as types from '../../../typings/types';

import { Canvas }  from '@enable3d/phaser-extension';


//--------------------------------------- base sys namespace

export namespace System {
     
    export class Config {

        private Canvas: Readonly<typeof Canvas>
        
        public static internet: types.internet = { connected: true, proxy: false }
        //web: true, false
        //electron: false, false
        //cordova: false, true

        public game: Readonly<Phaser.Game>
        public app: any
        public utils: any
        public parent: string
        public key: string
        public mode: any
        public position: number
        public inputType: string
        public width: number
        public height: number
        public velX: number
        public velY: number
        public setup: types.setup
        public min: types.dimension2D = { width: 0, height: 0 }
        public max: types.dimension2D = { width: 0, height: 0 }
        public orientation: types.orientation = {
    
            on: (
                event: string, 
                callback: EventListenerOrEventListenerObject, 
                state: boolean | EventListenerOptions | undefined): void => {
                    if (
                        typeof screen.orientation !== null && 
                        typeof screen.orientation !== 'undefined' && 
                        Config.mobileAndTabletCheck()
                    ) 
                        screen.orientation.addEventListener(event, callback, state);
            },
            off: (
                event: string, 
                callback: EventListenerOrEventListenerObject, 
                state: boolean | EventListenerOptions | undefined): void => {
                    if (
                        screen.orientation && 
                        Config.mobileAndTabletCheck()
                    ) 
                        screen.orientation.removeEventListener(event, callback, state);
            },
            lock: (aspectRatio: OrientationLockType): void => {
                if (
                    typeof screen.orientation.lock !== null && 
                    typeof screen.orientation !== 'undefined' && 
                    Config.mobileAndTabletCheck()
                ) 
                    screen.orientation.lock(aspectRatio);
            },
            unlock: (): void => {
                if (
                    typeof screen.orientation.unlock !== null && 
                    typeof screen.orientation !== 'undefined' && 
                    Config.mobileAndTabletCheck()
                ) 
                    screen.orientation.unlock();
            }
        }


        //---------------------------------------------------------
      
    
        constructor(canvas: Readonly<typeof Canvas>)
        {
            
            this.Canvas = canvas;
            this.app = null; 
            this.parent = 'game';
            this.key = '';
            this.utils = null;
            this.mode = null;
            this.setup = {
                key: '',
                physics: {
                    arcade: {
                        gravity: { y: 0 }, //// arcade physics bodies wont budge
                        useTicker: true,
                        debug: false  
                    },
                    matter: { 
                        gravity: {y: 3},
                        Body: null,
                        Bodies: null,
                        debug: false
                    }
                }
            }
            
        //Native Matter modules
    
            const { Body, Bodies } = Phaser.Physics.Matter['Matter']; 
    
            this.setup.physics.matter.Body = Body; 
            this.setup.physics.matter.Bodies = Bodies;
    
            if ( Config.mobileAndTabletCheck() )
            {
                this.inputType = 'touch';
                this.mode = Phaser.Scale.RESIZE;
                this.position = Phaser.Scale.NO_CENTER;
                this.width = innerWidth;
                this.height = innerHeight;
                this.min.width = 240;
                this.min.height = 480;
                this.max.width = 3000;
                this.max.height = 1400;
    
                this.velX = 5,
                this.velY = 23;
            }
            else
            {
                this.inputType = 'generic';
                this.mode = Phaser.Scale.FIT;
                this.position = Phaser.Scale.CENTER_HORIZONTALLY //.CENTER_BOTH; 
    
            //(larger config affects performance)
    
                this.width = 1150; //850
                this.height = 700; 
    
                this.velX = 6,
                this.velY = 26;
           
            }

        //------ ENABLE 3D INIT
                
            ENABLE3D.enable3d(() => this.game = new Phaser.Game(this.app))
            //.withPhysics('https://rossmarinaro.github.io/fps/wasm')
            .withPhysics('assets/wasm');
        }  
    
    
    //------------------------ device check
    
    
        public static mobileAndTabletCheck (): boolean
        {
            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window['opera']);
    
            return check;
        }
    
    //------------------------ is desktop
    
    
        public static isDesktop(scene: Phaser.Scene | ENABLE3D.Scene3D): boolean
        {
            return !Config.mobileAndTabletCheck() && 
                    System.Config.isLandscape(scene) || 
                    System.Process.width > 540 ? 
                        true : false;
        }
    
    //------------------------- is landscape
    
    
        public static isLandscape(scene: Phaser.Scene | ENABLE3D.Scene3D): boolean
        {
            return scene.scale.orientation.toString() === 'landscape-primary' || 
                   scene.scale.orientation.toString() === 'landscape-secondary' || 
                   scene.scale.orientation.toString() === 'landscape'  ? 
                        true : false;
        }
    
    //--------------------------- is portrait
    
    
        public static isPortrait(scene: Phaser.Scene | ENABLE3D.Scene3D): boolean
        {
            return scene.scale.orientation.toString() === 'portrait-primary' || 
                   scene.scale.orientation.toString() === 'portrait-primary' || 
                   scene.scale.orientation.toString() === 'portrait' ?
                        true : false;
        }
    
    
    //------------------------------- vibration api
    
    
        public static vibrate (duration: number): void
        {
            navigator.vibrate = navigator.vibrate || 
                                navigator['webkitVibrate'] || 
                                navigator['mozVibrate'] || 
                                navigator['msVibrate'];
    
            const isSupported = navigator.vibrate;
            
            if (typeof isSupported) 
                navigator.vibrate(duration);
        }
    
    
    //---------------------------------- clear background 
    
    
        public static makeTransparantBackground(scene: Phaser.Scene | ENABLE3D.Scene3D): void
        {
            scene.scene.stop('Background');
    
            let game = document.getElementById('game');
            
            if (game !== null)
                game.getElementsByTagName('canvas')[0].style.backgroundColor = 'transparent'; 
        }
    
    
    };
    
    
    
    export const Process = new Config({...Canvas({ antialias: true })});
    
    
}

