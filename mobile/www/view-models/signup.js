import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {Router} from "aurelia-router"; //jshint ignore:line
import {Validation} from "aurelia-validation"; //jshint ignore:line

//start-es7
@inject(Router, Validation)
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
    validation;
    //end-es7
    
    constructor(router, validation) {
        this.router = router;
        this.validation = validation.on(this, config => config.treatAllPropertiesAsMandatory())
            .ensure("email")
                .isEmail()
                .matches(/rochester.edu\s*$/)
                    .withMessage("You must use your rochester.edu address")
            .ensure("studentName")
            .ensure("studentID")
                .containsOnlyDigits()
            .ensure("password")
                .hasLengthBetween(8, 16)
                .isStrongPassword(3)
            .ensure("passwordCheck", config => config.computedFrom(["password"]))
                .isEqualTo(() => this.password, "the entered password");
    }
    
    createUser() {
        //TODO How will this work??? We still don't know!
        
        let success = () => navigator.notification.alert("Please check your email for a confirmation message.", () => this.router.navigateBack(), "Account Created");
        
        let failure = () => navigator.notification.alert("One or more inputs were invalid. Please review the form.", null, "Error");
        
        this.validation.validate().then(success, failure);
    }   
}
