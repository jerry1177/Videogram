const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// MySQL connection section

//const con = mysql.createConnection({ host: "localhost", user: "yourusername", password: "yourpassword"});
//con.connect(function(err) { if (err) throw err; console.log("Connected!"); });


app.get('/',(req, res)=>res.send('Hello World!'));
app.post('/',(req, res)=>res.send(`username = ${req.body.username} \n password = ${req.body.password}`));

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));
