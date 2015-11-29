import Ember from 'ember';

var $ = Ember.$;

export default Ember.Route.extend({
	actions: {
		setSemester: function () {
			$("#semester").val("")
			.val(
				$("#year").val() + $("#term").val()
			);
		},
		setSession: function () {
			var $session = $("#session");
			$session.val("")
			.val(function () {
				var sessionVal = "";
				$(".sessionBox").each(function () {
					if (this.checked) {
						sessionVal += $(this).val();
					}
				});
				return sessionVal;
			});
		}
	}
});
