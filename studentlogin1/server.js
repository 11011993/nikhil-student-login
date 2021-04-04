var http = require('http')
var app = require('./index')
var ser = http.createServer(app)
ser.listen(1122,console.log("jai balaji"))
