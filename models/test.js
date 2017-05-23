var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TestSchema = new Schema(
	{
		name: {type:String}
		
	});

//Turned to a model before exporting
module.exports = mongoose.model('Test', TestSchema);