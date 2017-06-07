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

//GET == get all scheduled devices
router.get('/:uid', (req,res,next)=>{
	let user_id = req.params.uid;
	
	User.findOne({uid:user_id}).exec()
	.then((oneUser)=>{
		// res.send(oneUser.devices.did(device_id));
		res.send(oneUser.devices.filter((obj)=>{
			return obj.isScheduled == true;
		}));
		// res.send("works till here");
	})
	.catch(function(err){
  		console.log('error:', err);
		});

	});

//POST == schedule a device
router.get('/:uid/:did/:time', (req,res,next)=>{

	//GET DID,UID,TIME FROM REQ URL
	let user_id = req.params.uid;
	let device_id = req.params.did;
	let schedule_at = req.params.time;

	//TIME -> DATE
	let date = getDate(schedule_at);
	let date1 = new Date()
	let date3 = date1+schedule_at;

	//FIND DEVICE IN LOG COLLECTION
	Log.findOne({did:device_id}).exec()
	.then((log)=>{
		//CHECK AND CLEAR IF PREVIOUS JOB EXIST
		if(log.start_job!=null){
			log.start_job.cancel();//CANCEL PREVIOUS JOB
			log.start_job = null;
		}
		////CHECK AND CLEAR IF TIMEOUT FUNCTION EXIST
		if(log.timeout!=null){
			clearTimeout(log.timeout);//CANCEL PREVIOUS TIMEOUT THREAD
			log.timeout = null;
		}
		
		//CREATE NEW START JOB
		var j = schedule.scheduleJob(date3, function(){
		  		console.log('start this device');
			});
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
	
	});
});


router.get('/:uid/:did',(req,res,next)=>{
	let user_id = req.params.uid;
	let device_id = req.params.did;

	//FIND DEVICE IN LOG COLLECTION
	Log.findOne({did:device_id}).exec()
	.then((log)=>{
		//CHECK AND CLEAR IF PREVIOUS JOB EXIST
		if(log.start_job!=null){
			log.start_job.cancel();//CANCEL PREVIOUS JOB
			log.start_job = null;
		}
		////CHECK AND CLEAR IF TIMEOUT FUNCTION EXIST
		if(log.timeout!=null){
			clearTimeout(log.timeout);//CANCEL PREVIOUS TIMEOUT THREAD
			log.timeout = null;
		}
	})
	.catch(function(err){
  		console.log('error:', err);
		});
	});


	





module.exports = router;