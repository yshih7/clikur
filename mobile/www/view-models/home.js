import {UserData} from "js/UserData"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line

//start-es7
@inject(UserData)
//end-es7
export class Home
{
    //start-es7
    userData: UserData;
    //end-es7
    
    constructor(userData) {
        this.userData = userData;
    }
}
