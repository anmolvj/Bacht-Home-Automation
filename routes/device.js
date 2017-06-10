var express 	= require('express');
var router 		= express.Router();
var Device 		= require('../models/device');
var User 		= require('../models/user');

// var mongoose = require('mongoose');
// var mongoDB = 'mongodb://root:12345@ds017155.mlab.com:17155/bacht';
// mongoose.connect(mongoDB);
// // //@override
// // mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//-------THIS WORKS-----//
// var d = new device({uid:32});
// console.log(d);
// var d1 = new device({uid:99});
// user.where({ uid: 1 }).update({ $push: { "devices" : d }}).exec();
// user.where({ uid: 1 }).update({ $push: { "devices" : d1 }}).exec();






//GET == Get all the devices 
router.get('/:uid', (req,res,next)=>{
	var user_id = req.params.uid;

	User.findOne({uid:user_id}).exec()
	.then((oneUser)=>{
		let devices = oneUser.devices;
		let responce = {"running_devices":[]};
		devices.forEach((device)=>{
			responce.running_devices.push({
				"device_id": device.did,
				"name": device.name,
				"image_url": device.image_url,
				"last_used": device.last_used,
				"consumed_units": device.consumed_units,
			});

		});
		responce.running_devices.sort(function(a, b){
		    var keyA = a.device_id,
		    	keyB = b.device_id;
		    // Compare the 2 dates
		    if(keyA < keyB) return -1;
		    if(keyA > keyB) return 1;
		    return 0;
		});
		res.send(responce);
	})
	.catch(function(err){
  		console.log('error:', err);
		});
	

	});


//GET == Get a single device
router.get('/:uid/:dev_id', (req,res,next)=>{
	var user_id = req.params.uid;
	var device_id = req.params.dev_id;

	User.findOne({uid:user_id}).exec()
	.then((oneUser)=>{
		// res.send(oneUser.devices.did(device_id));
		res.send(oneUser.devices.filter((obj)=>{
			return obj.did == device_id;
		}));
	})
	.catch(function(err){
  		console.log('error:', err);
		});

	});


//POST == Create a new device
router.post('/', (req,res,next)=>{
	var user_id = req.body.user_id;

	
	

	});


//PUT == update a device info
router.post('/:uid/:dev_id', (req,res,next)=>{
	var user_id = req.params.uid;
	var device_id = req.params.dev_id;
	
	});


//DELETE == Delete a device 
router.delete('/:uid/:dev_id', (req,res,next)=>{
	var user_id = req.params.uid;
	var device_id = req.params.dev_id;

	});








// function hasProperty(x){

// 		if(x.hasOwnProperty('scheduled_at')){
// 			return true;
// 		}else{
// 			return false;
// 		}
// 	}

// function getElement(x,i){
// 	return x.device_id === i;
// }







//get device array from user and return the scheduled devices
// router.get('/sd', (req,res,next)=>{
// 	var uid = req.param('uid');
// 	//make json of scheduled devices
	
// 	var result = {
// 		scheduled_devices: [deviceJson.filter(hasProperty)]
// 	};
// 	res.send(result);

// });


//make this post for scheduling devices
// router.get('/s', (req,res,next)=>{
// 	var uid = req.param('uid');
// 	var did = req.param('device_id');
// 	var schedule_at = req.param('schedule_at');

// 	deviceJson.forEach((item)=>{
// 		if(item.device_id === did){
// 			item.scheduled_at =  schedule_at;
// 		}
// 	});
// 	var result = {success : true};
// 	res.send(result);

// });


//make this post for cancelling a device
// router.get('/c', (req,res,next)=>{
// 	var uid = req.param('uid');
// 	var did = req.param('device_id');
	

// 	// deviceJson.forEach((item)=>{
// 	// 	if(item.device_id === did){
// 	// 		 item.scheduled_at = 'tararara';
// 	// 	}
// 	// });
// 	deviceJson.forEach((obj)=>{
// 		if(obj.device_id === did){
// 			delete obj['scheduled_at'];
// 		}
// 	});
// 	var result = {success : true};
// 	res.send(result);

// });


//make a new one to immediately stop device

module.exports = router;





