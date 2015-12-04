import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	crn: attr('number'),
	title: attr('string'),
	callsign: attr('string'),
	semester: attr('number'),
	session: attr(),
	instructor: attr('number'),
	members: hasMany('user'),
	quizQs: hasMany('quiz-q')
});
