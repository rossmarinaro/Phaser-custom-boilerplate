import { System } from '../core/Config';

export class Intro extends Phaser.Scene {	         /* SORCERCELERY */

	private glove: any
	private startText: Phaser.GameObjects.Text
	private light: Phaser.GameObjects.Light
	private sprites: any[]
	private sceneNext: boolean

	constructor(){
		super('Intro');
	}


	private create(data: Phaser.Data.DataManager): void
	{
		
		this.data = data;
		System.Process.orientation.lock('portrait-primary');

    //----- run background shaders

		this.scene.run('Background', {type: 'preload'});

        this.cameras.main.fadeIn(2000);



		let hasStarted = false;
		this.sceneNext = false;

		this.input.once('pointerdown', ()=> this.startGame(hasStarted));
		this.input.keyboard.once('keydown', ()=> this.startGame(hasStarted));
		this.input.gamepad.once('down', ()=> this.startGame(hasStarted));
		this.input.gamepad.once('connected', ()=> console.log(this.input.gamepad));  

	
	}

//----------------------------------------------------------------

	public update(): void
	{

	
	}
	

	//---------------------------------------------------start game intro

	private async startGame(hasStarted: boolean): Promise<void>
	{ 

		if (hasStarted)
			return;

		hasStarted = true;

		System.Process.app.audio.play('ring', 0.5, false, this, 0); 
		this.glove.destroy();
		this.startText.destroy();
		this.scene.run('Background', {type: 'intro'});

	//fade in

		System.Process.app.audio.play('intro_track', 1, true, this, 0);

	////
		this.sprites = [];

	////skip intro

		this.input.on('pointerdown', ()=> this.nextScene(this));
		this.input.keyboard.on('keydown', ()=> this.nextScene(this));
		this.input.gamepad.on('down', ()=> this.nextScene(this));


		
	//pastaboss /fsm image


	
	}

	//------------------------------ next scene

	private nextScene(scene: Phaser.Scene): void
	{	
		if (this.sceneNext)
			return;

		this.sceneNext = true;

		scene.cameras.main.setZoom(1);
		scene.scene.run('MainMenu', this.data);
		scene.scene.stop('TextUI');
		scene.scene.stop('Background');
		scene.scene.stop('Intro');
		System.Process.app.text.resetTexts();
	}
}