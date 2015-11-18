import {UserData} from "js/UserData"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {Router} from "aurelia-router"; //jshint ignore:line

//start-es7
@inject(UserData, Router)
//end-es7
export class Home
{
    //start-es7
    userData: UserData;
    //end-es7
    
    constructor(userData, router)
    {
        this.userData = userData;
        this.router = router;
    }

    logOutAction()
    {
        this.userData.clear();
        this.router.navigate("login");
    }

    courseSelectAction(index) {
        //TODO: Take me to your leader.... erm, I mean to the class!
    }

    addCourseAction() {
        //TODO: Navigate to class add/search screen
    }

    deleteCourse(index) {
        //TODO: Delete the class!
    }
}
