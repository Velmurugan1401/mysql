const express = require("express");
const conf = require('../conf')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment= require('moment') 

router.get('/listusers', function(req, res) {
    conf.query('SELECT * from users', function(err, result) {
        res.send(result)
    })

})

router.post('/adduser', function(req, res) {
  if(req.body &&req.body.email&&req.body.password){
    var sql = "INSERT INTO users (name,email, id,password,role,createtime,accid) VALUES ('"+req.body.name+"', '"+req.body.email+"','"+uuidv4()+"','"+req.body.password+"','ADMIN',STR_TO_DATE('"+moment().format('DD/MM/YYYY h:mm:ss')+"','%d/%m/%Y %H:%i:%s'),345672)";
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

// product details--------------------------------------------------

router.post('/addproduct', function(req, res) {
  if(req.body.productname && req.body.productprice && req.body.brand && req.body.quality && req.body.expireDate && req.body.manufacturingDate && req.body.accid){
    var description  = req.body.discription ? req.body.discription :'-';
    var sql = "INSERT INTO addproduct (productname, productprice,brand,quality,manufacturingdate,expiretdate,description,createt,updatett,id,accid) VALUES ('"+req.body.productname+"', '"+req.body.productprice+"','"+ req.body.brand+"','"+req.body.quality+"',STR_TO_DATE('"+moment(req.body.manufacturingDate).format('DD/MM/YYYY h:mm:ss')+"','%d/%m/%Y %H:%i:%s'),STR_TO_DATE('"+moment(req.body.expireDate).format('DD/MM/YYYY h:mm:ss')+"','%d/%m/%Y %H:%i:%s'),'"+description+"',STR_TO_DATE('"+moment().format('DD/MM/YYYY h:mm:ss')+"','%d/%m/%Y %H:%i:%s'),STR_TO_DATE('"+moment().format('DD/MM/YYYY h:mm:ss')+"','%d/%m/%Y %H:%i:%s'),'"+uuidv4()+"','"+req.body.accid+"')";
    conf.query(sql, function (err, result) {
      if (err){
        res.send({"status":false,"message":err})
      }else{
       
        res.send({"status":true,"message":"Product Added Successfully"})
  
      }
    });
  }else{
    res.send({"status":false,"message":"Require filed is empty"})
  }
 

})


router.get('/listproduct', function(req, res) {
  conf.query('SELECT * from addproduct', function(err, result) {
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