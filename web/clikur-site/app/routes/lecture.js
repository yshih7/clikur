import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			course: {
				id: "1"
			},
			questions: [
				{
					id: "1",
					studentId: "7",
					studentName: "Tom",
					timestamp: new Date().toString(),
					question: "What is 'i' again?"
				},
				{
					id: "2",
					studentId: "13",
					studentName: "Anonymous",
					timestamp: new Date().toString(),
					question: "What 2 + 2?"
				},
				{
					id: "3",
					studentId: "3",
					studentName: "Stephen",
					timestamp: new Date().toString(),
					question: "How do you plot complex numbers?"
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
		// let questions = [
		// 	{
		// 		id: "1",
		// 		studentId: "7",
		// 		studentName: "Tom",
		// 		timestamp: new Date().toString(),
		// 		question: "What is 'i' again?"
		// 	},
		// 	{
		// 		id: "2",
		// 		studentId: "13",
		// 		studentName: "Anonymous",
		// 		timestamp: new Date().toString(),
		// 		question: "What 2 + 2?"
		// 	},
		// 	{
		// 		id: "3",
		// 		studentId: "3",
		// 		studentName: "Stephen",
		// 		timestamp: new Date().toString(),
		// 		question: "How do you plot complex numbers?"
		// 	}
		// ];
		// return questions;
	}
});
