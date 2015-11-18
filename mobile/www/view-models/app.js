import {Redirect, Router} from "aurelia-router"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
/*globals device*/

//start-es7
@inject(Router)
//end-es7
export class App
{
    //start-es7
    deviceHasBackButton: boolean;
    router: Router;
    //end-es7
    
    constructor(router)
    {
        //Detect if the platform is one without a physical back button
        if (device.platform === "iOS" || device.platform === "firefoxos") {
            this.deviceHasBackButton = false;
        }
        else {
            this.deviceHasBackButton = true;
        }
        
        this.router = router;
        
        //Add pipeline steps...
        //Notifies the backbutton code that the router did, in fact, navigate
        router.pipelineProvider.steps.splice(1, 0, NavigationNotifier);
        
        if ("WinJS" in window)
        {
            //Handles picking up where the user left off after tombstoning
            router.pipelineProvider.steps.splice(2, 0, PreserveState);
            router.pipelineProvider.steps.splice(4, 0, LoginVerifier);
        }
        
        //Checks if the user is logged in
        router.pipelineProvider.steps.splice(3, 0, LoginVerifier);
    }
    
    configureRouter(config, router)
    {
        this.router = router;
        
        config.map([
            {route: "login", name: "login", moduleId: "view-models/login", home: true, login: true},
            {route: "signup", name: "signup", moduleId: "view-models/signup", defaultBack: "login", login: true},
            {route: ["", "home"], name: "home", moduleId: "view-models/home", home: true}
        ]);
        
        //Add pipeline step for handling backbutton handler attachment
        config.addPipelineStep("modelbind", ApplyBackHandler);
    }
    
    /**
    * Function for handling taps on the software back button
    * Just manually fires the backbutton event to reuse code
    */
    backButtonAction()
    {
        var e = new CustomEvent("backbutton", {bubbles: true});
        document.dispatchEvent(e);
    }
}

/**
* Reacts to stored paths in the preservationStore and navigates there instead of wherever else.
* Updates the object with the new path
*/
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

/**
* Manages the backbutton handler
* Cordova's API is (for some reason) such that when you want the back button to leave the app in the system-appropriate way,
* you must unhook the event listener.
* This pipeline steps hooks up the listener for internal pages and removes it for pages marked "home" in router config
*/
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
            (function(router)
            {
                //Function to be used as backbutton handler
                document.backListener = function()
                {
                    //Aurelia's browser history implementation just defers to window.history, which provides no
                    //reliable way to tell if the history stack has content.
                    //Workaround: Try to go back no matter what. Then check after a delay to see if anything actually happened.
                    document.navigationWasSuccessful = false;
                    router.navigateBack();
                    
                    setTimeout(function()
                    {
                        //If there's no page in the real back history, defer to the "defaultBack" property on the route config object
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
                    }, 100);
                };
                
                document.addEventListener("backbutton", document.backListener, false);
            })(this.router);
        }
        
        return next();
    }
}

/**
* Simply sets the variable that says "yes, the view changed".
*/
class NavigationNotifier {
    run(instruction, next)
    {
        document.navigationWasSuccessful = true;
        return next();
    }
}

//start-es7
@inject(UserData)
//end-es7
class LoginVerifier
{
    constructor(userData)
    {
        this.userData = userData;
        if (!userData.isInitialized) {
            userData.init();
        }
    }
    
    run(instruction, next) {
        if (!this.userData.isLoggedIn && !instruction.config.login) {
            return next.cancel(new Redirect("login"));
        }
        else {
            return next();
        }
    }
}
