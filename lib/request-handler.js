var db = require('../config');
var Club = require('../models/clubs');

exports.addClub = function(req, res) {
  var name = req.body.name;
  var type = req.body.type;
  var price = req.body.price;

  console.log(req.body);

  Club.findOne({name: name})
    .exec(function(err, club) {
      console.log('club:', club);
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
          res.status(200);
          res.send('inserted');
        });
      } else {
        console.log('Club already exists');
      }
    });
};

exports.deleteClub = function(req, res) {
  var name = req.body.name;

  Club.remove({ name: name }, function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
};

exports.findAllClubs = function(req, res) {
	Club.find({}).exec(function(err, clubs) {
		res.status(200).send(clubs);
	});
};

exports.findOneClub = function(req, res) {

};


//need to add update method