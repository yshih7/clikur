
import {customElement, bindable} from "aurelia-framework"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line
import {inject} from "aurelia-framework"; //jshint ignore:line

//start-es7
@customElement("question-box")
@inject(Router)
//end-es7
export class QuestionBox
{
    //start-es7
    @bindable
    questionMap : Map;

    @bindable
    showList : boolean;

    @bindable
    routeName : String;

    @bindable
    courseId : numeric;

    @bindable
    title: string;

    updating: boolean = false;
    //end-es7

    constructor(router)
    {
        this.router = router;
    }

    show_q_detail(e, id)
    {
        e.stopPropagation();
        
        this.updating = true;
        
        //link to the question detail page
        this.router.navigateToRoute(this.routeName, {
            cid: this.courseId,
            qid: id
        });
    }
}
