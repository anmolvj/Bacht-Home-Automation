var express 	= require('express');
var router 		= express.Router();

var manage_json = {
	"scheduled_devices" : [
		{
			"name" : "Washing Machine",
			"image_url" : "http://images.samsung.com/is/image/samsung/p5/ae/washing-machines/ww12-eco-bubble-washer-with-simply-add-during-wash.png",
			"last_used" : "1495326600",
		},
		{
			"name" : "Car Charger",
			"image_url" : "https://cdn0.iconfinder.com/data/icons/cars-and-transportation-glyph/96/26-512.png",
			"last_used" : "1495330200",
		}
	]
}

router.get('/:uid', (req,res,next)=>{
	var uid = req.params.uid;
	res.send(manage_json);
});



module.exports = router;