class MySQLConnection {
	  constructor(database) {
		  this.mysql = require('mysql');
		  this.database = database;
		  	   
	  }
	
	 SubmitQuery(Query, Callback) {
		const dbConnection = this.mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: this.database });
		dbConnection.connect(function(err) {
					               if (err) console.log(err);
					               console.log("dbConnected!");
					               console.log("Query entered: " + Query)
					               dbConnection.query(Query, function (err, result) {
	     				                      if (err) console.log(err);				       		
							     	return Callback(result)
					                 });
					         });
	}
}
module.exports.MySQLConnection = MySQLConnection;
