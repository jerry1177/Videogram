

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});
// MySQL connection section

const con = mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD});
con.connect(function(err) { if (err) throw err; console.log("Connected!"); });


//app.get('/',(req, res)=>res.send('Hello World!'));
//app.post('/',(req, res)=>res.send(`username = ${req.body.username} \n password = ${req.body.password}`));
const Connection = require('./MySQLConnection.js')
var conn = new Connection.MySQLConnection("videogram");

app.post('/query', (req, res)=>{
		const query = req.body.Query;
		console.log(req);
		conn.SubmitQuery(query, function(RESULT) {
			const response = {message:"success", result: RESULT};
			res.send(JSON.stringify(response));
			
		});
});

app.post('/user/signup', (req, res)=>{
	const query = `INSERT INTO Users (Username, Password, Firstname, Lastname, Email) VALUES ("${req.body.Username}", "${req.body.Password}", "${req.body.Firstname}", "${req.body.Lastname}", "${req.body.Email}")`;
	conn.SubmitQuery(query, function(err, RESULT) {
	if (err) {
		const response = {message:"error", result:"invalid information sent"};
		res.send(JSON.stringify(response));			
	}else {
		const response = {message:"success", result: RESULT};
		res.send(JSON.stringify(response));
		}
	});	
});

app.post('/user/login', (req, res)=>{
	    const query = `SELECT Password FROM Users WHERE Username = "${req.body.Username}"`;
	    conn.SubmitQuery(query, function(RESULT) {
		    	if (RESULT.length) 
			{
				if (RESULT[0].Password == req.body.Password)
				{
		    			const response = {message:"success"};
					res.send(JSON.stringify(response));
				}
		    		else
				{
					const response = {message:"failed", reason: "incorrect password"};
					res.send(JSON.stringify(response));
				}
			}
		    	else
			{
				const response = {message:"failed", reason: "incorrect username"};
				res.send(JSON.stringify(response));
			}
        });
});



app.listen(process.env.PORT, ()=> console.log(`Example app listening on port ${process.env.PORT}!`));
