import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {inject, computedFrom} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {QuizQuestion} from "js/QuizQuestion";
import {Router} from "aurelia-router"; //jshint ignore:line
/*globals Camera*/

//start-es7
@inject(UserData, Router)
@needsPreservation("quizquestion")
//end-es7
export class AnswerQuestion
{
    //start-es7
    static IMG_PLACEHOLDER = "img/tinyblank.gif";
    
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
    imageData: string = AnswerQuestion.IMG_PLACEHOLDER;
    //end-es7
    
    //Initialize the variables for binding
    constructor(userData, router)
    {
        this.userData = userData;
        this.router = router;
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
        var onSuccess = imageData => this.imageData = `data:image/jpeg;base64,${imageData}`;

        var onFail = message => navigator.notification.alert(`Image capture failed. Reason: "${message}"`, null, "Error");
        
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 45, //Has to be less than 50 for iOS compat
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: false, //Doesn't work right on Android
            saveToPhotoAlbum: false
        });
    }

    @computedFrom("textInput", "selection", "imageData")
    get answerGiven() {
        return !!this.textInput || this.selection !== undefined || this.imageData !== AnswerQuestion.IMG_PLACEHOLDER;
    }

    submitAnswer()
    {
        if (!this.answerGiven) {
            return;
        }
        
        if(this.showText) {
            //TODO Submit text
        } else if(this.showRadio) {
            //TODO Submit radio choice
        } else {
            //TODO Submit Image
        }
        
        this.course.quizQuestions.delete(this.question.id);
        this.router.navigateBack();
    }
}
