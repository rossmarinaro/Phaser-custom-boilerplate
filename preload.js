
/* ELECTRON PRELOAD SCRIPT */

const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', ()=> {

  //------- log platform versions

    for (const dependency of ['chrome', 'node', 'electron'])
      console.log(`${dependency}-version`, process.versions[dependency]);

  //-------- fetch
  
    window.fetch_electron = async function(path, request) { return ipcRenderer.invoke('send data', [path, request]); }
}); 