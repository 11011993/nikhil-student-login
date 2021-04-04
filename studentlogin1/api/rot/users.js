var exp = require('express')
var rt = exp.Router()
var mg = require('mongoose')
var usr = require('../model/sch')
var path = require('path');
rt.get('/ss',function(req,res){
    res.render('reg',{msg:req.flash('msg')});
});
rt.post('/code',function(req,res){
    const table = new usr({
        name:req.body.t1,
    email:req.body.t2,
    password:req.body.t3
    })
    table.save().then(result=>{
        req.flash('msg','data inserted')
        res.redirect('/users/ss')
    })
    .catch(err=>{
        console.log("error"+err)
    })
});
rt.get('/lst',function(req,res){
    usr.find().then((result)=>{
        res.render('list',{data:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
rt.get('/edit',function(req,res){
    usr.find({_id:req.query.id}).then((result)=>{
        res.render('detail',{data:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
rt.post('/update',function(req,res){
    var myquery = {_id:req.body.t1};
    var newvalues = {$set:{name:req.body.t2,
                           email:req.body.t3,
                        password:req.body.t4}};
     usr.updateOne(myquery,newvalues)
     .then(res.redirect('/users/lst'))
     .catch(err=>{
         console.log("",+err)
     })                   
})
rt.get("/del",function(req,res){
    usr.deleteOne({_id:req.query.id})
    .then((result)=>{
        res.redirect("/users/lst")
    })
    .catch(err=>{
        console.log(err)
    })
})
rt.get('/log',function(req,res){
    res.render('login')

})
rt.post('/logged',function(req,res){
    email1 = req.body.t1;
    pwd1 = req.body.t2;
usr.findOne({email:email1,
           password:pwd1},function(err,user)
           {
               if(!user){
req.flash('msg','invalid user ID or PASSWORD !!')
res.redirect("/users/log")                   
               }
               else{
                   res.render('msg',{data:user})
               }
           })    
})
module.exports = rt;