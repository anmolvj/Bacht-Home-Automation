var express 	= require('express');
var router 		= express.Router();

//Find device history document from history collection using device id
//use the format "user_id"+ "device_id" to name history document



router.get('/', (req,res,next)=>{
	var uid = req.param('uid');
	res.send({
	"history_by_device" : [
		{
			"device_id" : 1,
			"name" : "Television",
			"usage" : 843.34
		},
		{
			"device_id" : 2,
			"name" : "Refrigerator",
			"usage" : 943.34
		},
		{
			"device_id" : 3,
			"name" : "Air Conditioner",
			"usage" : 1333.33
		},
		{
			"device_id" : 4,
			"name" : "Washing Machine",
			"usage" : 1123.53
		}
	]
});

});



module.exports = router;