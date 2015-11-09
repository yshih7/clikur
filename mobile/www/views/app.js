import {Redirect} from "aurelia-router";
import {inject} from "aurelia-framework"; //jshint ignore:line

//start-es7
@inject(Router)
//end-es7
export class App {
    constructor(router) {
        if ("WinJS" in window) {
            router.pipelineProvider.steps.splice(1, 0, PreserveState);
        }
    }
    
    configureRouter(config, router)
    {
        this.router = router;
        
        config.map([
            //TODO For now just going to the login screen directly. Once we have the Home screen written, switch to going
            //there by default and add logic to the pipeline to redirect if user isn't logged in
            {route: ["", "login"], name: "login", moduleId: "views/login"}
        ]);
    }
}

class PreserveState {
    run(routingContext, next)
    {
        var store = window.preservationStore || (window.preservationStore = {});
        var currentPath = routingContext.nextInstruction.config.moduleId;
        
        if (store.rehydrate && store.rehydrate.path)
        {
            let newPath = store.rehydrate.path;
            store.rehydrate.path = null;
            if (store.rehydrate.path !== currentPath) {
                return next.cancel(new Redirect(newPath));
            }
        }
        
        store.path = currentPath;
        store.id = null;
        store.preserve = [];
    }
}
