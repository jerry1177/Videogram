

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

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
	if (!req.body.Username || !req.body.Password || !req.body.Firstname || !req.body.Lastname || !req.body.Email)
	{
	    const response = {message:"failed", result: "invalid request"};
        res.send(JSON.stringify(response));
        return;
	}
	if (req.body.Username == "" || req.body.Password == "" || req.body.Firstname == "" || req.body.Lastname == "" || req.body.Email == "")
	{
	    const response = {message:"failed", result: "invalid request"};
        res.send(JSON.stringify(response));
        return;
	}
	const checkQuery = `SELECT * FROM Users WHERE Username = "${req.body.Username}"`;
	conn.SubmitQuery(checkQuery, function(RESPONSE) {
	    if (!RESPONSE.length) {
	        const query = `INSERT INTO Users (Username, Password, Firstname, Lastname, Email) VALUES ("${req.body.Username}", "${req.body.Password}", "${req.body.Firstname}", "${req.body.Lastname}", "${req.body.Email}")`;
	        conn.SubmitQuery(query, function(RESULT) {
            if (RESULT) {
                const response = {message:"success", result: RESULT, User_Id: RESULT.insertId};
                res.send(JSON.stringify(response));
            }
            else
            {
                const response = {message:"failed", result: "error inserting into database"};
                res.send(JSON.stringify(response));
            }
            });
	    }
	    else
	    {
	        const response = {message:"failed", result: "username taken"};
            res.send(JSON.stringify(response));
	    }
	})

});

app.post('/user/login', (req, res)=>{
        if (!req.body.Username || req.body.Username == "")
        {
            const response = {message:"failed", result: "invalid request"};
            res.send(JSON.stringify(response));
            return;
        }
	    const query = `SELECT User_Id, Username, Password FROM Users WHERE Username = "${req.body.Username}"`;
	    conn.SubmitQuery(query, function(RESULT) {
		    if (RESULT.length)
			{
				if (RESULT[0].Password == req.body.Password)
				{
		    			const response = {message:"success", result: RESULT[0], User_Id: RESULT[0].User_Id};
					    res.send(JSON.stringify(response));
				}
		    	else
				{
					const response = {message:"failed", result: "incorrect password"};
					res.send(JSON.stringify(response));
				}
			}
		    else
			{
				const response = {message:"failed", result: "incorrect username"};
				res.send(JSON.stringify(response));
			}
        });
});


app.post('/user/upload/video', (req, res)=>{
	if (!req.body.Video_Link || !req.body.User_Id || !req.body.Upload_Date)
    {
        const response = {message:"failed", result: "invalid request"};
        res.send(JSON.stringify(response));
        return;
    }
    if (req.body.Video_Link == "" || req.body.User_Id == "" || req.body.Upload_Date == "")
    {
        const response = {message:"failed", result: "invalid request"};
        res.send(JSON.stringify(response));
        return;
    }
	console.log(req.body);
	const query = `INSERT INTO Video_Media (Video_Link, User, Upload_Date, Active, Title, Description, Location, Length, Resolution, Fps, Format) VALUES ("${req.body.Video_Link}", "${req.body.User_Id}", "${req.body.Upload_Date}", "${req.body.Active}", "${req.body.Title}", "${req.body.Description}", "${req.body.Location}", "${req.body.Length}", "${req.body.Resolution}", "${req.body.Fps}", "${req.body.Format}")`;
            conn.SubmitQuery(query, function(RESULT) {
		   if (RESULT)
              {
                     const response = {message:"success", result: RESULT, Video_Id: RESULT.insertId};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: "error inserting into database"};
                     res.send(JSON.stringify(response));
                }
        });
});

app.post('/get/video/data', (req, res)=>{
	if (!req.body.Video_Id || req.body.Video_Id == "")
    {
        const response = {message:"failed", result: "invalid request"};
        res.send(JSON.stringify(response));
        return;
    }
	console.log(req.body);
	const query = `SELECT * FROM Video_Media WHERE Video_Id = "${req.body.Video_Id}"`;
            conn.SubmitQuery(query, function(RESULT) {
		   if (RESULT)
              {
                     const response = {message:"success", result: RESULT[0]};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: "error, could not retrieve from database"};
                     res.send(JSON.stringify(response));
                }
        });
});

app.post('/get/all/user/video/data/', (req, res)=>{
    if (!req.body.User_Id || req.body.User_Id == "")
    {
        const response = {message:"failed", result: "invalid request"};
        res.send(JSON.stringify(response));
        return;
    }
    console.log(req.body);
	const query = `SELECT * FROM Video_Media WHERE User = "${req.body.User_Id}"`;
            conn.SubmitQuery(query, function(RESULT) {
		    if (RESULT)
              {
                     const response = {message:"success", result: RESULT};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: "error, could not retrieve from database"};
                     res.send(JSON.stringify(response));
                }
        });
});


