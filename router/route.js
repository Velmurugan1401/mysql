const express = require("express");
const conf = require('../conf')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment= require('moment') 

router.get('/listusers', function(req, res) {
    conf.query('SELECT * from citylocation', function(err, result) {
        res.send(result)
    })

})
router.post('/listbyid', function(req, res) {
  conf.query('SELECT * FROM citylocation WHERE id = "'+req.body.id+'"', function(err, result) {
      res.send(result)
  })

})
router.post('/delete', function(req, res) {
  conf.query('DELETE FROM citylocation WHERE id="'+req.body.id+'"', function(err, result) {
    if(err){
      res.send({"status":false,"reasone":result})
    }else{
      res.send({"status":true,"message":"Place deleted successfully"})
    }
      
  })

})

router.post('/listplaces', function(req, res) {
  conf.query('SELECT * FROM citylocation WHERE persion IN ("'+req.body.persion+'", "all") ', function(err, result) {
      res.send(result)
  })

})

router.post('/adduser', function(req, res) {
  // console.log(req.body)
  if(req.body &&req.body.address&&req.body.city){
    var sql = "INSERT INTO citylocation (address,city,id,state,pincode,name,created_time,updated_time,place_logo,persion) VALUES ('"+req.body.address+"', '"+req.body.city+"','"+uuidv4()+"','"+req.body.state+"','"+req.body.pincode+"','"+req.body.name+"','"+req.body.created_time+"','"+req.body.created_time+"','"+req.body.place_logo+"','"+req.body.persion+"')";
    conf.query(sql, function (err, result) {
      if (err){
        res.send({"status":false,"message":err})

      }else{
        res.send({"status":true,"message":"insert success fully"})

      }
    });
  }else{
    res.send({"status":false,"message":"require filed is empty"})
  }
     

})
router.post('/updateuser', function(req, res) {
  // console.log(req.body)
  if(req.body &&req.body.address&&req.body.city){
    var id = req.body.id
    delete req.body.id
   var respinse = conf.query('UPDATE citylocation SET ? WHERE id = "'+id+'"',req.body)
   res.send({"status":true,"message":"DB updated seccessfully"})

  }

})



router.get('/listproduct', function(req, res) {
  conf.query('SELECT * from citylocation', function(err, result) {
      res.send(result)
  })

})

router.post('/login', function(req, res) {
  conf.query('SELECT * FROM users WHERE email LIKE "'+req.body.email+'" AND password LIKE "'+req.body.password+'"', function(err, result) {
    if (err){
      res.send({"status":false,"message":err})
    }else{
     
      res.send({"status":true,"result":result})

    }
    // res.send(result)
  })

})
module.exports = router;