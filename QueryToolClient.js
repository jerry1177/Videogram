const https = require('http')

var fs = require('fs');
var QueryArray = fs.readFileSync("QueryInput.txt", 'utf8').replace(/\n/g, " ").split(";");

// Print the query text
//console.log(QueryArray);
//var arr = QueryArray.split(";");

    console.log("Query: " + QueryArray[0]);



        const data = JSON.stringify({
          Query: QueryArray[0]
        })

        const options = {
          hostname: '18.144.66.220',
          port: 3000,
          path: '',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
        }
        const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`)

          res.on('data', d => {
            process.stdout.write(d)
          })
        })
        req.on('error', error => {
          console.error(error)
        })
        req.write(data)
        req.end()
