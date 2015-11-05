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
            //TODO
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
