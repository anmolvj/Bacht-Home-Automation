var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema(
	{
		uid: {type: Number, required:true, unique: true},
		name: {type:String, unique:true, required:true};
		max_limit: 1000;
		home_usage: {type:Number, default:0},
		history_by_day: {type:Number, default:0},
		history_by_week: {type:Number, default:0},
		history_by_month: {type:Number, default:0}
	});

//Turned to a model before exporting
module.exports = mongoose.model('User', UserSchema);