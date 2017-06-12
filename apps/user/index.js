/**
 * Created by liuze on 2017/6/12.
 */
var model = require('../../config/model')

const USER = model.User
const connect = model.connect
var express = require('express')
var router =  express.Router();
router.get('/',function(req,res){
    if(req.query.offset && req.query.limit){
        USER.findAll({
            offset:req.query.offset,
            limit:req.query.limit
        }).then(function(users){
            res.send(users)
        })
    }else{
        USER.findAll().then(function(users){
            res.send(users)
        })
    }
})

module.exports = router;