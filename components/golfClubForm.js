angular.module('clubApp')

.controller('golfClubFormCtrl', function() {
})

.component('golfClubForm', {
	controller: 'golfClubFormCtrl',
	templateUrl: 'templates/golfClubForm.html',
	bindings: {
		handleAddClub: '<',
		showAllClubs: '<',
		showOneClub: '<'
	}
});