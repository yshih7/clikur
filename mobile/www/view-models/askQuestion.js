import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserQuestion} from "js/UserQuestion";
import {UserData} from "js/UserData"; //jshint ignore:line

//start-es7
@inject(Router, UserData)
@needsPreservation("askQuestion")
//end-es7
export class askQuestion
{
    //start-es7
	@preserve() //Still need to serialize this directly for WP because we can't serialize on every edit
	question: UserQuestion;	// can access by this.question
    course: Course;
    editMode: boolean = false;
    //end-es7

	constructor(router, userData)
	{
		this.router = router;
        this.userData = userData;
	}

	submitQuestion(event)
	{
		this.question.timestamp = event.timeStamp;
        //TODO: Send to server
        
		//navigate back to student home
		this.router.navigateBack();
	}
    
    activate(params)
    {
        this.course = this.userData.courseList.get(+params.cid);
        
        if (params.qid)
        {
            this.editMode = true;
            this.question = this.course.userQuestions.get(+params.qid);
        }
        else {
            this.question = new UserQuestion(null, "", false, false);
        }
    }
}
