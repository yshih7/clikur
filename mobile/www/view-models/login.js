import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {Validation} from "aurelia-validation"; //jshint ignore:line
import {AuthenticationManager} from "aurelia-firebase"; //jshint ignore:line

//start-es7
@inject(Router, UserData, Validation, AuthenticationManager)
@needsPreservation("login")
//end-es7
export class Login
{
    //start-es7
    @preserve()
    email;
    @preserve()
    password;
    validation;
    //end-es7

    constructor(router, userData, validation, authManager)
    {
        this.router = router;
        this.userData = userData;
        this.authManager = authManager;
        this.validation = validation.on(this, config => config.treatAllPropertiesAsMandatory())
            .ensure("email")
                .isEmail()
                .matches(/rochester.edu\s*$/)
                    .withMessage("You must use your rochester.edu address")
            .ensure("password");
    }

    attemptLogin()
    {
        this.validation.validate()
            .then(() => {
                return this.authManager.signIn(this.email, this.password);
            },
            () => {
                navigator.notification.alert("Invalid email or password", null, "Error");
            })
            .then(user => this.userData.populate(user))
            .then(() => this.router.navigate("home"))
            .catch(err => {
                console.log(err);
                navigator.notification.alert(typeof err === "string" ? err : String(err), null, "Error");
            });
    }

    signupAction() {
        this.router.navigate("signup");
    }
}
