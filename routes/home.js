var express 	= require('express');
var router 		= express.Router();
var Device 		= require('../models/device');
var User 		= require('../models/user');
//return total usage so far and max limit


router.get('/:uid', (req,res,next)=>{
	var user_id = req.params.uid;
	User.findOne({uid:user_id}).exec()
	.then((oneUser)=>{
		res.send({total_usage: oneUser.total_usage, max_limit: oneUser.max_limit });
	})
	.catch(function(err){
  		console.log('error:', err);
		});

});



module.exports = router;