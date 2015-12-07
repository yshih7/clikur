import * as course from "js/Course";
//import localforage from "localforage";
import {AuthenticationManager} from "aurelia-firebase"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import Firebase from "firebase";
import {ReferenceCollection} from "js/EnhancedReactiveCollections";

//start-es7
@inject(AuthenticationManager)
//end-es7
export class UserData
{
    //start-es7
    isInitialized: boolean = false;
    user;
    name: string;
    courseList: ReferenceCollection;
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
        
        let frb_user = new Firebase(window.firebaseUrl + `users/${user.uid}`);
        
        return new Promise((resolve, reject) => {
            frb_user.once("value", snapshot => {
                this.name = snapshot.child("name").val();
                this.courseList = new ReferenceCollection(`users/${user.uid}/courses`, "courses", val => {
                    return course.Course.fromServerObj(val, val.__firebaseKey__);
                });
                resolve();
            },
            e => reject(e));
        });
    }

    clearAndSignOut()
    {
        this.user = null;
        this.name = null;
        this.courseList = new Map();

        return this.authManager.signOut();
    }
}
