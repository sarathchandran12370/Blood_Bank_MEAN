var express = require('express');
var router = express.Router();
var user = require('../models/donerModel');
var district = require('../models/districtModel');
var blood_Group = require('../models/bloodGroupModel');
var admin = require('../models/user');
var jwt = require('jsonwebtoken');


var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

/* GET API listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
/* GET API listing END. */

/* POST DATA. */
router.post('/addData', (req, res, next) => {
    message = [];

    var Data = new user({
        name : req.body.name,
        phone : req.body.phone,
        address : req.body.address,
        district : req.body.district,
        gender : req.body.gender,
        blood_group : req.body.blood_Group,
        DOB : req.body.DOB
      })
        Data.save( (err)=>{
          if(err){
            message.push({ msg: '0' });
          }else{
            message.push({ msg: '1' });
          }
          res.send(JSON.stringify(message));
        })
  });
/* POST DATA END. */

/* GET DiSTRICT list. */
router.get('/district', (req, res, next) => {
    district.find()
    .then((result)=>{
        res.send(JSON.stringify(result));
    })
    .catch((err)=>{
        console.log(err);
    })
  });
  /* GET DiSTRICT list END. */

  /* GET BLOODGROUP list. */
router.get('/group', (req, res, next) => {
    blood_Group.find()
    .then((result)=>{
        res.send(JSON.stringify(result));
    })
    .catch((err)=>{
        console.log(err);
    })
  });
  /* GET BLOODGROUP list END. */

    /* GET USER. */
router.post('/getUser', (req, res, next) => {
    console.log(req.body)
    user.findOne({"phone" : req.body.phone, "blood_group" : req.body.blood_Group, "DOB" : req.body.DOB})
    .then((result)=>{
        console.log(result)
        res.send(JSON.stringify(result));
    })
    .catch((err)=>{
        console.log(err);
    })
  });
  /* GET USER END. */

  /* POST DATA. */
router.post('/updateData/:_id', (req, res, next) => {
  message = [];
  console.log(req.params._id);
  user.findById(req.params._id)
  .then((data)=>{
    data.name = req.body.name,
    data.phone = req.body.phone,
    data.address = req.body.address,
    data.district = req.body.district,
    data.gender = req.body.gender,
    data.blood_group = req.body.blood_Group,
    data.DOB = req.body.DOB
    console.log(data)
    data.save( (err)=>{
      if(err){
        message.push({ msg: '0' });
      }else{
        message.push({ msg: '1' });
      }
      res.send(JSON.stringify(message));
    })
  })
});
/* POST DATA END. */

/* GET TABLE VIEW. */
router.post('/getUserS', (req, res, next) => {
  console.log(req.body)
  user.find({"district" : req.body.district, "blood_group" : req.body.blood_Group})
    .then((result)=>{
        console.log(result)
        res.send(JSON.stringify(result));
    })
    .catch((err)=>{
      console.log(err);
    })
});
/* GET TABLEVIEW END. */

/* GET TABLE VIEW. */
router.get('/getData', (req, res, next) => {
    user.find()
    .then((result)=>{
      console.log(result)
      res.send(JSON.stringify(result));
    })
    .catch((err)=>{
       console.log(err);
    })
});
/* GET TABLEVIEW END. */

/* DELETE USER. */
router.post('/user-delete', (req, res, next) => {
  message = [{ msg: '1'}];
  console.log(req.body)
  user.deleteOne({"_id" : req.body._id})
    .then( res.send(JSON.stringify(message)))
    .catch((err)=>{
      console.log(err);
    })
});
/* DELETE USER END. */

/* ADD ADMIN. */
router.post('/register',  function(req,res,next){
  var Admin = new admin({
    email: req.body.email,
    username: req.body.username,
    password: admin.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  let promise = Admin.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'})
  })
})
/* ADD ADMIN END. */

/* LOGIN ADMIN. */
router.post('/login', function(req,res,next){
  let promise = admin.findOne({email:req.body.email}).exec();

  promise.then(function(doc){
   if(doc) {
     if(doc.isValid(req.body.password)){
         // generate token
         let token = jwt.sign({email:doc.email},'secret', {expiresIn : '3h'});

         return res.status(200).json(token);

     } else {
       return res.status(501).json({message:' Invalid Credentials'});
     }
   }
   else {
     return res.status(501).json({message:'User email is not registered.'})
   }
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
})
/* LOGIN ADMIN END. */

/* VERIFY TOCKEN. */
router.get('/username', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.email);
})
/* VERIFY TOCKEN END. */

module.exports = router;
