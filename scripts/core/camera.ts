
import { System } from './Config';


export class Camera {

    private static isFollowing: boolean = false;

    //------------------------------------ set zoom
    

    public static setZoom(scene: Phaser.Scene): number
    {
        return !System.Config.isDesktop(scene) ? 0.85 : 1;
    }

    //------------------------------------ check zoom


    public static checkZoom(scene: any): void
    {
        if (scene.scene.get('Controller').toggleZoom === false)
            scene.cameras.main.setZoom(!System.Config.isDesktop(scene) ? 1 : 1.2); 
    }


    //---------------------------------- init camera


    public static init(scene: Phaser.Scene): void
    {
        scene.cameras.main
            .setZoom(1)
            .fadeIn(3000, 0, 0, 0)
            .setBounds(0, 0, System.Process.app.maps.map.widthInPixels, System.Process.app.maps.map.heightInPixels);   
    }


    //----------------------------------- pan from player


    public static panFromPlayer (scene: any, x: number, y: number): void
    {

        Camera.isFollowing = false;

        scene.cameras.main
            .pan(x, y, 500, 'Power2')
            .stopFollow(scene.player.focalPoint)
            .zoomTo(Camera.setZoom(scene), 1500);
    }


    //----------------------------------- follow player


    public static followPlayer (scene: any, player: typeof System.Process.app.game.player): void
    {

        if (
            !System.Process.app.game.gameState || 
            System.Process.app.game.cutScene === true || 
            System.Process.app.game.fightBoss === true
        )
        return;

        const startFollow = () => {
                 
            this.checkZoom(scene);
            scene.cameras.main.startFollow(player.focalPoint);

            let _y = System.Config.isLandscape(scene) ? 
                System.Config.isDesktop(scene) ? player.y - 50 : player.y /* + 150  */
            : player.y;

            //set player position

                player.focalPoint.setPosition(player.x, _y);
        }

        if (Camera.isFollowing === false) 
        {
            scene.cameras.main.pan(scene.player.x, scene.player.y, 800);

            scene.time.delayedCall(800, ()=> {        

                scene.cameras.main.setZoom(1); 
                startFollow();
                Camera.isFollowing = true;
            });
        }
        else 
            startFollow();
    }
}