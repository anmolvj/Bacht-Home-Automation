var express 	= require('express');
var router 		= express.Router();

//Find device history document from history collection using device id
//use the format "user_id"+ "device_id" to name history document



router.get('/:uid', (req,res,next)=>{
	var uid = req.params.uid;
	//get user log document
	//new resObj
	//foreach(year){
	//		new tempJSON
	//		var usage = 0;
	//		foreach(log.start.year==year){
	//			usage = usage + log.usage;		
	//		}
	//		tempJSON.year = year;
	//		tempJSON.usage = usage;
	//		push tempJSON to resObj
	//}
	//return resObj
	let staticLog = {
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
				}]
		}
	res.send(staticLog);	


});



module.exports = router;