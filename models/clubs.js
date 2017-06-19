var mongoose = require('mongoose');

var clubSchema = mongoose.Schema({
	name: {type: String, index: {unique: true}},
	type: String,
	price: Number
});

var Club = mongoose.model('Club', clubSchema);

module.exports = Club;