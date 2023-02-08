import { System } from './Config';


export class LoginManager {

//------------------------------------- sign up

    public static async signUp (scene: Phaser.Scene, username: string, password: string, email: string): Promise<void>
    {

        if (username.length >= 2 && password.length >= 8) 
        {
            System.Process.app.audio.play('ring_echo', 1.1, false, scene, 0);

            await System.Process.app.ajax.xhr('sign-up', 'POST', {username, password, email, data: {config: System.Process.app.gameData}})

            .then((e: {success: boolean}) => System.Process.app.ui.displayMessage(e.success ? `Account ${username} created.` : 'User already exists.', true, true))
            .catch((e: Error) => System.Process.app.ui.displayMessage(`'ERROR:' ${+ e}`, true, true));
        }

        else System.Process.app.audio.play('error_sound', 4, false, scene, 0);
    }

//------------------------------------- log in

    public static async login (scene: Phaser.Scene, username: string, password: string, callback: Function): Promise<void>
    {

        if (username.length >= 2 && password.length >= 8)
        {
        
            System.Process.app.audio.play('ring_echo', 1.1, false, scene, 0);
            scene['promptDOM'].setHTML(`<div class="loader">Loading...</div>`);
            scene.scene.get('MainMenu')['playGame'].disableInteractive();
            scene.scene.get('MainMenu')['signIn'].disableInteractive();
            scene.scene.get('MainMenu')['settingsTxt'].disableInteractive(); 
            
            await System.Process.app.ajax.xhr('login', 'PUT', { username, password }) 

            .then((data: any) => {    

                if (data.loggedIn)
                {
                    localStorage.setItem('webtoken', data.webtoken);
                    System.Process.app.account.username = data.username;
                    System.Process.app.account.loggedIn = true;
                    System.Process.app.account.paid = data.paid;
                    System.Process.app.gameData = data.data; 
                    System.Process.app.ui.displayMessage(`Welcome back ${data.username}`, true, true);
                    callback();
                }
                else 
                {
                    System.Process.app.ui.displayMessage('Username or password is incorrect.', true, true);
                    callback();
                }
            })
            .catch((err: Error) => {
                System.Process.app.ui.displayMessage(`NETWORK ERROR: ${err}`, true, true);
                callback();
            });

        }
        
    // error

        else 
        {
            System.Process.app.audio.play('error_sound', 4, false, scene, 0);
            callback();
        }
    }

//----------------------------------------- log out

    public static async logout(): Promise<void>
    {
        
        const account = System.Process.app.account;

        if (account.loggedIn === true)
        {

            localStorage.removeItem('webtoken');

            await System.Process.app.ajax.xhr('logout', 'PUT', {username: account.username})
                .then((data: any) => System.Process.app.ui.displayMessage(`${data.username} logged out.`, true, true))
                .catch((e: Error) => System.Process.app.ui.displayMessage(`NETWORK ERROR: ${e}`, true, true));

            account.username = null;
            account.loggedIn = false;
        }
        else
            return;
    }
} 