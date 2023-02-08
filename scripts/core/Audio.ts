/* AUDIO */

import { System } from './Config';


export class AudioManager {

    public static noAudio: boolean = false;
    public static default: boolean = false;
    public static sound: any = null;
    public static cached: string[] = [];  

    public static music: {

        track: string, 
        fadeIn: Function, 
        fadeOut: Function, 
        play: Function

    } = {

        track: '',

        fadeIn: (src: string, vol: number, scene: any): void => {

            for (let music of scene.sound.sounds) 
                if (music.key === AudioManager.music.track) 
                    scene.tweens.add({ targets: music, volume: { value: 0, ease: 'Power1', duration: 500 }});
            let obj = scene.sound.add(src).setLoop(true).setVolume(0);
            scene.tweens.add({ targets: obj, volume: { value: vol, ease: 'Power1', duration: 3000}, onStart: ()=> obj.play()});
        },

        fadeOut: (src: string, vol: number, scene: any): void => {

            for (let music of scene.sound.sounds) 
            {
                if (music.key === src)
                { 
                    scene.tweens.add({targets: music, volume: { value: 0, ease: 'Power1', duration: 3000 },  
                    onComplete: () => {
                        AudioManager.music.play(scene);
                        scene.tweens.add({ targets: music, volume: { value: vol, ease: 'Power1', duration: 3000 }})
                        music.stop();
                        scene.sound.removeByKey(music); 
                    }});
                }
            }
        },

        play: async (scene: Phaser.Scene): Promise<void> =>{ 

           
            const track = await AudioManager.getStageTheme(scene.data['currentStage']);

            AudioManager.music.track = track;
            
            let src = scene.sound.add(track)['setLoop'](true).setVolume(0.8);
            src.play();
        }
    };
    

    //------------------------------------------------------ play audio


    public static play (
        
        src: string, 
        vol: number, 
        loop: boolean, 
        scene: Phaser.Scene, 
        detune: number
        
    ): void
    {

        AudioManager.cached.push(src);
        AudioManager.cached.filter((e: string) => { 

        AudioManager.sound = scene.sound.add(src);
        AudioManager.sound.setLoop(loop).setVolume(vol).setDetune(detune);

    //if sound is already in cache, remove it

            if (e.toString() === src) 
                AudioManager.cached.splice(AudioManager.cached.indexOf(src), 1);

            AudioManager.sound.play();  
        });
    }

    //-------------------------------------------------------- stop audio


    public static stop (src: string, scene: any): void 
    { 
        for (let snd of scene.sound.sounds) 
            if (snd.key == src) 
                snd.stop();
    }

    //----------------------------------------------------- get stage theme


    private static async getStageTheme (stage: string): Promise<string>
    {

        switch (stage)
        {
            case 'Middle Yeast' : case 'Meatball Mountain' : return System.Process.app.timeOfDay > 17 ? 'middle_pastern' : 'midyeast';
            case 'Lab' : case 'Melon Land' : return System.Process.app.timeOfDay > 17 ? 'electronic' : 'pastaboss_theme';
            case 'Pub' : case 'Sushi Bar' : case 'Cafe' : case 'Weapon Shack' : case 'Pawn Shop' : return 'level1';
            case 'Freezer' : case 'Leaning Tower Of Pizza' : return System.Process.app.timeOfDay > 17 ? 'mushroompizza' : 'mushroompizza2';
            case 'Scone Beach' : case 'Beercano' : return System.Process.app.timeOfDay > 17 ? 'track3' : 'pastafari';
            case 'Red Sea' : case 'Carb Kingdom' : return System.Process.app.timeOfDay > 17 ? 'track4' : 'level2';
            case 'Freezer Courtyard' : case 'Greater GraterVille' : return System.Process.app.timeOfDay > 17 ? 'track1' : 'lv2ext';
            case 'The Oven' : case 'Tunnel' : case 'SkeetShoot': return System.Process.app.timeOfDay > 17 ? 'slap' : 'al_electro';
            case 'Cotton Candy Clouds' : case 'Fish Town' : case 'Pinball' : return System.Process.app.timeOfDay > 17 ? 'track2' : 'phryg1';
            case 'Swanky Franks' : case 'Flukrainian Club' : return System.Process.app.timeOfDay > 17 ? 'dance' : 'minimal';
            case 'Strip Club' : case 'Secret Club' : return System.Process.app.timeOfDay > 17 ? 'funkhop' : 'pastahouse';
            case 'Sushi Restaurant':  case 'Tomb' : case 'Seashell Mini Game': return 'cave';
            case 'Herb Garden' : case 'Crucif Forest' : return System.Process.app.timeOfDay > 17 ? 'creepy' : 'midyeast3';
            case 'Bubble Mini Game' : case 'Arcade' : return 'minigame1_audio'; 
            case '?' : case 'Fun House' : case 'DeathMatch' : return 'fight_players'; //racing mini game
            default: return 'pastaboss_theme';
        }
    }
    
}