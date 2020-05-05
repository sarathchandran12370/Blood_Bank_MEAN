var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    district : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('district',schema);