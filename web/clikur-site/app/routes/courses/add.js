import Ember from 'ember';

var $ = Ember.$;

function populateOptions(optList, val) {
	var opt = new Option();
	opt.text = val;
	opt.value = val;
	optList.add(opt);
}

$(document).ready(function () {
	var startHourOptions = $("#startHour").get(0).options,
		startMinuteOptions = $("#startMinute").get(0).options,
		endHourOptions = $("#endHour").get(0).options,
		endMinuteOptions = $("#endMinute").get(0).options;
		
	for (var i = 7; i < 21; i++) {
		populateOptions(startHourOptions, i);
		populateOptions(endHourOptions, i);
	}
	for (var i = 0; i < 60; i += 5) {
		var minute = i.toString();
		if (i < 10) {
			minute = "0" + i.toString();
		}
		populateOptions(startMinuteOptions, minute);
		populateOptions(endMinuteOptions, minute);
	}
});

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
