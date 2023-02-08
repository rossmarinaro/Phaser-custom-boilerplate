import { System } from '../core/Config';

`use strict`;

export class MainMenu extends Phaser.Scene { 

	public playGame: Phaser.GameObjects.Text
	public signIn: Phaser.GameObjects.Text
	public settingsTxt: Phaser.GameObjects.Text

	constructor(){
		super('MainMenu');
	}

	private create(data: Phaser.Data.DataManager): void
	{ 
		
		this.data = data; 

	//// lock screen

		System.Process.orientation.lock('portrait-primary'); 
		
	//// trippy background

		this.scene.run('Background', {type: 'menu'});
		
		const menuSplash = this.add.tilemap('menu_splash'),
			  tiles = menuSplash.addTilesetImage('pixel_art_pasta');

        menuSplash.createLayer('Layer', tiles, 0, 0); 

		const blocks: Phaser.GameObjects.Group = this.add.group();

		blocks.createMultiple({ key: 'redPlayer', repeat: 420 });

	//// animated characters

		Phaser.Actions.GridAlign(blocks.getChildren(), {width: 36, cellWidth: 100, cellHeight: 100, x: 15, y: 0});

		let _this = this,
			 i = 0;

		blocks.children.iterate(function (child: any) 
		{
			_this.tweens.add({targets: child, scaleX: 0, scaleY: 0, alpha: 0, y: '+=64', angle: 180, ease: 'Power3', duration: 500, delay: 1000 + (i * 100)});
			i++; if(i % 16 === 0) i = 0;
		});

		this.time.delayedCall(200, ()=>{

		blocks.getChildren().map((e: any) => e.setTexture('orangePlayer', 'fr08'));
		this.time.delayedCall(200, ()=>{
			blocks.getChildren().map((e: any) => e.setTexture('yellowPlayer', 'fr08'));
			this.time.delayedCall(200, ()=>{
				blocks.getChildren().map((e: any) => e.setTexture('greenPlayer', 'fr08'));
				this.time.delayedCall(200, ()=>{
					blocks.getChildren().map((e: any) => e.setTexture('bluePlayer', 'fr08'));
					this.time.delayedCall(200, ()=>{
						blocks.getChildren().map((e: any) => e.setTexture('indigoPlayer', 'fr08'));
						this.time.delayedCall(200, ()=>{
							blocks.getChildren().map((e: any) => e.setTexture('purplePlayer', 'fr08'));

							this.time.delayedCall(200, ()=> {

								blocks.getChildren().map((e: any) => e.setTexture('redPlayer', 'fr08'));
								
								this.time.delayedCall(200, ()=> blocks.getChildren().map((e: any) => e.destroy()));
												
								menuSplash.destroy();

							//--------------------- menu content

							const logoImage = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'logo');
						
							this.add.image(this.cameras.main.width / 2, logoImage.y - 350, 'pastaboss_text').setScale(0.5);

							const pastaBass1 = this.add.sprite(logoImage.x - 250, logoImage.y + 50, 'pastabossbass').play('pastaboss_bass_anims', true).setScale(0.8),
								pastaBass2 = this.add.sprite(logoImage.x + 250, logoImage.y + 50, 'pastabossbass').play('pastaboss_bass_anims', true).setFlipX(true).setScale(0.8),

							//walking player   

								playerSprite = this.add.sprite(pastaBass1.x, logoImage.y + 180, 'redPlayer').play('walk_red', true);							

					//play game

							this.playGame = this.add.text(logoImage.x - 270, logoImage.y + 360, "Play Game", {font: "35px Bangers"}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(2, 2, '#000000', 1, false).setInteractive()
								.on('pointerdown', ()=>{
									System.Config.vibrate(20);
									System.Process.app.audio.play('ring_echo', 1.1, false, this, 0);
									this.scene.run('Modal', [this, 'generic', 'play game']);
								}, this)
								.on('pointerover', ()=> this.playGame.setTint(0xff0000))
								.on('pointerout', ()=> this.playGame.clearTint());

					//sign in

							this.signIn = this.add.text(logoImage.x - 50, logoImage.y + 360, "Account", {font: "35px Bangers"}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(2, 2, '#000000', 1, false).setInteractive()
								.on('pointerdown', ()=>{
									System.Config.vibrate(20);
									System.Process.app.audio.play('ring_echo', 1.1, false, this, 0);
									this.scene.run('Modal', [this.data, 'generic', 'sign/login']);
								})
								.on('pointerover', ()=> this.signIn.setTint(0xff0000))
								.on('pointerout', ()=> this.signIn.clearTint()),

					//Controls

							this.settingsTxt = this.add.text(logoImage.x + 180, logoImage.y + 360, "Settings", {font: "35px Bangers"}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(2, 2, '#000000', 1, false).setInteractive()
									.on('pointerdown', ()=>{
										System.Process.app.audio.play('ring', 0.5, false, this, 0);
										System.Config.vibrate(20);
										this.scene.run('Modal', [this.data, 'generic', 'settings']);
									})
									.on('pointerover', ()=> this.settingsTxt.setTint(0xff0000))
									.on('pointerout', ()=> this.settingsTxt.clearTint());

							//menu inputs
							
								System.Process.app.inputs.implementMenuSelections(this, [this.playGame, this.signIn, this.settingsTxt], this.scene.get('Modal')); 
								
									
								this.cameras.main
									.zoomTo(System.Process.inputType === 'touch' ? System.Process.app.scale.scaleRatio * 1.15 : 0.7, 500)
									.centerOn(logoImage.x, logoImage.y);


								this.tweens.add({targets: playerSprite, x: pastaBass2.x, ease: 'Linear', duration: 10000, repeat: -1, yoyo: true, 
									onRepeat: ()=> playerSprite.setFlipX(false),
									onYoyo: ()=>playerSprite.setFlipX(true)
								});	

								//------------------------ text

									this.add.text(logoImage.x - 140, logoImage.y - 250, `A RECIPE FOR DISASTER`, {font: "35px Bangers"}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(2, 2, '#000000', 1, false);
									this.add.text(logoImage.x - 270, logoImage.y + 230, `You are some sort of spaghetti monster humanoid hybrid!`, {font: "25px Bangers"}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(2, 2, '#000000', 1, false);
									this.add.text(logoImage.x - 240, logoImage.y + 270, `Go on and frolic about, the world is your oyster...`, {font: "25px Bangers"}).setColor('#ffff00').setStroke('#ff0000', 4).setShadow(2, 2, '#000000', 1, false);
									this.add.text(logoImage.x - 230, logoImage.y + 310, `Developed by Ross Marinaro \u00a9REMAREMYINITIALS`, {font: "15px Digitizer"}).setColor('#ffff00').setStroke('#ff0000', 2).setShadow(2, 2, '#000000', 1, false);
								});												
							});
						});
					});
				});
			});
		});
	}
}


