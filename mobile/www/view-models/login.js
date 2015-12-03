import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {Validation} from "aurelia-validation";

//start-es7
@inject(Router, UserData, Validation)
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

    constructor(router, userData, validation)
    {
        this.router = router;
        this.userData = userData;
        this.validation = validation.on(this, config => config.treatAllPropertiesAsMandatory())
            .ensure("email")
                .isEmail()
                .matches(/rochester.edu\s*$/)
                    .withMessage("You must use your rochester.edu address")
            .ensure("password");
    }

    attemptLogin() {
        //TODO How will this work??? We still don't know!

        this.validation.validate().then(() => {
            //Just log in for now
            this.userData.populate(this.email);

            //Okay. So without this timeout here, if you log out and log back in, every course gets listed twice.
            //Do I know why that happens? No. Do I know why this fixes it? Also no. ~~@stesen
            setTimeout(() => this.router.navigate("home"), 0);
        },
        () => {
            navigator.notification.alert("Invalid email or password", null, "Error");
        });
    }

    signupAction()
    {
        this.router.navigate("signup");
    }
}
