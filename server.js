var express		= require('express');
var path		= require('path');
var bodyParser  = require("body-parser");
var mongoose 	= require('mongoose');
var mlabKey 	= 'VkK3Nww3z_Od7mFWwiAPt6tcCTLyK95Q';
var port 		= 3000;
var app			= express();
var cron 	= require('node-cron');
var log 	= require('./models/scheduleLog');
var schedule = require('node-schedule');



 var d = new Date(0);
 var sec = 1495330326;
 d.setUTCSeconds(sec);
 // console.log(d);
// var task = cron.schedule(new Date()+10000, function() {
//   		console.log('cron task at work!!');
// 		}, false);

// task.start();

// var task2 = cron.schedule(new Date()+20000, function() {
//   		task.destroy();
//   		console.log('cron task destroyed');
// 		}, false);
// task2.start();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var devv = require('./routes/device');
var sdevv = require('./routes/sdevice');
var token = require('./routes/token');
var home = require('./routes/home');

var user 		= require('./models/user');
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




var user1 = new user({uid:1});
user1.save()
.catch(function(err){
  // just need one of these
  console.log('Error Caught:', err.message);
});





app.get('/',(req,res,next)=>{

	res.send('hello you');
})

app.get('/init',(req,res,next)=>{

	var d1 = new device({did:01,name:"Television",	consumed_units:50, image_url:"https://cdn.pixabay.com/photo/2013/07/13/01/08/monitor-155158_960_720.png"});
	var log1 = new log({did:d1.did});
	var d2 = new device({did:02,name:"Refrigerator", consumed_units:79, image_url:"http://www.gadgetreview.com/wp-content/uploads/2014/08/refrigerator-reviews.jpg"});
	var log2 = new log({did:d2.did});
	var d3 = new device({did:03,name:"Air Conditioner",consumed_units:232, image_url:"http://image3.mouthshut.com/images//Offline/Common/Guide/Images/air-conditioner.png"});
	var log3 = new log({did:d3.did});
	var d4 = new device({did:04,name:"Washing Machine",consumed_units:240, image_url:"http://images.samsung.com/is/image/samsung/p5/ae/washing-machines/ww12-eco-bubble-washer-with-simply-add-during-wash.png"});
	var log4 = new log({did:d4.did});
	var d5 = new device({did:05,name:"Car Charger", isScheduled: true, image_url:"https://cdn0.iconfinder.com/data/icons/cars-and-transportation-glyph/96/26-512.png"});
	var log5 = new log({did:d5.did});

	user.where({ uid: 1 }).update({ $push: { "devices" : d1 }}).exec()
	.then(user.where({ uid: 1 }).update({ $push: { "devices" : d2 }}).exec())
	.then(user.where({ uid: 1 }).update({ $push: { "devices" : d3 }}).exec())
	.then(user.where({ uid: 1 }).update({ $push: { "devices" : d4 }}).exec())
	.then(user.where({ uid: 1 }).update({ $push: { "devices" : d5 }}).exec())
	.catch(function(err){
	  
	  console.log('Error Caught:', err.message);
	});

	log1.save()
	.then(log2.save())
	.then(log3.save())
	.then(log4.save())
	.then(log5.save())
	.catch(function(err){
	  
	  console.log('Error Caught:', err.message);
	});
	

	res.send("DB Initialization Complete");
})



app.use("/devices", devv);
app.use("/sdevices", sdevv);
app.use("/token", token);
app.use("/home", home);


app.listen(port, function(){
	console.log('Server started on port:'+port);
	});


// user.collections.insert({uid:07}); 
// device.collection.insert({name:'hakuna matata', uid:11});
// var promise1 = device1.save();
// var promise2 = device.collection.insert({name:'hello device', uid:07});
// var promise3 = device.findOne({uid:11}).exec();

// device.collection.insert({name:'holker', uid:07});
// promise1
// .then(promise2)
// .then(promise3)
// .then(function(device){
// 	console.log(device.name + " " +device.uid);
// })
// .catch(function(err){
//   // just need one of these
//   console.log('error:', err);
// });

// promise3
// .then(function(device){
// 	console.log(device.name + " " +device.uid);
// })
// .catch(function(err){
//   // just need one of these
//   console.log('error:', err);
// });



// conn.db.collectionNames(function (err, names) {
//     console.log(names);
// });

// mongoose.connection.db.listCollections({name: 'devices'})
//     .next(function(err, collinfo) {
//         if (collinfo) {
//             console.log('Exists');
//         }else{
//         	console.log('cannot find');
//         }
//     });




