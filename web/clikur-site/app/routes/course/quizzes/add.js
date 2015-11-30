import Ember from 'ember';

var showingChoices = false;
			
export default Ember.Route.extend({
	actions: {
		showAnswerChoices: function(qtype) {
			if(showingChoices && (qtype === "other")){
				showingChoices = false;
				document.getElementById("choices").style.display = "none";
			}
			else if(!showingChoices && (qtype === "mc")){
				showingChoices = true;
				document.getElementById("choices").style.display = "block";
			}
		}
	}
});
