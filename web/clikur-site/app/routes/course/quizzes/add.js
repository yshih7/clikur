import Ember from 'ember';

var $ = Ember.$,
	showingChoices = false;
			
export default Ember.Route.extend({
	model () {
		return this.modelFor("course");
	},
	actions: {
		showAnswerChoices: function(qtype) {
			if(showingChoices && (qtype === "other")){
				showingChoices = false;
				$("#choices").removeClass("show").addClass("hidden");
			}
			else if(!showingChoices && (qtype === "mc")){
				showingChoices = true;
				$("#choices").removeClass("hidden").addClass("show");
			}
		}
	}
});
