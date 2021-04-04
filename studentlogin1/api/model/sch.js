var mongoose = require('mongoose')
const regis = mongoose.Schema({
    name:String,
   email:String,
 password:String   
})
module.exports = mongoose.model('registration',regis)