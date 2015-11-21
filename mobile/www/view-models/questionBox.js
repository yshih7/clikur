import {customElement, bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';

@customElement("question-box")
@inject('Router')
export class QuestionBox
{
  @bindable
  questionMap : Map;

  show_list : boolean;

  @bindable
  route_name : String;

  @bindable
  course_id : numeric;

  constructor(router)
  {
    this.router = router;
    //by default, the question list is not shown
    show_list = false;
  }

  show_q_detail(id)
  {
    //link to the question detail page
    this.router.navigate(route_name,{cid:course_id,qid:id});
  }
  zoom()
  {
    show_list = !show_list;
    if(show_list)
    {
      document.removeEventListener('backbutton',document.backListener,false);
      this.backListener = ()=>{this.zoom();};
      document.addEventListener('backbutton',this.backListener,false);
    }
    else
    {
      document.removeEventListener('backbutton',this.backListener,false);
      document.addEventListener('backbutton',document.backListener,false);
    }
  }

}
