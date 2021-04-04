var exp = require('express')
var app = exp()
var mg = require('mongoose')
var session = require('express-session')
var flash = require('connect-flash')
var usr = require('./api/rot/users');
var path = require('path')
var bp = require('body-parser')
mg.connect('mongodb+srv://test1:nikhil1234567890@testing.kshz6.mongodb.net/nikhil?retryWrites=true&w=majority')
mg.connection.on('error',err=>{
    console.log("error created"+err);
})
mg.connection.on('connected',connected=>{
    console.log("connection created");
})
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
saveUninitialized:false    
}))
app.use(flash())
app.use(bp.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(exp.static(path.join(__dirname,'views')))
app.use('/users',usr)
module.exports = app;