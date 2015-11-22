import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserQuestion} from "js/UserQuestion"; //jshint ignore:line

//start-es7
@inject(Router)
@needsPreservation("askQuestion")
//end-es7
export class askQuestion
{
    //start-es7
	@preserve()
	question;	// can access by this.question
	@preserve()
	anonymous;
    //end-es7

	constructor(router)
	{
		this.router = router;
	}

	submitQuestion(event)
	{
		var time = event.timeStamp;
		var ques = new UserQuestion(time, this.question, this.anonymous, false);
		//navigate back to student home
		this.router.navigateBack();
	}
}
