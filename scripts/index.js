import '../style.css';

import { System } from './core/Config';
import Application from './core/Application';

'use strict';

//--------------------- on load

    window.onload = async () => System.Process.app = new Application(System.Process); 

//-------------------- off load

    window.onbeforeunload = async () => System.Process.app.account.logout();

 //------------------- window error

    //window.onerror = function(err, url, line){
    //alert(`${err}, \n ${url}, \n ${line}`);
        //window.location.reload();
    //     return true;
    // } 