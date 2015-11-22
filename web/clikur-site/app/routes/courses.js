import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let courses = [
			{
				id: "1",
				course: "MTH 161",
				title: "Calculus IA",
				crn: "29288",
				term: "Fall 2016"
			},
			{
				id: "2",
				course: "CHM 131",
				title: "CHM Concepts, Systems, Practice I",
				crn: "25954",
				term: "Fall 2016"
			}
		];
		return courses;
	}
});
