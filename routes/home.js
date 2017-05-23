var express 	= require('express');
var router 		= express.Router();

var home_json = {
	"total_usage" : 433,
	"max_limit" : 1000
}


router.get('/:uid', (req,res,next)=>{
	var uid = req.params.uid;
	res.send(home_json);

});



module.exports = router;