var express 	= require('express');
var router 		= express.Router();

var dummy_data  = {
	"devices" : [
		{
			"name" : "Television",
			"image_url" : "https://cdn.pixabay.com/photo/2013/07/13/01/08/monitor-155158_960_720.png",
			"last_used" : "1495330326",
			"consumed_units" : 50
		},
		{
			"name" : "Refrigerator",
			"image_url" : "http://www.gadgetreview.com/wp-content/uploads/2014/08/refrigerator-reviews.jpg",
			"last_used" : "1495330326",
			"consumed_units" : 79
		},
		{
			"name" : "Air Conditioner",
			"image_url" : "http://image3.mouthshut.com/images//Offline/Common/Guide/Images/air-conditioner.png",
			"last_used" : "1495339996",
			"consumed_units" : 232
		},
		{
			"name" : "Washing Machine",
			"image_url" : "http://images.samsung.com/is/image/samsung/p5/ae/washing-machines/ww12-eco-bubble-washer-with-simply-add-during-wash.png",
			"last_used" : "1495330566",
			"consumed_units" : 240
		},
	]
}

router.get('/:uid', (req,res,next)=>{
	var uid = req.params.uid;
	res.send(dummy_data);
});



module.exports = router;