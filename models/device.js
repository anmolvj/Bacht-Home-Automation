var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DeviceSchema = new Schema(
	{
		name: 		{type:String},
		did: 		{type: Number, required:true},	
		image_url: 	{type: String},
		last_used: 	{type: Number},
		consumed_units: {type:Number, default:0},
		running_since: {type: Date, default: Date.now},
		isScheduled: {type: Boolean, default:false},
		schedule: {type:Number ,default:0},
		switch_on:{type:String,default:'empty'},
		switch_off: {type: String, default:'empty'}
			
		
	});


// DeviceSchema.virtual('schedule.stop').get(function () {
// 	return new Date(this.schedule.start.)
// });

//Turned to a model before exporting
module.exports = mongoose.model('Device', DeviceSchema);
