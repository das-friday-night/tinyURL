var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statsSchema = new Schema({
    url_s: String,
    ip: String,
    countryOrRegion: String,
    referrer: String,   // The referrer is the webpage that sends visitors to your site using a link.
    platform: String,   // OS
    browser: String,
    timestamp: Date
});

var StatsModel = mongoose.model('StatsModel', statsSchema);
module.exports  = StatsModel;