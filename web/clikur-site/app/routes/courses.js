import Ember from 'ember';

// var store = this.store;
// 
// store.createRecord('course', {
// 	id: 1,
// 	callsign: "MTH 161",
// 	title: "Calculus IA",
// 	crn: "29288",
// 	semester: 1603,
// 	session: "MWF"
// });
// 
// store.createRecord('course', {
// 	id: 2,
// 	callsign: "CHM 131",
// 	title: "CHM Concepts, Systems, Practice I",
// 	crn: "25954",
// 	semester: 1603,
// 	session: "MW"
// });

export default Ember.Route.extend({
	model() {
		let courses = [
			{
				id: "1",
				callsign: "REL 164",
				title: "Death, Dying & Beyond",
				crn: "71023",
				semester: "Fall 2015",
				session: "MW"
			},
			{
				id: "2",
				callsign: "MTH 161",
				title: "Calculus IA",
				crn: "29288",
				semester: "Fall 2016",
				session: "MWF"
			},
			{
				id: "3",
				callsign: "CHM 131",
				title: "CHM Concepts, Systems, Practice I",
				crn: "25954",
				semester: "Fall 2016",
				session: "MW"
			}
		];
		return courses;
	}
});
