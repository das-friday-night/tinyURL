var statsmodel = require('../models/statsModel'); // long short url pair
var geoip = require('geoip-lite');

var parseStats = function(url_s, req) {
    var temp = {};
    temp.url_s = url_s;
    temp.ip = req.headers['x-forwarded-for'] ||
              req.connection.remoteAddress ||
              req.socket.remoteAddress ||
              req.connection.socket.remoteAddress;
    var geo = geoip.lookup(temp.ip);
    if (geo) {
        temp.countryOrRegion = geo.country;
    } else {
        temp.countryOrRegion = 'Unknown';
    }
    temp.referrer = req.headers.referer || 'Unknown'; // if referer not exists
    temp.platform = req.useragent.platform || 'Unknown';
    temp.browser = req.useragent.browser || 'Unknown';
    temp.timestamp = new Date();

    var stat = new statsmodel(temp);
    stat.save();
}

var getStats = function (url_s, tar, callback) {
    if(tar == 'click'){
        statsmodel.count({url_s:url_s}, function(err,num){
            callback(num);
        });
        return;
    }

    // first 3 condition for getting data by time
    var groupId = '';
    if (tar === 'hour'){
        groupId = {
            year: {$year: '$timestamp'},
            month: {$month: '$timestamp'},
            day: {$dayOfMonth: '$timestamp'}, // Notes: it is dayOfMonth, not day
            hour: {$hour: '$timestamp'},
            minutes: {$minute: '$timestamp'}
        };
    } else if (tar === 'day'){
        groupId = {
            year: {$year: '$timestamp'},
            month: {$month: '$timestamp'},
            day: {$dayOfMonth: '$timestamp'}, // Notes: it is dayOfMonth, not day
            hour: {$hour: '$timestamp'}
        };
    } else if (tar === 'month'){
        groupId = {
            year: {$year: '$timestamp'},
            month: {$month: '$timestamp'},
            day: {$dayOfMonth: '$timestamp'} // Notes: it is dayOfMonth, not day
        };
    } else {
        // countryOrRegion, referrer, platform, browser
        groupId = '$' + tar;
    }

    // for more info about aggregate in MongoDB:
    // https://www.mkyong.com/mongodb/mongodb-aggregate-and-group-example/
    // aggregate has an order: match -> sort -> group
    statsmodel.aggregate([
        {
            // only group those data with certain url_s
            $match: {
                url_s: url_s
            }
        },
        {
            // sort the result by timestamp in descending order
            $sort: {
                timestamp: -1
            }
        },
        {
            // group data by groupID which is a variable
            $group: {
                _id: groupId,
                count: {
                    $sum: 1
                }
            }
        }
    ], function(err, data){
        callback(data);
    })

}

module.exports = {
    parseStats : parseStats,
    getStats: getStats
}