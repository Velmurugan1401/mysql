const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'vel',
    password : 'Vel@1401',
    database : 'users'
  });

  module.exports = connection ;