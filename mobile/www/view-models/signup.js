import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {Router} from "aurelia-router"; //jshint ignore:line
import {Validation} from "aurelia-validation"; //jshint ignore:line
import {AuthenticationManager} from "aurelia-firebase"; //jshint ignore:line
import Firebase from "firebase";

//start-es7
@inject(Router, Validation, AuthenticationManager)
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
    
    constructor(router, validation, authManager)
    {
        this.router = router;
        this.authManager = authManager;
        
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
    
    createUser()
    {
        let frb_users = new Firebase(window.firebaseUrl + "users");
        
        //So... Firebase can't do email verification. This is problematic. A middleware server is required to handle sending the email.
        //Not worryting about that right now
        //let success = () => navigator.notification.alert("Please check your email for a confirmation message.", () => this.router.navigateBack(), "Account Created");
        
        //We have to immediately log the user in so that we can write their profile
        let register = () => this.authManager.createUserAndSignIn(this.email, this.password);
        
        let validationFailure = () => navigator.notification.alert("One or more inputs were invalid. Please review the form.", null, "Error");
        
        let updateUsers = user => {
            let obj = {
                URID: this.studentID,
                name: this.studentName,
                classes: {},
                isProfessor: false
            };
            return new Promise((resolve, reject) => frb_users.child(user.uid).set(obj, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            }));
        };
        
        let showAlert = () => new Promise((resolve) => {
            return navigator.notification.alert("You are now logged in", () => resolve(), "Registration Successful");
        });
        
        this.validation.validate()
            .then(register, validationFailure)
            .then(updateUsers)
            .then(showAlert)
            .then(() => this.router.navigate("home"))
            .catch(err => {
                console.log(err);
                navigator.notification.alert(typeof err === "string" ? err : String(err), null, "Error");
            });
    }   
}
