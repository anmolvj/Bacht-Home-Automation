//METHODS
//get all scheduled devices
//schedule a device
//reschedule a device
//cancel a device schedule(involves stopping)


var express 	= require('express');
var router 		= express.Router();
var Device 		= require('../models/device');
var User 		= require('../models/user');
var cron 		= require('node-cron');
var Log 	= require('../models/scheduleLog');
var schedule = require('node-schedule');

function getDate(sec){
	let d = new Date(0);
	d.setUTCSeconds(sec);
	return d;
	}

function getSeconds(date){
	let sec = new Date(date).toISOString();
	return sec;
	}

//GET log of one Device
router.get('/log/:uid/:did', (req,res,next)=>{
	let user_id = req.params.uid;
	let device_id = req.params.did;

	//FIND DEVICE IN LOG COLLECTION
	Log.findOne({did:device_id}).exec()
	.then((log)=>{
		res.send(log);
		
	})
	.catch(function(err){
  		console.log('error:', err);
		});
	});

//Get all scheduled devices
router.get('/:uid', (req,res,next)=>{
	let user_id = req.params.uid;
	
	User.findOne({uid:user_id}).exec()
	.then((oneUser)=>{
		let sdevices = oneUser.devices.filter((obj)=>{
			return obj.isScheduled == true;
			
		});
			let responce = {"scheduled_devices":[]};
			sdevices.forEach((device)=>{
			responce.scheduled_devices.push({
				"device_id": device.did,
				"name": device.name,
				"image_url": device.image_url,
				"scheduled_at": device.schedule.start
			});
		});
		
		responce.scheduled_devices.sort(function(a, b){
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

//Schedule a device
router.post('/', (req,res,next)=>{

	//GET DID,UID,TIME FROM REQ URL
	let user_id = req.body.uid;
	let device_id = req.body.device_id;
	let schedule_at = req.body.schedule_at;
	let isPast = false;//to check if device schedule time is in past
	if(schedule_at==null || schedule_at==undefined){
		res.send("Value of Schedule_at is invalid");
	}
	if(isNaN(schedule_at)){
		res.send("Value of Schedule_at must only have numerical digits in string format");
	}
	if(schedule_at.length != 10){
		res.send("The schedule_at value must be an epoch/POSIX/Unix time with exactly 10 digits");
	}
	if(schedule_at<getSeconds(new Date())){
		isPast = true;
	}

	//TIME -> DATE
	let start = getDate(schedule_at);//returns date object
	let stop = start.setMinutes(start.getMinutes() + 5);
	//Get device
	//set its start and stop time
	//set isScheduled == true

	User.update(
	    {uid: user_id, 'devices.did': device_id}, 
	    {'$set': {
	        'devices.$.isScheduled': true,
	        'devices.$.schedule.start': schedule_at          
	    	},

	    })
		.catch(function(err){
  			console.log('Error Handler:', err.message);
		});

		// if(isPassed){
		// 		res.send({success: true;})
		// }else{}
    			res.send({success: true});
    		
	

	





	//FIND DEVICE IN LOG COLLECTION
	// Log.findOne({did:device_id}).exec()
	// .then((log)=>{
	// 	//CHECK AND CLEAR IF PREVIOUS JOB EXIST
	// 	if(log.start_job!=null){
	// 		log.start_job.cancel();//CANCEL PREVIOUS JOB
	// 		log.start_job = null;
	// 	}
	// 	////CHECK AND CLEAR IF TIMEOUT FUNCTION EXIST
	// 	if(log.timeout!=null){
	// 		clearTimeout(log.timeout);//CANCEL PREVIOUS TIMEOUT THREAD
	// 		log.timeout = null;
	// 	}
		
		//CREATE NEW START JOB
		// var j = schedule.scheduleJob(date3, function(){
		//   		console.log('start this device');
		// 	});
		//CREATE NEW TIMEOUT JOB
		// var timeout = setTimeout(()=>{console.log("This device was stopped")},20000);

		//SAVE THEM IN DB
		// Log.findOne({ did:device_id }).update({ $set: { "start_job" : j }}).exec()
		// .then(log.findOne({ did:device_id }).update({ $set: { "timeout" : timeout }}).exec());
		// res.send(timeout);
		// Log.findOne({ did:device_id }).update({ $set: { "timeout" : timeout }}).exec()
		// .then(res.send({"Success": true}))
		// .catch(function(err){
  // 					console.log('error:', err);
		// 		});
	
	// });
});

//Cancel a device Schedule
router.post('/c', (req,res,next)=>{

	//GET DID,UID,TIME FROM REQ URL
	let user_id = req.body.uid;
	let device_id = req.body.device_id;
	
	User.update(
	    {uid: user_id, 'devices.did': device_id}, 
	    {'$set': {
	        'devices.$.isScheduled': false          
	    	}
	    })
	.then(res.send({success: true}))
		.catch(function(err){
  			console.log('Error Handler:', err.message);
		});

    
	
});

// router.get('/:uid/:did',(req,res,next)=>{
// 	let user_id = req.params.uid;
// 	let device_id = req.params.did;

	
// 	});


module.exports = router;