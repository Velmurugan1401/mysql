const express = require("express");
const app = express();
var cors = require('cors')
const mysql = require('mysql');
const routes = require('./router/route')
var bodyParser = require('body-parser')
var conf = require('./conf')
var cors = require('cors');
// app.use(app.router);
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(cors());
app.use(function(req, res, next) {

   
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    next();
});
const connection = conf

 connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
})
app.use("/api", routes);
// routes.initialize(app);

   
    app.listen(7000, () => {
        console.log("Localhost:7000")
    });
// app.get("/",(req,res) => {
//     connection.query('SELECT * from users LIMIT 1', (err, rows) => {
//         if(err) throw err;
//         console.log('The data from users table are: \n', rows);
//         connection.end();
//     });
// });

