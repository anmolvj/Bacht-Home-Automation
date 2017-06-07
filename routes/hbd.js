var express 	= require('express');
var router 		= express.Router();

//Find device history document from history collection using device id
//use the format "user_id"+ "device_id" to name history document



router.get('/', (req,res,next)=>{
	var uid = req.param('uid');
	res.send({
	"history_by_day" : [
		{
			"day" : 1,
			"usage" : 80.7
		},
		{
			"day" : 2,
			"usage" : 85.7
		},
		{
			"day" : 3,
			"usage" : 64.6
		},
		{
			"day" : 4,
			"usage" : 66.5
		},
		{
			"day" : 5,
			"usage" : 78.5
		},
		{
			"day" : 6,
			"usage" : 80.4
		},
		{
			"day" : 7,
			"usage" : 82.4
		},
		{
			"day" : 8,
			"usage" : 86.5
		},
		{
			"day" : 9,
			"usage" : 90.3
		},
		{
			"day" : 10,
			"usage" : 95.3
		}
	]
});

});



module.exports = router;