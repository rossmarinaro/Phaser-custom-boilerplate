import { System } from '../core/Config';

`use strict`;


export class GameOver extends Phaser.Scene {

    private returned: boolean

    constructor(){
      super('GameOver');
    }

    private create(): void
    {



    }

    //-------------------

    private returnGame (): void
    {

      if (this.returned)
        return;

      this.returned = true;

      this.sound.stopAll();

      
      this.time.delayedCall(3200, ()=> {

        System.Process.app.events.ee.emit('exit');
      });
    }
  }

  