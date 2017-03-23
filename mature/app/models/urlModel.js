// schema to store long short url pairs
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
    url_l: String,
    url_s: String
});

var UrlModel = mongoose.model('UrlModel', urlSchema);
module.exports  = UrlModel;