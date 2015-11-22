import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {inject} from "aurelia-framework";
import {UserData} from "js/UserData";
import {QuizQuestion} from "js/QuizQuestion";

//start-es7
@inject(UserData)
@needsPreservation("quizquestion")
//end-es7
export class AnswerQuestion
{
	//TODO import user data and syc all variables against it
	constructor(UserData) {
		this.UserData = UserData;
		this.showText = false;
		this.showRadio = true;
		this.showImage = false;
    	this.choices = ['Q1', 'Q2', 'Q3', 'Q4'];
		this.sometext = 'Sample Text'; //Text in the text input field
		this.questionText = 'Sample Question';
  	}
	
    @preserve()
    image1 = "img/tinyblank.gif";

	activate(params){
		this.course = this.UserData.courseList.get(params.cid);
		this.question = this.course.quizQuestions.get(params.qid);
	}
	
		

	//When the take picture button is clicked
	takePicture(){
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.DATA_URL
		});

		function onSuccess(imageData) {
			//var image = document.getElementById('answerImage');
			image1 = "data:image/jpeg;base64," + imageData;
		}

		function onFail(message) {
			//alert('Failed because: ' + message);
			//notification
		}
	}

    submitAnswer() {
		if(showText){
			//TODO Submit text
		} else if(showRadio){
			//TODO Submit radio choice
		} else {
			//TODO Submit Image
		}
    }   
}
