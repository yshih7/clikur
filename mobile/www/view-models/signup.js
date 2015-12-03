import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {Router} from "aurelia-router" //jshing ignore:line

//start-es7
@inject(Router)
@needsPreservation("signup")
//end-es7
export class Signup
{
    //start-es7
    @preserve()
    email;
    @preserve()
    studentName;
    @preserve()
    studentID;
    @preserve()
    password;
    @preserve()
    passwordCheck;
    //end-es7
    
    constructor(router) {
        this.router = router;
    }
    
    createUser() {
        //TODO How will this work??? We still don't know!
        navigator.notification.alert("Please check your email for a confirmation message.", () => this.router.navigateBack(), "Account Created");
    }   
}
