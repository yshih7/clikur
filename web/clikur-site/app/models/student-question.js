import DS from 'ember-data';

export default DS.Model.extend({
	id: DS.attr(),
	studentId: DS.attr(),
	studentName: DS.attr(),
	timestamp: DS.attr(),
	question: DS.attr(),
});
