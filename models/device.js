var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeviceSchema = new Schema(
	{
		name: {
			type:String},

		deviceid: {
			type: Number,default:11},

		image_url: {
			type: String},

		last_used: {
			type: Date},

		consumed_units: {
			type:Number, default: 0},

		scheduled: {
			type: Boolean, default: false},

		start: {
			type:Date},

		stop: {
			type:Date}

	});


module.exports = mongoose.model('Device', DeviceSchema);

