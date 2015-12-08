import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	userid: attr(),
	urid: attr(),
	name: attr(),
	courses: hasMany('course'),
	userQs: hasMany('user-q'),
	responses: hasMany('response')
});
