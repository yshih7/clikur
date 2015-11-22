import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {Router} from "aurelia-router"; //jshint ignore:line

//start-es7
@inject(UserData, Router)
//end-es7
export class CourseHome {
    //start-es7
    course;
    userData: UserData;
    //end-es7

    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    activate(params) {
        this.course = this.userData.courseList.get(+(params.cid));
    }

    askQuestionAction() {
        this.router.navigateToRoute("ask", {cid: this.course.id});
    }
}
