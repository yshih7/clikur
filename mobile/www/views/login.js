import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
//start-es7
@inject(Router)
@needsPreservation("login")
//end-es7
export class Login
{
    //start-es7
    @preserve()
    email;
    @preserve()
    password;
    //end-es7
    
    constructor(router)
    {
        this.Router = router;
    }
    
    attemptLogin() {
        //TODO How will this work??? We still don't know!
    }
    
    signupAction()
    {
        this.Router.navigate("signup");  
    }
}
