angular.module('clubApp')

.component('editEntryForm', {
	bindings: {
		club: '<',
		saveRevisedClub: '<',
		show: '<'
	},
	templateUrl: 'templates/editEntryForm.html'
});