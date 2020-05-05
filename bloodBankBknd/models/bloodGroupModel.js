var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    blood_Group : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('blood_Group',schema);