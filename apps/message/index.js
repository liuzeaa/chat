var model = require('../../config/model')

var express = require('express')
var router =  express.Router();
router.get('/',function(req,res){
    var from_to = req.query.user+'_'+req.query.friend
    model.redis.lrange(from_to,0,10,(err,list)=>{
        res.send(list)
    })
})

module.exports = router;

