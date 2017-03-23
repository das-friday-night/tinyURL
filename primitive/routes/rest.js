var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonparser = bodyParser.json();
var urlmodel = require('../models/urlModel'); // long short url pair
var statsservice = require('../services/statsService');


router.get('/urls/:short', function (req, res){
    var url_s = req.params.short;
    urlmodel.findOne({url_s: url_s}, function(err, url){
        if(url) {
            res.json(url);
        } else {
            res.json({});
            // TODO: res.status(404).send("failure"):
        }
    });
})

router.get('/urls/:short/:tar', function (req, res){
    var url_s = req.params.short;
    var tar = req.params.tar;
    statsservice.getStats(url_s, tar, function (data){
        res.json(data);
    })
})

router.post('/urls', jsonparser, function(req, res){
    var url_l = req.body.url_l;
    if(url_l.indexOf('http://') == -1){
        url_l = "http://" + url_l;
    }
    getshorturl(url_l, function(url){
        res.json(url);
    });

})



function getshorturl(url_l, callback) {
    urlmodel.findOne({url_l:url_l}, function(err,url) {
        if(url == undefined){
            urlmodel.count({},function(err,count){
                var url_s = convert62(count);
                var url = new urlmodel({
                    url_l: url_l,
                    url_s: url_s
                });
                url.save();
                callback(url);
            });
        } else {
            callback(url);
        }
    });
}

var encode = []; //'a',...,'z','A',...,'Z','0',...,'9'

function gencode(char1, char2){
    var arr = [];
    var i = char1.charCodeAt(0);
    var j = char2.charCodeAt(0);
    for(; i<=j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
}

encode = encode.concat(gencode('a','z'));
encode = encode.concat(gencode('A','Z'));
encode = encode.concat(gencode('0','9'));

function convert62(num){
    var res = '';
    do{
        res = encode[num%62] + res;
        num = Math.floor(num/62);
    } while(num);
    return res;
}

module.exports = router;