angular.module('clubApp')

.component('clubList', {
	templateUrl: 'templates/clubList.html',
	bindings: {
		clubs: '<',
		deleteClub: '<',
		handleEditClick: '<'
	}
});