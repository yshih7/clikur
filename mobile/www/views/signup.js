import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line

//start-es7
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
    
    createUser() {
        //TODO How will this work??? We still don't know!
    }   
}
