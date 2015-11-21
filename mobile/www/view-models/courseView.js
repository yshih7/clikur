import {customElement, bindable} from "aurelia-framework"; //jshint ignore:line

//start-es7
@customElement("course-view")
//end-es7
export class CourseView
{
    //start-es7
    @bindable
    course: Course;
    @bindable
    delAction = null; //function(numeric): undefined
    //end-es7

    _delAction(e)
    {
        e.stopPropagation();
        this.delAction(this.index);
    }
}
