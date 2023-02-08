//----------------------------------------- parse asset resource manifests

export async function parseResources(scene: Phaser.Scene, json: JSON): Promise<Readonly<void>>
{

   //--------------------- images (png)

       if (json.hasOwnProperty('image')) 
       {
           for (let key in json['image']) 
           {
               let keys: any = Object.keys(json['image'][key]).find(i => i); 
               for (let value in json['image'][key]) 
               {
                   let values = json['image'][key][value];
                   scene['load']['image'](keys, values); 
               }
           }
       }

   //-------------------- audio (ogg)

       if (json.hasOwnProperty('audio'))
       {
           for (let key in json['audio']) 
           {
               let keys: any = Object.keys(json['audio'][key]).find(i => i); 
               for (let value in json['audio'][key]) 
               {
                   let values = json['audio'][key][value];
                   scene['load'].audio(keys, values); 
               }
           }
       }

   //------------------------ obj

       if (json.hasOwnProperty('obj'))
       {
           for (let key in json['obj']) 
           {
               let keys: any = Object.keys(json['obj'][key]).find(i => i); 
               for (let value in json['obj'][key]) 
               {
                   let obj = json['obj'][key][value][0], 
                       mtl = json['obj'][key][value][1];
                   scene['load'].obj(keys, obj, mtl); 
               }
           }
       }

   //--------------------- atlas

       if (json.hasOwnProperty('atlas'))
       {
           for (let key in json['atlas']) 
           {
               let keys: any = Object.keys(json['atlas'][key]).find(i => i); 
               for (let value in json['atlas'][key]) 
               {
                   let img = json['atlas'][key][value][0], 
                       data = json['atlas'][key][value][1];
                   scene['load'].atlas(keys, img, data); 
               }
           }
       }

   //------------------------- spritesheet

       if (json.hasOwnProperty('spritesheet'))
       {
           for (let key in json['spritesheet']) 
           {
               let keys: any = Object.keys(json['spritesheet'][key]).find(i => i);
               for (let key2 in json['spritesheet'][key]) 
               {
                   let img = json['spritesheet'][key][key2][0],
                       data = json['spritesheet'][key][key2][1];
                  scene['load'].spritesheet(keys, img, {frameWidth: data.frameWidth, frameHeight: data.frameHeight}); 
               }
           }
       }

   //-------------------------- tilemaps

       if (json.hasOwnProperty('tilemapTiledJSON'))
       {
           for (let key in json['tilemapTiledJSON']) 
           {
               let keys: any = Object.keys(json['tilemapTiledJSON'][key]).find(i => i); 
               for (let key2 in json['tilemapTiledJSON'][key]) 
               {
                  let data = json['tilemapTiledJSON'][key][key2];
                  scene['load'].tilemapTiledJSON(keys, data);  
               }   
           }
       }
       
    ////------------------------------3d only
       
    if (!scene['third'])
       return;

    for (let key in json['assets']) 
        {
            let keys: any = Object.keys(json['assets'][key]).find(i => i);  
            for (let value in json['assets'][key]) 
            {
                let values = json['assets'][key][value];  
                scene['third'].load.preload(keys, values); 
            }
        }
}
