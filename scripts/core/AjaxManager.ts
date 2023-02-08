/* HTTP REQUESTS FROM WEB, CORDOVA, ELECTRON ENVIRONMENTS */

import { System } from "./Config";



export class AjaxManager { 


    private static headers: any
    private static method: string

    //proxy server address (mobile version) or null if same 

    private static proxyConnection: string | null = System.Config.internet.proxy ? 
        'https://pastaboss.onrender.com/' : null;

//-------------------------- make xhr http request

    public static async xhr(_path: string, method: string, body: Object): Promise<XMLHttpRequest>
    {

        const baseDir = AjaxManager.proxyConnection ? AjaxManager.proxyConnection :
                        window['fetch_electron'] ? 'http://localhost:8080/' : '/', 

              path = baseDir + _path,
              format = await AjaxManager.request(method, body),
              cordova = window['cordova_xhr'] && typeof window['cordova_xhr'] === 'function',
              electron = window['fetch_electron'] && typeof window['fetch_electron'] === 'function',

            request = { 
                method: format.method, 
                headers: format.headers,
                body: cordova || electron ? format['body'] : JSON.stringify(format['body'])     
            };
   
        if (cordova) 
            return window['cordova_xhr'](path, request); 
        
        if (electron)
            return window['fetch_electron'](path, request);
        

        const standardFetch = await fetch(path, request),
              data = await standardFetch.json();

        return data;
    }


//------------------ format request

    private static async request(type: string, body: Object): Promise<{method: string, headers: any}>
    {
        AjaxManager.headers = { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + localStorage.getItem('webtoken')
            //mode: 'cors', same-origin
            //credentials: 'include', //GET ONLY
        };

        switch (type)
        {
            case 'GET': AjaxManager.method = 'GET'; break;
            case 'POST': AjaxManager.method = 'POST'; break;
            case 'PUT': AjaxManager.method = 'PUT'; break;
        }

        const format = {
            method: AjaxManager.method,
            headers: AjaxManager.headers
        };

        type === 'POST' || type === 'PUT' ? 
            format['body'] = body : delete format['body'];

        return format;
    }  
} 






