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
    updating: boolean = false;
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

    courseSelectAction(id) {
        this.router.navigateToRoute("courseHome", {cid: id});
    }

    addCourseAction() {
        this.router.navigate("courses/add");
    }

    deleteCourse(id) {
        //TODO: Delete the class!
    }

    deactivate() {
        this.updating = true;
    }
}
