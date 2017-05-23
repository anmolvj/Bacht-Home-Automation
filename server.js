var express		= require('express');
var path		= require('path');



var app			= express();

var mongoose 	= require('mongoose');
var mlabKey 	= 'VkK3Nww3z_Od7mFWwiAPt6tcCTLyK95Q';
var port 		= 3000;

var req1		= require('./routes/home');
var req2		= require('./routes/individual_devices');
var req3		= require('./routes/manage');
var req4		= require('./routes/history');
var test 		= require('./models/test');
var device 		= require('./models/device');

//Set up mongoose connection
var mongoDB = 'mongodb://root:12345@ds017155.mlab.com:17155/bacht';
mongoose.connect(mongoDB);
//@override
mongoose.Promise = global.Promise;

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.once('open', function() {
  console.log("Connection to mlab established");                         
});


var input = {
		name: 'Amazing stuff',
		deviceid: 02,
		image_url: 'the url',
		last_used: new Date(),
		consumed_units: 00,
		scheduled: false,
		start: new Date(),
		stop: new Date()
}


var device1 = new device(input);

var promise1 = device1.save();
var promise2 = device.collection.insert({name:'hello device'});
var promise3 = device.findOne({'name':'Amazing stuff'}).exec();


promise1
.then(promise2)
.then(promise3)
.then(function(device){
	console.log(device.name + " " +device.image_url);
})
.catch(function(err){
  // just need one of these
  console.log('error:', err);
});







app.use('/api/1', req1);
app.use('/api/2', req2);
app.use('/api/3', req3);
app.use('/api/4', req4);



app.listen(port, function(){
	console.log('Server started on port:'+port);
	});

