angular.module('clubApp')

.controller('editEntryFormCtrl', function() {
	console.log('inside editCtrl: ', this.show);
})

.component('editEntryForm', {
	controller: 'editEntryFormCtrl',
	bindings: {
		club: '<',
		saveRevisedClub: '<',
		show: '<'
	},
	templateUrl: 'templates/editEntryForm.html'
});