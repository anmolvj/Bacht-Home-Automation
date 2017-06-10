var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleLogSchema = new Schema(
	{
		uid: 		{type: Number, required:true, unique:true},	
		log: 		[]
		
	});




//Turned to a model before exporting
module.exports = mongoose.model('ScheduleLog', ScheduleLogSchema);
