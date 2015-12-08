import {inject} from "aurelia-framework"; //jshint ignore:line
import {UserData} from "js/UserData"; //jshint ignore:line
import {Router} from "aurelia-router"; //jshint ignore:line
import {QuizQuestion} from "js/QuizQuestion";
import {preserve, needsPreservation} from "js/statePreservation"; //jshint ignore:line

//start-es7
@inject(UserData, Router)
@needsPreservation("courseHome")
//end-es7
export class CourseHome {
    //start-es7
    course;
    userData: UserData;
    @preserve()
    expandUserQuestions: boolean = false;
    @preserve()
    expandQuizQuestions: boolean = false;
    UQBack = () => this.toggleUserQuestions();
    QQBack = () => this.toggleQuizQuestions();
    //end-es7


    constructor(userData, router) {

        this.userData = userData;
        this.router = router;
    }

    activate(params)
    {
        this.course = this.userData.courseList.getByKey(params.cid);

        if (window.courseHomeExpansion === "user" && this.course.userQuestions.size !== 0)
        {
            this.expandUserQuestions = true;
            this.addBackListener(this.UQBack);
        }
        else if (window.courseHomeExpansion === "quiz" && this.course.quizQuestions.size !== 0)
        {
            this.expandQuizQuestions = true;
            this.addBackListener(this.QQBack);
        }

        window.courseHomeExpansion = null;

        this.course.initCollections();
    }

    deactivate()
    {
        //Use a global to remember if one of the boxes should be zoomed the next time we load this page
        //This is a really hacky/inelegant way of achieving this. My attempt at an elegant method failed.
        //I'm tired. This works. ~~@stesen
        if (this.expandUserQuestions) {
            window.courseHomeExpansion = "user";
        }
        else if (this.expandQuizQuestions) {
            window.courseHomeExpansion = "quiz";
        }

        this.removeBackListener();
    }

    askQuestionAction() {
        this.router.navigateToRoute("ask", {cid: this.course.id});
    }

    addBackListener(listener)
    {
        this.backListener = listener;
        document.removeEventListener('backbutton', document.backListener, false);
        document.addEventListener('backbutton', this.backListener, false);
    }

    removeBackListener()
    {
        if (this.backListener)
        {
            document.removeEventListener('backbutton', this.backListener, false);
            delete this.backListener;
        }
        if (document.backListener) {
            document.addEventListener('backbutton', document.backListener, false);
        }
    }

    toggleQuizQuestions()
    {
        if (this.course.quizQuestions.items.length === 0) {
            return;
        }

        this.expandQuizQuestions = !this.expandQuizQuestions;

        if(this.expandQuizQuestions)
        {
            this.addBackListener(this.QQBack);
        }
        else {
            this.removeBackListener();
        }
    }

    toggleUserQuestions()
    {
        if (this.course.userQuestions.items.length === 0) {
            return;
        }

        this.expandUserQuestions = !this.expandUserQuestions;

        if(this.expandUserQuestions)
        {
            this.addBackListener(this.UQBack);
        }
        else {
            this.removeBackListener();
        }

    }
}
