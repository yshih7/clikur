import localforage from "localforage"; /*globals WinJS*/
import {ViewLocator} from "aurelia-framework";

/**
* Function serves as "main function" for Aurelia.
*/
export function configure(aurelia)
{
    //Look for html files in the views/ folder. Move JS to view-models/. This is a workaround for
    //https://github.com/systemjs/systemjs/issues/915 which is itself a workaround for
    //https://github.com/systemjs/systemjs/issues/450
    ViewLocator.prototype.convertOriginToViewUrl = function(origin)
    {
        var moduleId = origin.moduleId;
        var id = (moduleId.endsWith('.js')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;
        return id.replace('view-models', 'views') + '.html';
    };
    
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    
    //Uncomment the line below to enable animation.
    //aurelia.use.plugin('aurelia-animator-css');
    
    //This is the "Main function" for Cordova.
    //We declare it inside of Aurelia's main and use it to wrap the call to aurelia.start()
    document.addEventListener("deviceready", function()
    {
        //The view-model to open first
        var startView = "view-models/app"; 
        
        //If we're resuming from tombstone, rehydrate the preservation object from localstorage
        if (window.winResume) {
            //console.log("Resuming from tombstoned state");
            localforage.getItem("preservation").then(val =>
            {
                //This should only happen once
                window.winResume = false;
                
                if (val) {
                    //console.log("Rehydrating %O", val);
                    window.preservationStore = {
                        rehydrate: val
                    };
                }
                
                return aurelia.start();
            })
            .then(a => a.setRoot(startView, document.body));
        }
        else {
            aurelia.start().then(a => a.setRoot(startView, document.body));
        }
    }, false);
    
    //Windows Phone checkpoint listener
    //This is the equivalent of the Cordova "pause" event.
    //I'm using the native one because I can give it a Promise to wait on before suspending.
    if ("WinJS" in window) {
        WinJS.Application.addEventListener("checkpoint", function(e)
        {
            let store = window.preservationStore;
            let preservation = {
                path: store.path,
                id: store.id,
                values: []
            };

            //Using the keys stored in preservationStore, store the values to be preserved and related setter information.
            for (let item of store.preserve) {
                preservation.values.push({
                    val: store.src[item.key],
                    key: item.setter || item.key,
                    setter: !!item.setter
                });
            }

            //console.log("Preserving: %O", preservation);
            
            e.setPromise(localforage.setItem("preservation", preservation));
        }, false);
    }
}