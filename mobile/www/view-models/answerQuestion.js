import {needsPreservation, preserve} from "js/statePreservation"; //jshint ignore:line
import {inject, computedFrom} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {QuizQuestion} from "js/QuizQuestion";
import {Router} from "aurelia-router"; //jshint ignore:line
import Firebase from "firebase";
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
        this.course = this.userData.courseList.getByKey(params.cid);
        this.question = this.course.quizQuestions.getByKey(params.qid);
        
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

    //start-es7
    @computedFrom("textInput", "selection", "imageData")
    //end-es7
    get answerGiven() {
        return !!this.textInput || this.selection !== undefined || this.imageData !== AnswerQuestion.IMG_PLACEHOLDER;
    }

    submitAnswer(e)
    {
        if (!this.answerGiven) {
            return;
        }
        
        let response;
        if(this.showText) {
            response = this.textInput;
        } else if(this.showRadio) {
            response = this.selection;
        } else {
            response = this.imageData;
        }
        
        let respond = new Promise((resolve, reject) => {
            let frb_respond = new Firebase(window.firebaseUrl + `responses/${this.course.id}/${this.question.id}/${this.userData.user.uid}`);
            frb_respond.set({
                response,
                timestamp: e.timeStamp
            }, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
        
        let mark = new Promise((resolve, reject) => {
            let frb_mark = new Firebase(window.firebaseUrl + `quizQs/${this.course.id}/${this.question.id}/hasAnswered/${this.userData.user.uid}`);
            frb_mark.set(true, err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
        
        Promise.all([respond, mark])
            .then(() => this.router.navigateBack())
            .catch(err => {
                console.log(err);
                navigator.notification.alert(typeof err === "string" ? err : String(err), null, "Error");
            });
    }
}
