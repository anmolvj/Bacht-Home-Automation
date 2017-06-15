var express 	= require('express');
var router 		= express.Router();
var Device 		= require('../models/device');
var User 		= require('../models/user');
var gcm = require('node-gcm');
var apiKey = "AAAAy1bz1v0:APA91bHgXamcKF8BUHtqq4JVCE5u0KTKiTwiCWomvPqMgeSeJm2wudcaLRfAb1gS8RsLEyE6TOLp6eibBZ_NbHWUFPRhcrfI41CTiVzvn8sjObIyaVnNQ6BhCveDa7uFBnXbAfae_55Y" ;

//MANUAL GCM TRIGGER
router.get('/', (req,res,next)=>{

	// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
	var sender = new gcm.Sender(apiKey);

	// Prepare a message to be sent
	var message = new gcm.Message({
	    collapseKey: 'demo',
                priority: 'high',
                contentAvailable: true,
                delayWhileIdle: true,
                timeToLive: 3,
                dryRun: true,
                data: {
                        key1: 'message1',
                        key2: 'message2'
                },
                notification: {
                        title: "Hello, World",
                        icon: "ic_launcher",
                        body: "This is a notification that will be displayed if your app is in the background."
                }
        });
	});

	// Specify which registration IDs to deliver the message to
	User.findOne({uid:1}).exec()
		.then((oneUser)=>{
			var token = oneUser.token;
			var regTokens = [token];

			// Actually send the message
			sender.sendNoRetry(message, { registrationTokens: regTokens }, function (err, response) {
				if (err) {
					console.error(err);
				}
				else {
					console.log(response);
					if(response.success == 0){
						res.send({"success":"false","error": response.results});
					}else{
						res.send({"success":"true"});
					}
				}
			});
		})
		.catch(function(err){
	  		console.log("An error occured during GCM call");
			});

	











module.exports = router;

