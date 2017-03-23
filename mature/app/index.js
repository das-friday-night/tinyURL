var express = require('express');
var app = express();

var mongoose = require('mongoose');  // used for connect mongoDB
mongoose.connect('mongodb://user:user@ds033259.mlab.com:33259/tinyurl');

// used for parse http header data,
// https://github.com/biggora/express-useragent for more info
var useragent = require('express-useragent');
app.use(useragent.express());

var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './public')});
})

// set static files location
app.use(express.static('public'));

// restful api handler
app.use('/api/v1', restRouter);

// all other url handler
app.use("/:shortUrl", redirectRouter);

app.listen(3000, function () {
    console.log('listening on port 3000!');
})

