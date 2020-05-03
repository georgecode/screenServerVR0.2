var express = require('express');
var app = express();

app.use(express.static("gUM_hack"));

// app.get('/', function(req, res) {
//   res.send('screenServerEx.js working!!!');
// });

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
