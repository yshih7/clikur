import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	crn: attr('number'),
	userid: attr('number'),
	timestamp: attr(),
	isAnon: attr('boolean'),
	text: attr('string'),
	flag: attr('boolean'),
	course: belongsTo('course'),
	user: belongsTo('user')
});
