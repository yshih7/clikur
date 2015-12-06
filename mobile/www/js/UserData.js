import * as course from "js/Course";
//import localforage from "localforage";
import {AuthenticationManager} from "aurelia-firebase"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import Firebase from "firebase";

//start-es7
@inject(AuthenticationManager)
//end-es7
export class UserData
{
    //start-es7
    isInitialized: boolean = false;
    user;
    name: string;
    courseList: Map<numeric, course.Course> = new Map();
    //end-es7

    get isLoggedIn() {
        return !!this.user && this.user.isAuthenticated;
    }

    constructor(authManager) {
        this.authManager = authManager;
    }

    //Keeping this "async" for now because eventually we'll need to set up
    //getting the data from the server
    init(force)
    {
        if (this.isInitialized && !force) {
            return Promise.resolve();
        }

        this.user = this.authManager.currentUser;
        return this.populate(this.user);
    }

    populate(user)
    {
        this.isInitialized = true;
        
        if (!user.isAuthenticated) {
            return Promise.resolve();
        }
        
        this.user = user;
        
//        let frb_user = new Firebase(window.firebaseUrl + `users/${user.uid}`);

        //TEMP: Add fake name
        this.name = "Bob";

        //TEMP: Add one fake class
        var startTime1 = new course.Time(12, 0);
        var endTime1 = new course.Time(1, 0);
        var session1 = new course.Session("MW", startTime1, endTime1);
        var course1 = new course.Course(`${user.email} Class`, "FF101", session1, 12345);
        this.courseList.set(12345, course1);

        var startTime2 = new course.Time(12, 0);
        var endTime2 = new course.Time(1, 0);
        var session2 = new course.Session("MW", startTime2, endTime2);
        var course2 = new course.Course(`${user.email} Class`, "FF102", session2, 6789);
        this.courseList.set(6789, course2);
        
        this.isInitialized = true;
        
        return Promise.resolve();
    }

    clearAndSignOut()
    {
        this.user = null;
        this.name = null;
        this.courseList = new Map();

        return this.authManager.signOut();
    }
}
