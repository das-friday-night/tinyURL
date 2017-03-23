var express = require("express");
var router = express.Router();
var urlmodel = require('../models/urlModel'); // long short url pair
var statsservice = require('../services/statsService');
var path = require('path');

router.get('*', function (req, res){
    // e.g: if we get http://localhost:3000/client/urls/a
    // req.originalUrl = /client/urls/a
    // req.originalUrl.slice(1) = client/urls/a

    var url_s = req.originalUrl.slice(1);
    urlmodel.findOne({url_s: url_s}, function(err, url){
        if(url == undefined){
            // rest cases will be handled by client routes not server routes
            res.status(200).sendFile('index.html', {root: path.join(__dirname,'../public/')});
        } else {
            res.redirect(url.url_l);
            statsservice.parseStats(url_s, req);
        }
    });
})

module.exports = router;