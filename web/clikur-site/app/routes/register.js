import Ember from 'ember';
			
var submitInfo = function () {
	//try submitting, if database rejects the info because of an invalid email return false, else true if successful
	return true;
}

export default Ember.Route.extend({
	actions: {
		checkConfirmations: function () {
			var email1 = document.getElementById("email").value;
			var email2 = document.getElementById("confEmail").value;
			
			var pass1 = document.getElementById("password").value;
			var pass2 = document.getElementById("confPassword").value;
			
			var infoCorrect = true; //determines whether to submit or not
			
			if(email1 !== email2){
				document.getElementById("emailWarning").innerHTML = "Email does not match";
				infoCorrect = false;
			}
			else{
				document.getElementById("emailWarning").innerHTML = "";
			}
			if(pass1 !== pass2){
				document.getElementById("passWarning").innerHTML = "Password does not match";
				infoCorrect = false;
			}
			else {
				document.getElementById("passWarning").innerHTML = "";
			}
			
			if(infoCorrect){
				var submitSuccessful = submitInfo();
			}
			
			if(submitSuccessful){
				//navigate to the next page
			}
		}
	}
});
