import {customElement, bindable} from "aurelia-framework"; //jshint ignore:line
import {Router} from 'aurelia-router'; //jshint ignore:line

//start-es7
@customElement("question-box")
@inject(Router)
//end-es7
export class QuestionBox
{
    //start-es7
    @bindable
    questionMap : Map;

    show_list : boolean;

    @bindable
    route_name : String;

    @bindable
    course_id : numeric;
    //end-es7

    constructor(router)
    {
        this.router = router;
        //by default, the question list is not shown
        this.show_list = false;
    }

    show_q_detail(id)
    {
        //link to the question detail page
        this.router.navigate(this.route_name, {
            cid: this.course_id,
            qid:id
        });
    }
    zoom()
    {
        this.show_list = !this.show_list;
        if(this.show_list)
        {
            document.removeEventListener('backbutton', document.backListener, false);
            this.backListener = () => this.zoom();
            document.addEventListener('backbutton', this.backListener, false);
        }
        else
        {
            document.removeEventListener('backbutton', this.backListener, false);
            document.addEventListener('backbutton', document.backListener, false);
        }
    }
}
