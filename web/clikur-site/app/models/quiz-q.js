import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	crn: attr(),
	qid: attr(),
	type: attr(),
	choices: attr(),
	expiration: attr(),
	text: attr(),
	course: belongsTo('course'),
	responses: hasMany('response')
});
