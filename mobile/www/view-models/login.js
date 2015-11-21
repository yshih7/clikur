import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line

//start-es7
@inject(Router, UserData)
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
    
    constructor(router, userData)
    {
        this.router = router;
        this.userData = userData;
    }
    
    attemptLogin() {
        //TODO How will this work??? We still don't know!
        
        //Just log in for now
        this.userData.populate(this.email);
        
        //Okay. So without this timeout here, if you log out and log back in, every course gets listed twice.
        //Do I know why that happens? No. Do I know why this fixes it? Also no. ~~@stesen
        setTimeout(() => this.router.navigate("home"), 0);
    }
    
    signupAction()
    {
        this.router.navigate("signup");  
    }

    // temporary action, for testing askQuestion page
    askQuestion()
    {
        this.router.navigate("courses/123/ask");
    }
}
