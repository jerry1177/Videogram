

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MySQL connection section

const con = mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD});
con.connect(function(err) { if (err) throw err; console.log("Connected!"); });


app.get('/',(req, res)=>res.send('Hello World!'));
app.post('/',(req, res)=>res.send(`username = ${req.body.username} \n password = ${req.body.password}`));

app.post('/user/signup', (req, res)=>{
	const query = `INSERT INTO Users (Username, Password, Firstname, Lastname, Email) VALUES (${req.body.username}, ${req.body.password}, ${req.body.firstname}, ${req.body.lastname}, ${req.body.email})`;

	const success = {message:"success"};
	res.send(JSON.stringify(success));	
});

app.listen(process.env.PORT, ()=> console.log(`Example app listening on port ${process.env.PORT}!`));
