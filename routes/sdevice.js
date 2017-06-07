var express 	= require('express');
var router 		= express.Router();
var Device 		= require('../models/device');
var User 		= require('../models/user');
var cron 		= require('node-cron');
var log 	= require('../models/scheduleLog');

function getDate(sec){
	let d = new Date(0);
	d.setUTCSeconds(sec);
	return d;
	}

function getSeconds(date){
	let sec = new Date(date).toISOString();
	return sec;
	}

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
router.post('/', (req,res,next)=>{
	let user_id = req.body.uid;
	let device_id = req.body.dev_id;
	let schedule_at = req.body.schedule_at;

	let date = getDate(schedule_at);


	//use j.cancel() to stop this job
	var j = schedule.scheduleJob(date, function(){
  		console.log('start this device');
	});
	var timeout = setTimeout(()=>{console.log("This device was stopped")},20000);
	

	});


// //PUT == reschedule a device
// router.post('/s/:uid/:dev_id', (req,res,next)=>{
// 	var user_id = req.params.uid;
// 	var device_id = req.params.dev_id;

// 	});


//DELETE== un-schedule a device
// router.delete('/s/:uid/:dev_id', (req,res,next)=>{
// 	var user_id = req.params.uid;
// 	var device_id = req.params.dev_id;

// 	});

module.exports = router;