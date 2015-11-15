import {Redirect, Router} from "aurelia-router"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line

//start-es7
@inject(Router)
//end-es7
export class App {
    constructor(router)
    {
        router.pipelineProvider.steps.splice(1, 0, NavigationNotifier);
        
        if ("WinJS" in window) {
            router.pipelineProvider.steps.splice(2, 0, PreserveState);
        }
    }
    
    configureRouter(config, router)
    {
        this.router = router;
        
        config.map([
            //TODO For now just going to the login screen directly. Once we have the Home screen written, switch to going
            //there by default and add logic to the pipeline to redirect if user isn't logged in
            {route: ["", "login"], name: "login", moduleId: "view-models/login", home: true},
            {route: "signup", name: "signup", moduleId: "view-models/signup", defaultBack: "login"}
        ]);
        
        config.addPipelineStep("modelbind", ApplyBackHandler);
    }
}

class PreserveState {
    run(instruction, next)
    {
        var store = window.preservationStore || (window.preservationStore = {});
        var currentPath = instruction.fragment;
        //console.log("Emitting instruction: %O", instruction);
        
        //console.log("Checking for stored path. Current path is " + currentPath);
        
        if (store.rehydrate && store.rehydrate.path)
        {
            let newPath = store.rehydrate.path;
            //console.log("Previous path found: " + newPath);
            store.rehydrate.path = null;
            if (newPath !== currentPath) {
                return next.cancel(new Redirect(newPath));
            }
        }
        
        store.path = currentPath;
        store.id = null;
        store.preserve = [];
        
        return next();
    }
}

//start-es7
@inject(Router)
//end-es7
class ApplyBackHandler
{
    constructor(router) {
        this.router = router;
    }
    
    run(instruction, next)
    {
        if (instruction.config.home) {
            if (document.backListener)
            {
                document.removeEventListener("backbutton", document.backListener, false);
                delete document.backListener;
            }
        }
        else if (!document.backListener)
        {
            (function(router) {
                document.backListener = function()
                {
                    document.navigationWasSuccessful = false;
                    router.navigateBack();
                    
                    setTimeout(function() {
                        if (!document.navigationWasSuccessful)
                        {
                            var config = router.currentInstruction.config;
                            if (config.defaultBack) {
                                router.navigate(config.defaultBack);
                            }
                            else {
                                console.warn(`Route ${config.name} does not have a defaultBack property`);
                            }
                        }
                    }, 400);
                };
                
                document.addEventListener("backbutton", document.backListener, false);
            })(this.router);
        }
        
        return next();
    }
}

class NavigationNotifier {
    run(instruction, next)
    {
        document.navigationWasSuccessful = true;
        return next();
    }
}
