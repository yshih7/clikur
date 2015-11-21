import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line

//start-es7
@inject(UserData)
//end-es7
export class CourseHome {
    //start-es7
    course;
    userData: UserData;
    //end-es7
    
    constructor(userData) {
        this.userData = userData;
    }
    
    activate(params) {
        this.course = this.userData.courseList.get(params.cid);
    }
}
