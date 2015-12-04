import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	crn: attr('number'),
	qid: attr('number'),
	type: attr('string'),
	choices: attr(),
	expiration: attr(),
	text: attr('string'),
	course: belongsTo('course'),
	responses: hasMany('response')
});
