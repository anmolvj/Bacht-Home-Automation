var express 	= require('express');
var router 		= express.Router();

//Find device history document from history collection using device id
//use the format "user_id"+ "device_id" to name history document



router.get('/', (req,res,next)=>{
	var uid = req.param('uid');
	res.send({
	"history_by_year" : [
		{
			"year" : 2017,
			"usage" : 2566.54
		},
		{
			"year" : 2016,
			"usage" : 2674.52
		},
		{
			"year" : 2015,
			"usage" : 2343.45
		}
	]
});

});



module.exports = router;