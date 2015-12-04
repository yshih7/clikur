import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	crn: attr(),
	userid: attr(),
	timestamp: attr(),
	isAnon: attr(),
	text: attr(),
	flag: attr(),
	course: belongsTo('course'),
	user: belongsTo('user')
});
