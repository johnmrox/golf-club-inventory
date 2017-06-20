var db = require('../config');
var Club = require('../models/clubs');

exports.addClub = function(req, res) {
  var name = req.body.name;
  var type = req.body.type;
  var price = req.body.price;

  console.log(req.body);

  Club.findOne({name: name})
    .exec(function(err, club) {
      if (!club) {
        var newClub = new Club({
          name: name,
          type: type,
          price: price
        });
        newClub.save(function(err, newClub) {
          if (err) {
            res.status(500).send(err);
          }
          res.status(201);
          res.send('inserted');
        });
      } else {
        console.log('Club already exists');
      }
    });
};

exports.findAllClubs = function(req, res) {
	Club.find({}).exec(function(err, clubs) {
		res.status(200).send(clubs);
	});
};

exports.findOneClub = function(req, res) {
	var name = req.params.name;
	console.log('req param name:', req.params.name);

	Club.findOne({name: name})
	  .exec(function(err, club) {
	  	if (club) {
				res.status(200);
				res.send(club);
			} else {
				console.log('cannot find club');
				res.send('nothing');
			}
		});
};

exports.deleteClub = function(req, res) {
  var name = req.params.name;

  Club.remove({name: name}, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200);
    res.send('deleted');
  });
};

exports.updateClub = function(req, res) {
  var name = req.params.name;

  var newName = req.body.name;
  var newType = req.body.type;
  var newPrice = req.body.price;

	Club.findOne({name: name})
	  .exec(function(err, club) {
	  	if (club) {
	  		club.name = newName;
	  		club.type = newType;
	  		club.price = newPrice;

	  		club.save(function(err, club) {
	  			if (err) {
	  				res.status(500);
	  				res.send('failed to save');
	  			} else {
	  				res.status(200);
	  				res.send('saved');
	  			}
	  		});
			} else {
				console.log('cannot find club');
				res.send('nothing');
			}
		});
};



//need to add update method