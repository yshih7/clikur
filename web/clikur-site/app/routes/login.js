import Ember from 'ember';

var $ = Ember.$;

export default Ember.Route.extend({
	actions: {
		signIn: function() {
			this.get("session").open("firebase", {
					provider: "password",
					email: $("#email").val(),
					password: $("#password").val()
				}).then(function(data) {
					console.log("Login success: ", data.currentUser);
					$("#loginFailMsg").removeClass("show").addClass("hidden");
					window.location.assign("clikur/courses");
				}, function () {
					console.log("Login failure");
					$("#loginFailMsg").removeClass("hidden").addClass("show");
				});
		}
	}
});
