angular.module('clubApp')

.controller('clubListEntryCtrl', function() {
	this.show = function() {
		this.club.showClub = !this.club.showClub;
		
		this.showingName = this.club.name;
		this.showingType = this.club.type;
		this.showingPrice = this.club.price;
	}
})

.component('clubListEntry', {
	controller: 'clubListEntryCtrl',
	templateUrl: 'templates/clubListEntry.html',
	bindings: {
		club: '<',
		handleEditClick: '<',
		deleteClub: '<',
		clubs: '<'
	}
});