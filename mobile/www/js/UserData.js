import * as course from "js/Course";
import localforage from "localforage";

export class UserData
{
    //start-es7
    isInitialized: boolean = false;
    isLoggedIn: boolean = false;
    email: string;
    //TODO: Still need some sort of auth token here!!!
    name: string;
    //The keys are the course IDs, and the values are the courses
    courseList: Map<numeric, course.Course> = new Map();
    //end-es7

    init(force)
    {
        if (this.isInitialized && !force) {
            return Promise.resolve();
        }
        
        //window.userData = this;
        
        return localforage.getItem("userData").then(val => {
            if (val) {
                this._populate(val);
            }
            
            this.isInitialized = true;
        });
    }

    populate(email/*, authThing*/)
    {
        this.email = email;
        //TODO: Use authThing to establish live connection (websocket??) and download other info
        
        //TEMP: Add fake name
        this.name = "Bob";
        
        //TEMP: Add one fake class
        var startTime1 = new course.Time(12, 0);
        var endTime1 = new course.Time(1, 0);
        var session1 = new course.Session("MW", startTime1, endTime1);
        var course1 = new course.Course(`${email} Class`, "FF101", session1, 12345);
        this.courseList.set(12345, course1);
        
        var startTime2 = new course.Time(12, 0);
        var endTime2 = new course.Time(1, 0);
        var session2 = new course.Session("MW", startTime2, endTime2);
        var course2 = new course.Course(`${email} Class`, "FF102", session2, 6789);
        this.courseList.set(6789, course2);
        
        
        this.isLoggedIn = true;
        //Serialize to localforage here
    }

    _populate(obj)
    {
        this.email = obj.email;
        this.name = obj.name;
        this.courseList = obj.courseList;
        this.isLoggedIn = true;
        //TODO: Set up an async task to update this info
    }

    clear()
    {
        this.email = null;
        this.name = null;
        this.courseList = new Map();
        
        this.isLoggedIn = false;
        localforage.setItem("userData", null);
    }
}