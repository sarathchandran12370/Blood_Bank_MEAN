var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name : {
        type : String,
        required : true

    },
    phone : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    gender : {
        type : String
    },
    blood_group : {
        type : String,
        required : true
    },
    DOB : {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('user',schema);