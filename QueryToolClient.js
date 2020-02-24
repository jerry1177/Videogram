const https = require('http')

const data = JSON.stringify({
  Query: 'INSERT INTO Users (Username, Password, Firstname, Lastname, Email, Biography) VALUES ("glew", "pass", "Grace", "Lew", "grace.lew@biola.edu", "This is my videogram biography")'
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