//  Tool used for running queries
//  in any input file against the
//  videogram database.

// Get the input file.
var File = process.argv[2];

// Read the query text into variable
var readline = require('readline');
var fs = require('fs');
var QueryArray = fs.readFileSync(File, 'utf8').split(";");

// Print the query text
console.log(QueryArray);

// Connect to database
const mysql = require('mysql');
const con = mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD});
con.connect(function(err)
{
    for (i = 0; i < QueryArray.length; i++)
    {
        if (err) throw err;
        console.log("Connected!");
        con.query(i, function (err, result)
        {
            if (err) throw err;
            console.log("Success: " + result);
        });
    }
});