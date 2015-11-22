import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {QuizQuestion} from "js/QuizQuestion";
/*globals Camera*/

//start-es7
@inject(UserData)
@needsPreservation("quizquestion")
//end-es7
export class AnswerQuestion
{
    //start-es7
    userData: UserData;
    course: Course;
    question: QuizQuestion;
    showText: boolean = false;
    showRadio: boolean = false;
    showImage: boolean = false;

    @preserve()
    textInput: string;
    @preserve()
    selection: number;
    @preserve()
    imageData: string = "img/tinyblank.gif";
    //end-es7
    
	//Initialize the variables for binding
	constructor(userData) {
		this.userData = userData;
  	}

	activate(params)
    {
		this.course = this.userData.courseList.get(+(params.cid));
		this.question = this.course.quizQuestions.get(+(params.qid));
        
        var types = QuizQuestion.questionTypes;
        if (this.question.type === types.TEXT) {
            this.showText = true;
        }
        else if (this.question.type === types.MULTI) {
            this.showRadio = true;
        }
        else {
            this.showImage = true;
        }
	}

	//When the take picture button is clicked
	takePicture()
    {
        var onSuccess = imageData => this.image = `data:image/jpeg;base64,${imageData}`;

		var onFail = message => navigator.notification.alert(`Image capture failed. Reason: "${message}"`, null, "Error");
        
		navigator.camera.getPicture(onSuccess, onFail, {
            quality: 45, //Has to be less than 50 for iOS compat
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: false, //Doesn't work right on Android
            saveToPhotoAlbum: false
		});
	}

    submitAnswer() {
		if(this.showText){
			//TODO Submit text
			//return this.sometext;
		} else if(this.showRadio){
			//TODO Submit radio choice
			// return this.selectedChoice;
		} else {
			//TODO Submit Image
		}
    }
}
