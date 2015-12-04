import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	crn: attr('number'),
	qid: attr('number'),
	userid: attr('number'),
	response: attr('string'),
	timestamp: attr(),
	quizQ: belongsTo('quiz-q'),
	user: belongsTo('user')
});
