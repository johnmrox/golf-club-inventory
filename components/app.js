angular.module('clubApp', [])
.controller('AppCtrl', function($http) {
	this.$http = $http;
	this.editingClub = {};
	this.name;
	this.show;

	this.clubs;
	this.foundIndex = 10;

	this.showAllClubs = function() {
		this.$http({
			method:'GET', 
			url: 'http://localhost:8080/clubs'
		}).then(function(returnedClubs) {
			this.clubs = returnedClubs.data;
			this.clubs = this.clubs.map(function(club) {
				club.showClub = false;
				return club;
			});
		}.bind(this), function() {
			console.log('error');
		});
	}.bind(this);

	this.showAllClubs();

	this.findOneClubIndex = function(clubId, callback) {
		this.$http({
			method:'GET', 
			url: 'http://localhost:8080/clubs'
		}).then(function(clubs) {
			clubs.data.forEach(function(club, index) {
				if (club._id === clubId) {
					callback(index);
				}
			});
		}, function() {
			console.log('error');
		});
	};

	this.showOneClub = function(clubId) {
		this.$http({
			method:'GET', 
			url: 'http://localhost:8080/clubs/' + clubId
		}).then(function(club) {
			console.log(club);
		}, function() {
			console.log('error');
		});

	}.bind(this);

	this.handleEditClick = function(clubId) {
		this.show = true;
		this.findOneClubIndex(clubId, function(clubIndex) {

			this.editingClub.type = this.clubs[clubIndex].type;
			this.editingClub.name = this.clubs[clubIndex].name;
			this.editingClub.price = this.clubs[clubIndex].price;
			this.editingClub._id = this.clubs[clubIndex]._id;
		}.bind(this));
	}.bind(this);

	this.deleteOneClub = function(clubId) {
		this.$http({
			method:'DELETE', 
			url: 'http://localhost:8080/clubs/' + clubId,
		}).then(function() {
			this.showAllClubs();
		}.bind(this), function() {
			console.log('error');
		});
	}.bind(this);

	this.saveRevisedClub = function() {
		this.$http({
			method:'PUT', 
			url: 'http://localhost:8080/clubs/' + this.editingClub._id,
			data: {
				name: this.editingClub.name,
				type: this.editingClub.type,
				price: this.editingClub.price
			}
		}).then(function() {
			this.showAllClubs();
		}.bind(this), function() {
			console.log('error');
		});

		this.show = false;
	}.bind(this);

	this.addClub = function(newClub) {
		this.$http({
			method:'POST', 
			url: 'http://localhost:8080/clubs',
			data: {
				name: newClub.name,
				type: newClub.type,
				price: newClub.price
			}
		}).then(function(clubs) {
		}, function() {
			console.log('error');
		});

		this.clubs.push({name: newClub.name, type: newClub.type, price: newClub.price});

		newClub.name = "";
		newClub.type = "";
		newClub.price = "";
	}.bind(this);
})

.component('app', {
	controller: 'AppCtrl',
	templateUrl: 'templates/app.html'
});
