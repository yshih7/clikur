import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	userid: attr('number'),
	urid: attr('number'),
	name: attr('string'),
	courses: hasMany('course')
});