app.post('/user/upload/profile/photo', (req, res)=>{

        console.log(req.body);
        const query = `INSERT INTO Photo_Media (Photo_Link) VALUES ("{req.body.Photo_Link}")`;
            conn.SubmitQuery(query, function(err, RESULT) {
                    if (err)
                    {
                           const response = {message:"failed", result: "Failed to insert Photo_Media"};
                           res.send(JSON.stringify(response));
                    }
                    else
                    {
                         const response = {message:"success", result: RESULT};
                         res.send(JSON.stringify(response));
                    }
        });
});




app.post('/user/like/video', (req, res)=>{
        if (!req.body.Video_Id || req.body.Video_Id == "" || !req.body.User_Id || req.body.User_Id == "")
        {
            const response = {message:"failed", result: "invalid request"};
            res.send(JSON.stringify(response));
            return;
        }
        console.log(req.body);
        const query = `INSERT INTO Video_Like (Video_Id, User_Id) VALUES ("${req.body.Video_Id}", "${req.body.User_Id}")`;
            conn.SubmitQuery(query, function(RESULT) {
              if (RESULT)
              {
                     const response = {message:"success", result: RESULT, Like_Id: RESULT.insertId};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: RESULT};
                     res.send(JSON.stringify(response));
                }
        });
});

app.post('/user/comment/video', (req, res)=>{
        if (!req.body.Comment || req.body.Comment == "" || !req.body.Video_Id || req.body.Video_Id == "" || !req.body.User_Id || req.body.User_Id == "")
        {
            const response = {message:"failed", result: "invalid request"};
            res.send(JSON.stringify(response));
            return;
        }
        console.log(req.body);
        const query = `INSERT INTO Video_Comment (Comment, Video_Id, User_Id) VALUES ("${req.body.Comment}", "${req.body.Video_Id}", "${req.body.User_Id}")`;
            conn.SubmitQuery(query, function(RESULT) {
                if (RESULT)
                {
                     const response = {message:"success", result: RESULT, Comment_Id: RESULT.insertId};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: RESULT};
                     res.send(JSON.stringify(response));
                }
        });
});

app.post('/user/video/likes', (req, res)=>{
        if (!req.body.Video_Id || req.body.Video_Id == "")
        {
            const response = {message:"failed", result: "invalid request"};
            res.send(JSON.stringify(response));
            return;
        }
        console.log(req.body);
        const query = `SELECT Video_Like.User_Id, Users.Username FROM Users INNER JOIN Video_Like ON Users.User_Id = Video_Like.User_Id WHERE Video_Like.Video_Id = "${req.body.Video_Id}"`;
            conn.SubmitQuery(query, function(RESULT) {
              if (RESULT)
              {
                     const response = {message:"success", result: RESULT};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: RESULT};
                     res.send(JSON.stringify(response));
                }
        });
});




app.post('/likes/for/user', (req, res)=>{
        if (!req.body.User_Id || req.body.User_Id == "")
        {
            const response = {message:"failed", result: "invalid request"};
            res.send(JSON.stringify(response));
            return;
        }
        console.log(req.body);
        const query = `SELECT DISTINCT Video_Id, User_Id FROM Video_Like WHERE User_Id = "${req.body.User_Id}"`;
            conn.SubmitQuery(query, function(RESULT) {
              if (RESULT)
              {
                     const response = {message:"success", result: RESULT};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: RESULT};
                     res.send(JSON.stringify(response));
                }
        });
});



app.post('/user/video/comments', (req, res)=>{
        if (!req.body.Video_Id || req.body.Video_Id == "")
        {
            const response = {message:"failed", result: "invalid request"};
            res.send(JSON.stringify(response));
            return;
        }
        console.log(req.body);
        const query = `SELECT Video_Comment.User_Id, Users.Username, Video_Comment.Comment FROM Users INNER JOIN Video_Comment ON Users.User_Id = Video_Comment.User_Id WHERE Video_Comment.Video_Id = "${req.body.Video_Id}"`;
            conn.SubmitQuery(query, function(RESULT) {
              if (RESULT)
              {
                     const response = {message:"success", result: RESULT};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: RESULT};
                     res.send(JSON.stringify(response));
                }
        });
});

app.post('/user/delete/video', (req, res)=>{
        if (!req.body.Video_Id || req.body.Video_Id == "")
        {
            const response = {message:"failed", result: "invalid request"};
            res.send(JSON.stringify(response));
            return;
        }
        console.log(req.body);
        const query = `DELETE FROM Video_Media WHERE Video_Id = "${req.body.Video_Id}"`;
            conn.SubmitQuery(query, function(RESULT) {
              if (RESULT)
              {
                     const response = {message:"success", result: RESULT};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: RESULT};
                     res.send(JSON.stringify(response));
                }
        });
});

app.get('/find/users', (req, res)=>{
        console.log(req.body);
        const query = `SELECT User_Id, Username FROM Users`;
            conn.SubmitQuery(query, function(RESULT) {
              if (RESULT)
              {
                     const response = {message:"success", result: RESULT};
                      res.send(JSON.stringify(response));

                }
                else
                {
                     const response = {message:"failed", result: RESULT};
                     res.send(JSON.stringify(response));
                }
        });
});



app.listen(process.env.PORT, ()=> console.log(`Example app listening on port ${process.env.PORT}!`));

