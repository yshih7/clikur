import * as course from "js/Course";

export class UserData
{
    //start-es7
    isLoggedIn: boolean = false;
    email: string;
    //TODO: Still need some sort of auth token here!!!
    name: string;
    courseList: array<course.Course> = [];
    //end-es7
    
    populate(email/*, authThing*/)
    {
        this.email = email;
        //TODO: Use authThing to establish live connection (websocket??) and download other info
    }

    clear()
    {
        this.email = null;
        this.name = null;
        this.courseList = [];
        
        this.isLoggedIn = false;
    }
}
