//  Tool used for running queries
//  in any input file against the
//  videogram database.

// Some Setup
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Get the input file.
var File = process.argv[2];

// Read the query text into variable
var readline = require('readline');
var fs = require('fs');
var QueryArray = fs.readFileSync(File, 'utf8');

// Print the query text
console.log(QueryArray);
var arr = QueryArray.split(";");
for (i = 0; i < arr.length; i++)
{
    console.log(i + ": " + arr[i]);
}

// Connect to database
HOST = "videogramdatabase.cecwmoteixfp.us-west-1.rds.amazonaws.com"
USER = "admin"
PASS = "softwareengineering"
const con = mysql.createConnection({ host: HOST, user: USER, password: PASS });
for (i = 0; i < arr.length; i++)
{
     con.connect(function(err) {
          if (err) console.log(err);
          console.log("Connected!");
          var sql = arr[i];
          console.log("Query: " + sql)
          con.query(sql, function (err, result) {
            if (err) console.log(err);
            console.log("Result: " + result);
          });
    });
}