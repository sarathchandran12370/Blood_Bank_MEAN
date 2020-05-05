  
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mean_blood-bank',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded.');
    }else{
        console.log('MongoDB Connection err.'+err);
    }
})