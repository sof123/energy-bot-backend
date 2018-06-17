const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const qs = require('qs')
const app = express()
app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    console.log(req.headers.origin)
    res.setHeader('Access-Control-Allow-Origin', 'http://energy-bot.surge.sh');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();//
});

require('./serviceInteracter')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
