/**
 * Created by liuze on 2017/6/12.
 */

var model = require('../../config/model')

const POST = model.User
const connect = model.connect
var express = require('express')
var router =  express.Router();
router.get('/',function(req,res){
    if(req.query.offset && req.query.limit){
        POST.findAll({
            offset:req.query.offset,
            limit:req.query.limit
        }).then(function(post){
            res.send(post)
        })
    }else{
        POST.findAll().then(function(post){
            res.send(post)
        })
    }
})
router.get('/detail',function(req,res){

})

module.exports = router;