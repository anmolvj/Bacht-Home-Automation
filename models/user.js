var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Device 	= require('./device');

var UserSchema = Schema(
	{
		uid: 		{type: Number, required:true, unique: true},
		name: 		{type:String},
		total_usage: {type:Number, default:433},
		token: 		{type:String, default:"none"},
		max_limit: 	{type:Number, default:1000},
		usage: 		{type:Number, default:0},
		devices: 	[],
		wasNotified: {type:Boolean, default:false},
		history: {
					day: 	{type:Number, default:0},
					week: 	{type:Number, default:0},
					month: 	{type:Number, default:0}
				},		
	});

//Turned to a model before exporting
module.exports = mongoose.model('User', UserSchema);

// devices: 	[{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}],		