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

    //Use fat-arrow for lexical this
    deleteCourse = id =>
    {
        var course = this.userData.courseList.getByKey(id);
        navigator.notification.confirm(`Remove class ${course.callSign} ("${course.name}")?`, choice => {
            if (choice === 1) {
                this.userData.courseList.removeByKey(id, false)
                .catch(err => {
                    console.log(err);
                    navigator.notification.alert(typeof err === "string" ? err : String(err), null, "Error");
                })
            }
        }, "Confirm class removal", ["Yes", "Cancel"]);
    };
    //end-es7

    constructor(userData, router)
    {
        this.userData = userData;
        this.router = router;
    }

    logOutAction()
    {
        this.userData.clearAndSignOut()
            .then(() => this.router.navigate("login"))
            .catch(err => {
                console.log(err);
                navigator.notification.alert(typeof err === "string" ? err : String(err), null, "Error");
            });
    }

    courseSelectAction(id) {
        this.router.navigateToRoute("courseHome", {cid: id});
    }

    addCourseAction() {
        this.router.navigate("courses/add");
    }
}
