import DS from 'ember-data';

export default DS.Model.extend({
	callsign: DS.attr(),
	title: DS.attr(),
	crn: DS.attr(),
	semester: DS.attr(),
	session: DS.attr()
});
