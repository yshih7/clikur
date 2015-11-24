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

    //Use fat-arrow for lexical this
    deleteCourse = id =>
    {
        var course = this.userData.courseList.get(id);
        navigator.notification.confirm(`Remove class ${course.callSign} ("${course.name}")?`, choice => {
            if (choice === 1)
            {
                this.updating = true;
                setTimeout(() =>
                {
                    this.userData.courseList.delete(id);
                    this.updating = false;
                }, 0);
            }
        }, "Confirm class removal", ["Yes", "Cancel"]);
        
        //TODO: Notify server
    };
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

    deactivate() {
        this.updating = true;
    }
}
