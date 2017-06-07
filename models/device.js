var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DeviceSchema = new Schema(
	{
		name: 		{type:String},
		did: 		{type: Number, required:true},	
		image_url: 	{type: String},
		last_used: 	{type: Date},
		consumed_units: {type:Number, default:0},
		isScheduled: {type: Boolean, default:false},
		schedule: {
			start: {type:Date ,default:null},
			stop: {type:Date ,default:null},

		}
		
	});

//Turned to a model before exporting
module.exports = mongoose.model('Device', DeviceSchema);
