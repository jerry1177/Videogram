//  Tool used for running queries
//  in any input file against the
//  videogram database.

// Some Setup
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Get the input file.
//var File = process.argv[2];



// Read the query text into variable
var readline = require('readline');
var fs = require('fs');
//var QueryArray = fs.readFileSync(File, 'utf8').replace(/\n/g, " ");

// Print the query text
//console.log(QueryArray);
//var arr = QueryArray.split(";");
//for (i = 0; i < arr.length; i++)
//{
//    console.log(i + ": " + arr[i]);
//}


//app.get('/',(req, res)=>res.send('Hello World!'));
//app.get('/', function (req, res) {
//	   res.send('Hello World');
//	console.log("1 Connection");
//})
//app.post('/',(req, res)=>res.send(`username = ${req.body.username} \n password = ${req.body.password}`));
app.post('/', function (req, res) {
		QUERY = req.body.Query;
	  	const Connection = require('./MySQLConnection.js')
		var conn = new Connection.MySQLConnection("videogram");
		conn.SubmitQuery(QUERY, function(RESULT) {
			console.log("Query Result: ");
			console.log(RESULT);
			res.send(RESULT);
		});
})
app.listen(process.env.PORT, ()=> console.log(`Example app listening on port ${process.env.PORT}!`));

