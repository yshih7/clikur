import localforage from "localforage"; /*globals WinJS*/
import {ViewLocator} from "aurelia-framework";
import {SimplePopUpStrategy} from "js/SimplePopUpStrategy";

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
        .developmentLogging()
        .plugin("aurelia-animator-velocity")
        .plugin("aurelia-validation", config => config.useViewStrategy(new SimplePopUpStrategy()))
        .plugin("aurelia-firebase", config => config.setFirebaseUrl("https://blinding-heat-6163.firebaseio.com/"));
    
    //Making this global for convenience
    window.firebaseUrl = "https://blinding-heat-6163.firebaseio.com/";

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


    //Windows Phone specific listeners
    if ("WinJS" in window)
    {
        //Windows Phone checkpoint listener
        //This is the equivalent of the Cordova "pause" event.
        //I'm using the native one because I can give it a Promise to wait on before suspending.

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

        //Windows Phone uses click events for interaction, not touchevents.
        //For sake of code simplicity/DRY, just fire a touchend event on anything that gets "clicked"
        document.addEventListener("click", function(e)
        {
            var touchE = new CustomEvent("touchend", {bubbles: true});
            e.target.dispatchEvent(touchE);

            //Since we're not actually using this event, we don't need it to finish traversing
            e.stopImmediatePropagation();
        }, true);
    }
}
