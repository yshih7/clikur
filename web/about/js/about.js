jQuery(document).ready(function ($) {
	$("#content").load("main.html");
	$("#mainNav").on("click", function (event) {
		$("#content").load("main.html");
		event.preventDefault();
	});
	$("#teamNav").on("click", function (event) {
		$("#content").load("team.html");
		event.preventDefault();
	});
	$("#designNav").on("click", function (event) {
		$("#content").load("design.html");
		event.preventDefault();
	});
	$("#timelineNav").on("click", function (event) {
		$("#content").load("timeline.html");
		event.preventDefault();
	});
});