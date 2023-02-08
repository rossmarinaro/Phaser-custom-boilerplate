/* Custom projectile class */

    import { System } from '../core/Config'

    export class Projectile extends Phaser.Physics.Arcade.Sprite {

        
        public scene: Phaser.Scene
        public type: string

        private player: any
        private options: any
        private matterBody: Phaser.Physics.Matter.Sprite | null
        private _projectile: Phaser.GameObjects.Group | null

        constructor(
            scene: Phaser.Scene, 
            type: string, 
            player: any, 
            _x: number, 
            _y: number, 
            _texture: string, 
            _frame: string | number, 
            _anims: string, 
            _scale: number,   
            _bounce: number, 
            _angularVelocity: number, 
            _damage: number
        )
        {
           
            super(scene, 0, 0, '');

            scene.add.existing(this);
            scene.physics.add.existing(this);

            this.scene = scene;
            this.type = type;
            this.player = player;
            this.options = {
                x: _x, 
                y: _y, 
                texture: _texture, 
                frame: _frame, 
                anims: _anims,
                scale: _scale, 
                bounce: _bounce,
                angularVelocity: _angularVelocity, 
                damage: _damage
            };
            this.matterBody = null;
            this._projectile = this.player.friendlyFire === true ? System.Process.app.game.groups.projectile : System.Process.app.game.groups.enemyFire,

            this._init();
        }

        private _init(): void
        {
 
            this._projectile?.add(this);
    
            switch(this.type)
            {
         
                case 'keywi': case 'pasta_pump': // no dmg

                    this
                    .setSize(70, 70)
                    .setVisible(false)
                    .setX(this.player.flipX ? this.player.x - 50 : this.player.x + 80);
                break;

                case 'jar': case 'sauce_jar': // no dmg

                    this
                    .setSize(70, 70)
                    .setScale(0.5)
                    .setTexture(this.type)
                    .setAngle(this.player.flipX ? -45 : 45)
                  

                break;

                case 'rolling_pin1': case 'ladle': case 'oven_mit': case 'tongs':

                    this
                    .setSize(50, 50)
                    .setVisible(false)
                    .setX(this.player.flipX ? this.player.x - 50 : this.player.x + 80)
                    .setData({damage: 1});
                break;

                case 'rolling_pin2': case 'pickaxe': case 'spatula': case 'cheese_grater' : 

                    this
                    .setSize(70, 60)
                    .setVisible(false)
                    .setX(this.player.flipX ? this.player.x - 70 : this.player.x + 80)
                    .setData({damage: 2});
                break;

                case 'rolling_pin3':

                    this
                    .setSize(80, 70)
                    .setVisible(false)
                    .setX(this.player.flipX ? this.player.x - 80 : this.player.x + 80)
                    .setData({damage: 3});
                break;

                case 'macaroni': case 'pastina_star':

                    this.x = this.player.flipX === true ? 
                        this.player.x - 50 : this.player.x + 50;
                    
                    this
                        .setTexture(this.type)
                        .setDepth(100)
                        .setSize(45, 45)
                        .setPosition(this.x, this.player.y)
                        .setData({damage: this.type === 'macaroni' ? 1 : 2});

                    let boomerangTween = this.scene.tweens.add({
                        rotation: this.player.flipX === true ? -360 : 360, duration: 500, targets: this, x: this.player.flipX === true ? this.x - 200 : this.x + 200, y: this.y, yoyo: true,
                        onComplete: () => {
                            System.Process.app.game.multiPlayer.attackBool = false;
                            this.player.playerController.currentInput.fireBoomerang = false;
                            this.player.playerController.currentInput.boomerangBool = false;
                            boomerangTween.remove();
                            this.destroy();
                        }
                    });
                break;

                case 'penne_pistol':  

                    System.Process.app.particles.muzzFlashEmitter.emitter.emitParticle(1, this.player.flipX === true ? this.player.x - 70 : this.player.x + 70, this.player.y - 10);

                    System.Process.app.audio.play('penne_pistol_shot', 1, false, this.scene, 0);
                    System.Process.app.audio.play('pistol_shot', 0.5, false, this.scene, 0);
                    
                    this.setTexture('penne_bullet')
                    .setPosition(this.player.flipX === true ? this.player.x - 55 : this.player.x + 55, this.player.y)
                    .setDepth(101)
                    .setSize(this.width, this.height)
                    .setVelocityX(this.player.flipX === true ? -700 : 700)
                    .setData({damage: 1});


                    new System.Process.app.particles(this.scene,  'bullet', [
                        'particles', 
                        'fr03', 
                        this.x, 
                        this.body.velocity.x * this.player.flipX ? this.player.x - 500 : this.player.x + 500, 
                        this.y + 10, 
                        this.y - 10, 
                        this.body.velocity.x * this.player.flipX ? -5 : 5, 
                        0, 
                        1, 
                        0.75, 
                        500,
                        true
                    ]);

                 break;

                case 'automac1000' :

                    System.Process.app.audio.play('automac1000_shot', 2, false, this.scene, 0);
                    System.Process.app.audio.play('pistol_shot', 0.5, false, this.scene, 0);
                    
                    System.Process.app.particles.muzzFlashEmitter.emitter.emitParticle(1, this.player.flipX === true ? this.player.x - 80 : this.player.x + 80, this.player.y - 10);
                    this.setTexture('automac_1000_bullet')
                    .setPosition(this.player.flipX === true ? this.player.x - 60 : this.player.x + 60, this.player.y)
                    .setVelocityX(this.player.flipX === true ? -800 : 800)
                    .setSize(this.width, this.height)
                    .setDepth(101)
                    .setData({damage: 2});
                    
                    this.body['setAllowRotation'];
                    this.body['setAngularVelocity'](this.player.flipX === true ? -700 : 700);


                    new System.Process.app.particles(this.scene,  'bullet', [
                        'particles', 
                        'fr03', 
                        this.x, 
                        this.body.velocity.x * this.player.flipX ? this.player.x - 500 : this.player.x + 500, 
                        this.y + 10, 
                        this.y - 10, 
                        this.body.velocity.x * this.player.flipX ? -5 : 5, 
                        0, 
                        1, 
                        0.75, 
                        500,
                        true
                    ]);

                break;
                case 'grenade' :

                    System.Process.app.game.groups.grenades.add(this);
                    this.setTexture('grenade')
                    .setPosition(this.player.flipX === true ? this.player.x - 75 : this.player.x + 75, this.player.y - 30)
                    .setCircle(25)
                    .setOffset(30, 30);
                    this.matterBody = this.scene.matter.add.sprite(this.player.flipX === true ? this.player.x - 75 : this.player.x + 75, this.player.y - 30, '')
                    .setVisible(false)
                    .setCircle(25)
                    ['setBounce'](1)
                    .setVelocity(this.player.flipX === true ? -5 : 5, 1);
                    
                    this.scene.events.on('update', ()=> {
                        if (this.active === true)
                            this.setPosition(this.matterBody?.x, this.matterBody?.y);
                    });
                    this.scene.time.delayedCall(1000, () => {
                        if (!this.active)
                            return;
                        this.anims.play('sauce_explosion_anims', true)
                        ['setCircle'](65)
                        .setOffset(0, -30)
                        .setData({damage: 2, function: 'bomb'});
                        System.Process.app.audio.play('dynamite_explosion', 3, false, this.scene, 0);
                        this.scene.time.delayedCall(800, () => {
                            System.Process.app.game.groups.grenades.getChildren().map(e => e.destroy());
                            this.matterBody?.destroy();
                            this.destroy();
                        });
                    });
                break;

                case 'dynamite' :
                
                System.Process.app.game.groups.dynamites.add(this);
                    this.setTexture('dynamite')
                    .setPosition(this.player.flipX === true ? this.player.x - 80 : this.player.x + 80, this.player.y - 20)
                    .setScale(0.6)
                    .setDepth(101);
                    System.Process.app.game.groups.dynamites.getChildren().map(e => e.anims.play('dynamite_anims', true));
                    this.matterBody = this.scene.matter.add.sprite(this.player.flipX === true ? this.player.x - 80 : this.player.x + 80, this.player.y - 20, '')
                    .setCircle(15)
                    ['setVisible'](false)
                    .setBounce(0.8)
                    .setVelocity(this.player.flipX === true ? -5 : 5, 1);

                    this.scene.events.on('update', ()=> {
                        if (this.active === true)
                            this.setPosition(this.matterBody?.x, this.matterBody?.y);
                    });

                    this.scene.time.delayedCall(2000, () => { 

                        if (!this.active)
                            return;

                        let explosions = [
                            new Projectile(this.scene, '', this, this.x - 20, this.y - 100, 'dynamite_atlas', 'fr05', '', 0.8, 0.5, 0, 0),
                            new Projectile(this.scene, '', this, this.x - 10, this.y - 100, 'dynamite_atlas', 'fr05', '', 1, 0.5, 0, 0),
                            new Projectile(this.scene, '', this, this.x + 10, this.y - 100, 'dynamite_atlas', 'fr05', '', 0.8, 0.5, 0, 0),
                            new Projectile(this.scene, '', this, this.x + 20, this.y - 100, 'dynamite_atlas', 'fr05', '', 1, 0.5, 0, 0)
                        ];

                        System.Process.app.audio.play('dynamite_explosion', 3, false, this.scene, 0);
                        System.Process.app.game.groups.dynamites.getChildren().map(e => e.setActive(false).destroy());

                    //add explosions to projectile group

                        explosions.forEach(i => {
                            this._projectile?.add(i);
                            i
                            .setCircle(25)
                            .setVelocity(Phaser.Math.Between(-250, 250), Phaser.Math.Between(-250, 250))
                            .setAngularVelocity(Math.random() * 10 + 1 > 5 ? -1200 : 1200)
                            .setData({damage: 2, function: 'bomb'});
                        });
                        
                    });
                break;

                case 'rigatoni_rocket_launcher' : 


                    this.setTexture('meatball_rocket')
                    .setPosition(this.player.flipX ? this.player.x - 60 : this.player.x + 60, this.player.y)
                    .play('meatball_rocket_anims', true)
                    .setFlipX(this.player.flipX)
                    .setVelocityX(this.player.flipX ? -700 : 700)
                    .setDepth(100)
                    .setSize(this.width, this.height)
                    .setData({damage: 3});
    
                    new System.Process.app.particles(this.scene, 'bullet', [
                        'particles', 
                        'fr03', 
                        this.x, 
                        this.body.velocity.x * this.player.flipX ? this.player.x - 500 : this.player.x + 500, 
                        this.y + 10, 
                        this.y - 10, 
                        this.body.velocity.x * this.player.flipX ? -5 : 5, 
                        0, 
                        1, 
                        0.75, 
                        500,
                        true
                    ]);

                break;

            
            //------------------------------ pastaform attacks

                case 'pastaform_weapon_fr00':

                    this.setTexture('pastaform_weapon')
                    .play('pastaform_weapon_anims1', true)
                    .setDepth(100)
                    .setSize(this.width, this.height)
                    .setData({damage: 1});
                break;
                case 'pastaform_weapon_fr05':
                    
                    this.setTexture('pastaform_weapon')
                    .play('pastaform_lasso_anims', true)
                    .setDepth(100)
                    .setSize(this.width, this.height)
                    .setData({damage: 2});

                break;
                case 'pastaform_weapon_fr04':
                    
                    this.setTexture('pastaform_weapon')
                    .play('pastaform_weapon_anims2', true)
                    .setPosition(this.player.flipX === true ? this.player.x - 40 : this.player.x + 40, this.player.y)
                    .setFlipX(this.player.flipX)
                    .setVelocityX(this.player.flipX === true ? -700 : 700)
                    .setDepth(100)
                    .setSize(this.width, this.height)
                    .setData({damage: 3});
                    
                break;

            //---------------------------------------------------------- optional type (monsters, bosses, custom projectile)
                
                case null: case '':

                    if (this.options.texture !== null && this.options.frame !== null)
                    {

                        this
                        .setTexture(this.options.texture, this.options.frame)
                        .setPosition(this.options.x, this.options.y)
                        .setVelocity(this.player.flipX === true ? 500 : -500, Phaser.Math.Between(200, -200))
                        .setAngularVelocity(this.player.flipX === true ? -this.options.angularVelocity : this.options.angularVelocity)
                        .setScale(this.options.scale)
                        .setBounce(this.options.bounce)
                        .setSize(this.width, this.height)
                        .setData({damage: this.options.damage});

                        if (this.options.anims !== null)
                            this.anims.play(this.options.anims, true);    
                    }

                break;

            }      
        //------------------------------------------------- on scene update

            this.scene.events.on('update', ()=> {

                if (!this.active)
                    return;

                else if (System.Process.app.inventory.handheldItems.includes(this.type))
                {
                    this.setY(this.player.y);
                    this.scene.time.delayedCall(500, ()=> this.destroy());
                }
                else if (System.Process.app.inventory.handheldItemsAlt.includes(this.type))
                {
                    this.setPosition(this.player.flipX ? this.player.x - 50 : this.player.x + 80, this.player.y)
                        .setFlipX(this.player.flipX ? true : false);
                    this.scene.time.delayedCall(1200, ()=> this.destroy());
                }
                if (this.type === 'jar' || this.type === 'sauce_jar')
                    this.setPosition(this.player.flipX ? this.player.x - 50 : this.player.x + 50, this.player.y);

            });

        // destroy projectile

            setTimeout(()=> {

                if (this.matterBody !== null)
                    this.matterBody.destroy();

                if (this.active)
                    this.destroy();
            }, 3000);
            
        }
    }



