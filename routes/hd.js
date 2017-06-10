var express 	= require('express');
var router 		= express.Router();

//Find device history document from history collection using device id
//use the format "user_id"+ "device_id" to name history document



router.get('/:uid', (req,res,next)=>{
	var uid = req.params.uid;
	//get user log document
	//new resJSON
	//foreach(date){
	//		new tempJSON
	//		var usage = 0;
	//		foreach(log.start.date==date){
	//			usage = usage + log.usage;		
	//		}
	//		tempJSON.date = formatted(date);
	//		tempJSON.usage = usage;
	//		push tempJSON to resJSON
	//}
	//return resJSON	
	let staticLog = {
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
		}
	res.send(staticLog);
});



module.exports = router;