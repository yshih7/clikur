import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import * as course from "js/Course"; //jshint ignore:line

//start-es7
@inject(UserData)
//end-es7
export class AddCourse {
    //start-es7
    searchQuery: string;
    userData: UserData;
    results: array<course.Course> = [];
    //end-es7

    constructor(userData) {
        this.userData = userData;

        var startTime1 = new course.Time(12, 0);
        var endTime1 = new course.Time(1, 0);
        var session1 = new course.Session("MW", startTime1, endTime1);
        var course1 = new course.Course(`Add me!`, "AA101", session1, 111);
        this.results.push(course1);

        var startTime2 = new course.Time(12, 0);
        var endTime2 = new course.Time(1, 0);
        var session2 = new course.Session("MW", startTime2, endTime2);
        var course2 = new course.Course(`Me too!`, "BB102", session2, 222);
        this.results.push(course2);
    }

    searchAction() {
        //Do a search! Somehow!
    }

    courseSelectAction(index)
    {
        var course = this.results[index];

        navigator.notification.confirm(`Add class ${course.callSign} ("${course.name}")?`, choice => {
            if (choice === 1)
            {
                this.results.splice(index, 1);
                this.userData.courseList.set(course.id, course);

                //TODO: Tell the server the class was added
            }
        }, "Confirm class selection", ["Yes", "Cancel"]);
    }
}
