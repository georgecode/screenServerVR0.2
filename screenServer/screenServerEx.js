var fs = require('fs');
var http = require('http');
var https = require('https');
// var privateKey  = fs.readFileSync('keys_ssl/serverKeys/key.pem', 'utf8');
// var certificate = fs.readFileSync('keys_ssl/serverKeys/cert.pem', 'utf8');

var privateKey  = fs.readFileSync('keys_ssl/serverKeys/key.pem');
var certificate = fs.readFileSync('keys_ssl/serverKeys/cert.pem');

var express = require('express');
var app = express();

var credentials = {
	key: privateKey, 
	cert: certificate,
	// ca: [fs.readFileSync('keys_ssl/serverKeys/Certificates.pem')]
	};

var httpsServer = https.createServer(credentials, app)


// app.get('/', function(req, res) {
//   res.send('screenServerEx.js working!!!');
// });

app.use(express.static("gUM_hack"));
console.log()

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});

// app.listen(8443, function() {
//   console.log('Example app listening on port 8443!');
// });

// httpServer.listen(8080, function() {
//   console.log('Example app listening on port 8080!');
// });
var httpsServer = https.createServer(credentials, app)

httpsServer.listen(8443, function() {
  console.log('Example app listening on port 8443!');
});





// var express = require('express');
// var app = express();
// console.log("gggggggggg")

// // app.use(express.static("gUM_hack"));

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// // httpServer.listen(8080);
// // httpsServer.listen(8443);

// httpServer.listen(8080, function() {
//   console.log('Example app listening on port 8080!');
// });

// httpsServer.listen(8443, function() {
//   console.log('Example app listening on port 8443!');
// });



///////////Original no SSL //////////////


// var express = require('express');
// var app = express();


// app.use(express.static("gUM_hack"));

// // app.get('/', function(req, res) {
// //   res.send('screenServerEx.js working!!!');
// // });

// app.listen(3000, function() {
//   console.log('Example app listening on port 3000!');
// });














