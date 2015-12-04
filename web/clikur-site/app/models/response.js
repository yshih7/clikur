import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	crn: attr(),
	qid: attr(),
	userid: attr(),
	response: attr(),
	timestamp: attr(),
	quizQ: belongsTo('quiz-q'),
	user: belongsTo('user')
});
