import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let questions = [
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
		];
		return questions;
	}
});
