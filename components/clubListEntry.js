angular.module('clubApp')

.component('clubListEntry', {
	templateUrl: 'templates/clubListEntry.html',
	bindings: {
		club: '<',
		handleEditClick: '<',
		deleteClub: '<'
	}
});