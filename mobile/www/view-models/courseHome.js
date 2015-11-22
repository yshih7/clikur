import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {Router} from "aurelia-router"; //jshint ignore:line
import {QuizQuestion} from "js/QuizQuestion";

//start-es7
@inject(UserData, Router)
//end-es7
export class CourseHome {
    //start-es7
    course;
    userData: UserData;
    //end-es7

    constructor(userData, router) {
        this.userData = userData;
        this.router = router;
    }

    activate(params) {
        this.course = this.userData.courseList.get(+(params.cid));
        
        //Add some temp quiz questions
        var multQ = new QuizQuestion(11, "This is a sample multiple choice question.", QuizQuestion.questionTypes.MULTI, new Date(2015, 12, 1), [
            "Choice 1",
            "Choice 2",
            "Choice 3"
        ]);
        this.course.quizQuestions.set(11, multQ);
        
        var textQ = new QuizQuestion(22, "This is a sample text input question.", QuizQuestion.questionTypes.TEXT, new Date(2015, 12, 1));
        this.course.quizQuestions.set(22, textQ);
        
        var imgQ = new QuizQuestion(33, "This is a sample image input question.", QuizQuestion.questionTypes.IMG, new Date(2015, 12, 1));
        this.course.quizQuestions.set(33, imgQ);
    }

    askQuestionAction() {
        this.router.navigateToRoute("ask", {cid: this.course.id});
    }
}
