/**
 * Created by Administrator on 2017/6/11.
 */
var model = require('../../config/model')

const USER = model.User
const connect = model.connect
var express = require('express')

var router = express.Router()

router.get('/',function (req, res) {
    if(req.query.offset && req.query.limit){
        USER.findAll({
            offset:req.query.offset,
            limit:req.query.limit
        }).then(function (users) {
            res.send(users)
        })
    }else {
        USER.findAll().then(function (users) {
            res.send(users)
        })
    }
})

router.get('/:id',function (req, res) {
    USER.findById(req.params.id).then((list)=>{
        res.send(list)
    })
})

//返回该用户的所有数据
router.get('/:id/detail',function (req, res) {
    USER.findById(req.params.id).then((user)=>{
        connect.query('SELECT * FROM posts WHERE userId = ?',
            {model:model.Post,replacements:[req.params.id]})
            .then((post)=>{
                connect.query('SELECT * FROM users  WHERE id IN (SELECT userId FROM relations WHERE friendId = ?) OR id IN (SELECT friendId FROM relations WHERE userId =?)',
                    {model:model.User,replacements:[req.params.id,req.params.id]})
                    .then((friend)=>{
                        user.dataValues.post = post
                        user.dataValues.friend = friend
                        res.send(user)
                    })
            })
    })
})

router.get('/:id/request',function (req, res) {
    connect.query('SELECT * FROM requests WHERE toId = ?',
        {model:model.Request,replacements:[req.params.id]})
        .then((list)=>{
            res.send(list)
        })

})

router.get('/:id/post',function (req, res) {
    connect.query('SELECT * FROM posts WHERE userId = ?',
        {model:model.Post,replacements:[req.params.id]})
        .then((list)=>{
            res.send(list)
        })

})


router.get('/:id/friend',function (req, res) {
    connect.query('SELECT * FROM users  WHERE id IN (SELECT userId FROM relations WHERE friendId = ?) OR id IN (SELECT friendId FROM relations WHERE userId =?)',
        {model:model.User,replacements:[req.params.id,req.params.id]})
        .then((list)=>{
            res.send(list)
        })
})
router.post('/:id/post',(req,res)=>{
    console.log(req.body,'-----')
    model.Post.create({
        userId:req.params.id,
        title:req.body.title,
        content:req.body.content
    }).then((item)=>{
        res.send(item)
    })
})
router.patch('/:userId/post/:postId',(req,res)=>{
    model
        .Post.findById(req.params.postId)
        .then(post=>{
            post.update(req.body)
            .then((item)=>{
                res.send(item)
            })
        })
})
router.delete('/:userId/post/:postId',(req,res)=>{
    model
        .Post.findById(req.params.postId)
        .then(post=>{
             post.destroy()
            .then((item)=>{
                res.send(item)
            })
        })

})
router.post('/:userId/friend/:friendId',(req,res)=>{
    connect.query(
        'INSERT INTO relations (createdAt, updatedAt, userId, friendId) VALUES (NOW(),NOW(),?,?)',
        {replacements:[req.params.userId,req.params.friendId]}
    ).then((item)=>{
        res.send(item)
    })
})
router.delete('/:userId/friend/:friendId',(req,res)=>{
   model.Relation.findOne({
       where:{
           $or:[
               {userId:req.params.userId,friendId:req.params.friendId},
               {friendId:req.params.userId,userId:req.params.friendId}
           ]
       }
   }).then((friend)=>{
       friend.destroy()
           .then((item)=>{
               res.send(item)
           })
   })
})

module.exports = router