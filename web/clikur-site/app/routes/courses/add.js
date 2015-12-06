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
		},
		setStartTime: function () {
			$("#start_time").val("")
			.val(
				$("#startHour").val() + ":" + $("#startMinute").val()
			);
		},
		setEndTime: function () {
			$("#end_time").val("")
			.val(
				$("#endHour").val() + ":" + $("#endMinute").val()
			);
		},
		submit: function () {
			var isValid = true,
				$form = $("#addCourse");
			$("input[type='text'], input[type='hidden']").each(function () {
				if ($(this).val().length < 1) {
					isValid = false;
				}
			});
			if (isValid) {
				$form.submit();
			}
		}
	}
});
