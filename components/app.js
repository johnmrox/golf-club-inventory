var golfClubs = {
	clubs: [
		// {
		// 	type: 'driver',
		// 	name: 'Callaway',
		// 	price: 199
		// },
		// {
		// 	type: 'putter',
		// 	name: 'Titleist',
		// 	price: 99
		// },
		// {
		// 	type: 'wedge',
		// 	name: 'Orlimar',
		// 	price: 150
		// }
	],
	deleteClub: function(brandName) {
		var deletingClubIndex = this.findOneClubIndex(brandName);

		this.clubs.splice(deletingClubIndex, 1);
	},
	// editClub: function(brandName, revisedClub) {
	// 	var editingClubIndex = this.findOneClubIndex(brandName);
	// 	// console.log(this.clubs);
	// 	// console.log('index:', editingClubIndex)
	// 	this.clubs[editingClubIndex] = revisedClub;
	// },
	findOneClubIndex: function(clubName) {
		var foundClubIndex;
		this.clubs.forEach(function(club, index) {
			if (club.name === clubName) {
				foundClubIndex = index;
			}
		});
		return foundClubIndex;
	}
}

angular.module('clubApp', [])
.controller('AppCtrl', function() {
  //this.name = 'Callaway';
	// this.handleClick = function() {
	// 	alert('I\'ve been clicked');
	// };
	this.clubs = golfClubs.clubs;
	this.editingClub = {};
	this.name;
	this.show;
	//console.log(this.editingClub)
	this.handleEditClick = function(clubName) {
		var clubIndex = golfClubs.findOneClubIndex(clubName);

		this.editingClub.type = golfClubs.clubs[clubIndex].type;
		this.editingClub.name = golfClubs.clubs[clubIndex].name;
		this.editingClub.price = golfClubs.clubs[clubIndex].price;

		this.name = this.editingClub.name;
		this.show = true;
		//console.log('this name:', this.editingClub.name);
	}.bind(this);
	this.deleteOneClub = function(clubName) {
		golfClubs.deleteClub(clubName);
	};
	// this.saveRevisedClub = function(clubName, revisedClub) {
	this.saveRevisedClub = function() {
		//console.log('this.name:', this.name);
		//console.log(this.editingClub.type)
		var clubIndex = golfClubs.findOneClubIndex(this.name);
		//console.log('club index:', clubIndex);

		golfClubs.clubs[clubIndex].type = this.editingClub.type;
		golfClubs.clubs[clubIndex].name = this.editingClub.name;
		golfClubs.clubs[clubIndex].price = this.editingClub.price;

		// this.editingClub.type = "";
		// this.editingClub.name = "";
		// this.editingClub.price = "";

		this.show = false;
		//golfClubs.editClub(clubName, revisedClub);
	}.bind(this);
	this.addClub = function(newClub) {
		golfClubs.clubs.unshift({name: newClub.name, type: newClub.type, price: newClub.price});

		newClub.name = "";
		newClub.type = "";
		newClub.price = "";
	}
})

//how do i clear the clubBrand?

.component('app', {
	controller: 'AppCtrl',
	templateUrl: 'templates/app.html'
	// bindings: {
	// 	clubBrand: '<',
	// 	clubType: '<',
	// 	clubPrice: '<'
	// }
});
