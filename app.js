/**
 * Created by liuze on 2017/6/12.
 */
var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var path = require('path')
var model = require('./config/model')
app.set('json spaces', 4)
app.use(bodyParser({
    urlencoded:false
}))
app.use(bodyParser.json())

app.get('/',function (req,res) {
    res.send('hello world')
})
app.use(cors())

 var user = require('./apps/user')
app.use('/user',user)
app.use('/post',require('./apps/post'))
app.use('/comment',require('./apps/comment'))
app.use('/message',require('./apps/message'))
app.post('/upload',(req,res)=>{
    var file = req.files.file
    var name = Data.parse(new Data())+'.'+file.name;
    var url = path.join(__dirname,'uploads',name)
    file.mv(p,(err)=>{
        if(err){
            return res.status(500).send(err)
        }
        res.send({url:url})
    })
})

app.listen(3000)
console.log('starting in port 3000...')

