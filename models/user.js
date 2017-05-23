var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema(
	{
		uid: 		{type: Number, required:true, unique: true},
		name: 		{type:String, unique:true, required:true},
		home_usage: {type:Number, default:0},
		history: {
					day: 	{type:Number, default:0},
					week: 	{type:Number, default:0},
					month: 	{type:Number, default:0}
				},
		devices: [{
					name:{type: String},
					did: {type: Number}
		 }],		
		max_limit: 	1000,
	});

//Turned to a model before exporting
module.exports = mongoose.model('User', UserSchema);
		