import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line

//start-es7
@inject(Router)
@needsPreservation("askQuestion")
//end-es7

export class askQuestion
{
	@preserve()
	question;
	@preserve()
	anonymous;

	constructor(router)
	{
		this.router = router;
	}

	submitQuestion()
	{
		//navigate back to student home
		this.router.navigateBack();
	}
}