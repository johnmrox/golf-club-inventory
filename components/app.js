// var golfClubs = {
// 	clubs: [
// 		// {
// 		// 	type: 'driver',
// 		// 	name: 'Callaway',
// 		// 	price: 199
// 		// },
// 		// {
// 		// 	type: 'putter',
// 		// 	name: 'Titleist',
// 		// 	price: 99
// 		// },
// 		// {
// 		// 	type: 'wedge',
// 		// 	name: 'Orlimar',
// 		// 	price: 150
// 		// }
// 	],
// 	deleteClub: function(brandName) {
// 		var deletingClubIndex = this.findOneClubIndex(brandName);

// 		this.clubs.splice(deletingClubIndex, 1);
// 	},
// 	// editClub: function(brandName, revisedClub) {
// 	// 	var editingClubIndex = this.findOneClubIndex(brandName);
// 	// 	// console.log(this.clubs);
// 	// 	// console.log('index:', editingClubIndex)
// 	// 	this.clubs[editingClubIndex] = revisedClub;
// 	// },
// 	findOneClubIndex: function(clubName) {
// 		var foundClubIndex;
// 		this.clubs.forEach(function(club, index) {
// 			if (club.name === clubName) {
// 				foundClubIndex = index;
// 			}
// 		});
// 		return foundClubIndex;
// 	}
// }

angular.module('clubApp', [])
.controller('AppCtrl', function($http) {
  //this.name = 'Callaway';
	// this.handleClick = function() {
	// 	alert('I\'ve been clicked');
	// };
	this.$http = $http;
	this.editingClub = {};
	this.name;
	this.show;

	this.clubs;
	this.foundIndex = 10;
	//console.log('this.clubs:', this.clubs);

	this.showAllClubs = function() {
		//console.log('foundIndex:', this.foundIndex);
		this.$http({
			method:'GET', 
			url: 'http://localhost:8080/clubs'
		}).then(function(returnedClubs) {
			this.clubs = returnedClubs.data;
			this.clubs = this.clubs.map(function(club) {
				club.showClub = false;
				return club;
			});
			//console.log(this.clubs);
		}.bind(this), function() {
			console.log('error');
		});
	}.bind(this);

	this.showAllClubs();

	// this.render = function() {
	// 	this.showAllClubs();
	// };	

	//this.render();
	this.findOneClubIndex = function(clubId, callback) {
		this.$http({
			method:'GET', 
			url: 'http://localhost:8080/clubs'
		}).then(function(clubs) {
			// console.log('clubs data:', clubs.data)
			clubs.data.forEach(function(club, index) {
				if (club._id === clubId) {
					// foundClubIndex = index;
					callback(index);
				}
			});
			//return foundClubIndex;
		}, function() {
			console.log('error');
		});
	};

	this.showOneClub = function(clubId) {
		this.$http({
			method:'GET', 
			url: 'http://localhost:8080/clubs/' + clubId
		}).then(function(club) {
			//console.log('club id:', clubId)
			console.log(club);
		}, function() {
			console.log('error');
		});

	}.bind(this);

	this.handleEditClick = function(clubId) {
		this.show = true;
		console.log('edit this.show: ', this.show);
		//console.log('club id:', clubId)
		this.findOneClubIndex(clubId, function(clubIndex) {

			this.editingClub.type = this.clubs[clubIndex].type;
			this.editingClub.name = this.clubs[clubIndex].name;
			this.editingClub.price = this.clubs[clubIndex].price;
			this.editingClub._id = this.clubs[clubIndex]._id;
				//this.name = this.editingClub.name;
		}.bind(this));


		//console.log('this name:', this.editingClub.name);
	}.bind(this);

	this.deleteOneClub = function(clubId) {
		//console.log(clubId);
		this.$http({
			method:'DELETE', 
			url: 'http://localhost:8080/clubs/' + clubId,
		}).then(function() {
			this.showAllClubs();
			//this.name = this.editingClub.name;

		}.bind(this), function() {
			console.log('error');
		});
	}.bind(this);

	// this.saveRevisedClub = function(clubName, revisedClub) {
	this.saveRevisedClub = function() {
		//need club id and edited fields

		//can get rid of and
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
			//this.name = this.editingClub.name;

		}.bind(this), function() {
			console.log('error');
		});

		this.show = false;
		//golfClubs.editClub(clubName, revisedClub);
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
			console.log(clubs);
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
	// bindings: {
	// 	clubBrand: '<',
	// 	clubType: '<',
	// 	clubPrice: '<'
	// }
});
