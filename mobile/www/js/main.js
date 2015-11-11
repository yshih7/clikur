import {default as localforage} from "localforage"; /*globals WinJS*/

export function configure(aurelia)
{
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    
    //Uncomment the line below to enable animation.
    //aurelia.use.plugin('aurelia-animator-css');
    
    document.addEventListener("deviceready", function()
    {
        var startView = "views/app"; 
        
        if (window.winResume) {
            //console.log("Resuming from tombstoned state");
            localforage.getItem("preservation").then(val =>
            {
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
    
    if ("WinJS" in window) {
        WinJS.Application.addEventListener("checkpoint", function(e) {
            let store = window.preservationStore;
            let preservation = {
                path: store.path,
                id: store.id,
                values: []
            };

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
