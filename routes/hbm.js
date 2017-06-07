var express 	= require('express');
var router 		= express.Router();

//Find device history document from history collection using device id
//use the format "user_id"+ "device_id" to name history document



router.get('/', (req,res,next)=>{
	var uid = req.param('uid');
	res.send({
	"history_by_month" : [
		{
			"month" : 1,
			"usage" : 320
		},
		{
			"month" : 2,
			"usage" : 297
		},
		{
			"month" : 3,
			"usage" : 284
		},
		{
			"month" : 4,
			"usage" : 275
		},
		{
			"month" : 5,
			"usage" : 269
		},
		{
			"month" : 6,
			"usage" : 250
		},
		{
			"month" : 7,
			"usage" : 300
		},
		{
			"month" : 8,
			"usage" : 244
		},
		{
			"month" : 9,
			"usage" : 276
		},
		{
			"month" : 10,
			"usage" : 289
		},
		{
			"month" : 11,
			"usage" : 303
		},
		{
			"month" : 12,
			"usage" : 326
		}
	]
});

});



module.exports = router;