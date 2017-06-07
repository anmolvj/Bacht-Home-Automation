var express 	= require('express');
var router 		= express.Router();
var Device 		= require('../models/device');
var User 		= require('../models/user');
//find user in db and add the passed token feild

router.get('/:uid', (req,res,next)=>{
	var user_id = req.params.uid;

	User.findOne({uid:user_id}).exec()
	.then((oneUser)=>{
		if(oneUser.token === undefined || oneUser.token === null){
		res.send({success: false, msg:'No Token Present'})
	}
	else{

		res.send({success: true, current_token:oneUser.token});}
	})
	.catch(function(err){
  		console.log('error:', err);
		});
});






router.post('/', (req,res,next)=>{
	var user_id = req.body.uid;
	var token = req.body.token;
	res.send('token: '+ req.body.token);
	// if(token == undefined | token == null){
	// 	res.send({success: false, msg:'No Token passed'})
	// }
	// else{

	// 	User.where({ uid: user_id }).update({ $set: { "token" : token }}).exec()
	// 	.then(()=>{
	// 		res.send({success: true, msg:'Following token was saved: ' + '[' + token + ']'});
	// 	})
	// 	.catch(function(err){
 //  		console.log('Error Handler:', err.message);
	// 	});
		
	// }

});



module.exports = router;

