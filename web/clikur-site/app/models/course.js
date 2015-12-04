import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	crn: attr(),
	title: attr(),
	callsign: attr(),
	semester: attr(),
	session: attr(),
	instructor: attr(),
	members: hasMany('user'),
	quizQs: hasMany('quiz-q'),
	userQs: hasMany('user-q')
});
