var express=require("express");
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static("../wwwroot"));

let dbserver=require('./mysqlhelper');
require('./personapi')(app,dbserver);


app.listen(9000);
console.log("Running....");

