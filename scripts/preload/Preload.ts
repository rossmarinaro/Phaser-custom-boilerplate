// Preload Assets

import { System } from '../core/Config';

import mainAnims from '../animations/main';
import playerAnims from '../animations/player';
import enemyAnims from '../animations/enemies';


export class Preload extends Phaser.Scene {

    private GAME_WIDTH: number
    private GAME_HEIGHT: number

    private stageText: Phaser.GameObjects.Text | null 
    private assetText: Phaser.GameObjects.Text | null 
    private percentText: Phaser.GameObjects.Text | null 
    private loadingText: Phaser.GameObjects.Text | null 
    private progressBarGraphics: Phaser.GameObjects.Graphics | null    
    private progressBox: Phaser.GameObjects.Graphics | null  
    private progressBox2: Phaser.GameObjects.Graphics | null  
    private progressOverlay: Phaser.GameObjects.Graphics | null  
    private loadIterator: Phaser.Time.TimerEvent | null


	constructor() 
    {

	    super('Preload');
 
        this.stageText = null;  
        this.assetText = null;
        this.percentText = null; 
        this.loadingText = null; 
        this.progressBarGraphics = null;     
        this.progressBox = null; 
        this.progressBox2 = null;
        this.progressOverlay = null;
        this.loadIterator = null;
        
	}


//--------------------------

	private init(data: Phaser.Scenes.Systems | any): void
    {
		this.data = data;
		this.data['currentStage'] = 'Assets'; 
        this.scene.launch('Background', {type: 'blank'});

        System.Process.orientation.lock('portrait-primary');
        System.Process.app.ui.listen(this, 'Preload'); 

	}

//-------------------------------

	private preload(): void
    {   


    //---- call asset preload funcs

       this.parse(this); 
       

	//---- progress bar   

		this.progressBar(this);
	}

//-------------------------------

    private create(): void 
    {

    //----load animations to cache 

        playerAnims(this);
        enemyAnims(this);
        mainAnims(this);

    //----destroy progress bar

        this.destroyProgressBar();
    
        this.scene.run('Intro', this.data);
        this.scene.stop('Preload');
    }


//--------------------- parse json asset manifests


    private async parse(scene: Phaser.Scene): Promise<void>
    {

        await System.Process.app.resourceParser(scene, scene.cache.json.get('resources_main')); 
        await System.Process.app.resourceParser(scene, scene.cache.json.get('resources_3d'));
    }


//---------------------- progress bar


    public progressBar(scene: Phaser.Scene): void
    { 

        const 
            width = this.GAME_WIDTH / 2, 
            height = this.GAME_HEIGHT / 2;

        this.progressBox = scene.add.graphics().fillStyle(0xffff00, 1).fillRoundedRect((55 / 100) * width, (85 / 100) * height, (85 / 100) * width, 50, 10);
        this.progressBox2 = scene.add.graphics({lineStyle: {width: 3, color: 0xff0000}}).strokeRoundedRect((55 / 100) * width, (85 / 100) * height, (85 / 100) * width, 50, 10);
        this.progressBarGraphics = scene.add.graphics();
        this.progressOverlay = scene.add.graphics().fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0, 0.2, 0.3, 0.1).fillRoundedRect((55 / 100) * width, (85 / 100) * height, (85 / 100) * width, 50, 10);
        this.loadingText = scene.make.text({
            x: width,
            y: height / 2 - 100,
            text: 'Loading',
            style: {font: '50px Digitizer'}
        }).setColor('#ff0000').setStroke('#FFB000', 4).setShadow(2, 2, '#ffff00', 1, false).setOrigin(0.5, 0.5);   
        this.stageText = scene.make.text({
            x: width,
            y: height / 2 - 30,
            text: this.data['currentStage'],
            style: { font: '20px Digitizer' }
        }).setColor('#ffffff').setStroke('#FF0000', 4).setOrigin(0.5, 0.5);
        this.percentText = scene.make.text({ 
            x: width,
            y: height / 2 + 30,
            text: '0%',
            style: {font: '38px Digitizer' }
        }).setColor('#0CC10C').setStroke('#FFB000', 4).setShadow(2, 2, '#ffff00', 1, false).setOrigin(0.5, 0.5);
        this.assetText = scene.make.text({
            x: width,
            y: height / 2 + 75,
            text: '',
            style: { font: '12px Digitizer' }
        }).setColor('#ffff00').setStroke('#0CC10C', 2).setOrigin(0.5, 0.5);

    // on progress / complete

        let dots = '';
        const updateLoad = ()=>{

            if (!this.loadIterator)
                return;

            dots += '.';
            let text = 'Loading.', 
                positionX = this.loadingText?.x;

            if (this.loadingText !== null && this.loadingText.text !== 'Loading...')
            {
                text = `Loading${dots}`
                positionX = this.loadingText.x += 5;
            }
            else 
            {
                dots = '.';
                positionX = width + 5.27;
            }
            this.loadingText?.setText(text).setX(positionX);
        };
        this.loadIterator = this.time.addEvent({delay: 1000, callback: updateLoad, callbackScope: this, repeat: -1});

        scene.load.on('progress', (value: number) => {

            let percent = Math.floor(value * 100);
            this.percentText?.setText(String(percent + '%'));

            this.progressBarGraphics?.clear();    
            this.progressBarGraphics?.fillGradientStyle(0xff0000, 0xff0000, 0xFCB144, 0xFCB144, 1).fillRoundedRect((60 / 100) * width, (87.4 / 100) * height, (76 / 100) * width * value, 30, 2);
    
        // destroy progress bar

            if (this.percentText !== null && this.percentText.text === '100%')
                System.Process.app.game.gameState ? 
                    this.destroyProgressBar() : scene.time.delayedCall(3000, ()=> this.destroyProgressBar());  
        })
        .on('fileprogress', (file: any) => this.assetText?.setText(file.key)); 

    }


//------------------------------------------- destroy progress bar


    private destroyProgressBar(): void
    {
        this.loadIterator?.destroy();
        this.progressBarGraphics?.destroy();
        this.progressOverlay?.destroy();
        this.progressBox?.destroy();
        this.progressBox2?.destroy();
        this.loadingText?.destroy();
        this.percentText?.destroy();
        this.stageText?.destroy();
        this.assetText?.destroy();
    }




}




