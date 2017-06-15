var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DeviceSchema = new Schema(
	{
		name: 		{type:String},
		did: 		{type: Number, required:true},	
		image_url: 	{type: String},
		last_used: 	{type: Number},
		consumed_units: {type:Number, default:0},
		isRunning: {type:Boolean, default:true},
		running_since: {type: Date, default: Date.now},
		isScheduled: {type: Boolean, default:false},
		schedule: {
			start: {type:Number ,default:null},
			stop: {type:Number ,default:null},

		}
		
	});

// DeviceSchema.virtual('schedule.stop').get(function () {
// 	return new Date(this.schedule.start.)
// });

//Turned to a model before exporting
module.exports = mongoose.model('Device', DeviceSchema);
