import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import Firebase from "firebase";

//start-es7
@inject(Router, UserData)
@needsPreservation("askQuestion")
//end-es7
export class askQuestion
{
    //start-es7
	@preserve()
	text: string;
    @preserve()
    isAnon: boolean = false;
    id: string;
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
		let frb_submit = new Firebase(window.firebaseUrl + `userQs/${this.course.id}/${this.userData.user.uid}/submissions/${this.id || event.timeStamp}`);
        frb_submit.set({
            text: this.text,
            isAnon: this.isAnon
        }, err => {
            if (err) {
                console.log(err);
                navigator.notification.alert(typeof err === "string" ? err : String(err), null, "Error");
            }
            else {
                //navigate back to course home
                this.router.navigateBack();
            }
        });
	}
    
    activate(params)
    {
        this.course = this.userData.courseList.getByKey(params.cid);
        
        if (params.qid)
        {
            this.editMode = true;
            let question = this.course.userQuestions.getByKey(params.qid);
            this.text = question.text;
            this.isAnon = question.isAnon;
            this.id = params.qid;
        }
    }
}
