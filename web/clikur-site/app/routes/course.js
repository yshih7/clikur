import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			course: {
				id: "1"
			},
			students: [
				{
					name: "Brian Park",
					email: "bpark5@u.rochester.edu",
					blocked: false
				},
				{
					name: "German Hernandez",
					email: "ghernan6@u.rochester.edu",
					blocked: false
				},
				{
					name: "Mary Sue",
					email: "msue@u.rochester.edu",
					blocked: true
				},
				{
					name: "Michelle Diane",
					email: "urmich@hotmail.com",
					blocked: false
				}
			],
			quizzes: [
				{
					question: "How much wood could a woodchuck if a woodchuck could chuck wood?",
					date: "10-20-2004",
					status: "Draft"
				},
				{
					question: "What is my name?",
					date: "10-19-2004",
					status: "Open"
				},
				{
					question: "What is a man but a miserable pile of secrets?",
					date: "9-30-2004",
					status: "Closed"
				}
			]
		});
	}
});
