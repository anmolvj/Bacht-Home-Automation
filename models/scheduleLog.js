var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleLogSchema = new Schema(
	{
		did: 		{type: Number, required:true, unique:true},	
		start_job: 	{},
		timeout: 	{type:Number, default: null},
		log: 		[]
		
	});




//Turned to a model before exporting
module.exports = mongoose.model('ScheduleLog', ScheduleLogSchema);
