var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeviceSchema = new Schema(
	{
		name: 		{type:String},
		did: 		{type: Number,unique: true},
		uid: 		{type: Number, required:true},	
		image_url: 	{type: String},
		last_used: 	{type: Date},
		consumed_units: {type:Number, default: 0},
		schedule: 	{
						isScheduled: {type: Boolean, default: false},
						start: {type: Date},
						stop: {type: Date}
		}
	});

//Turned to a model before exporting
module.exports = mongoose.model('Device', DeviceSchema);
