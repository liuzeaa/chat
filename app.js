/**
 * Created by liuze on 2017/6/12.
 */
var express = require('express');
var app = express();
var cors = require('cors')
app.set('json spaces', 4);
var user = require('./apps/user')
app.get('/',function (req,res) {
    res.send('hello world');
})
app.use(cors());
app.use('/user',user)
app.use('/post',require('./apps/post'))
app.use('/comment',require('./apps/comment'))
app.listen(3000)
console.log('starting in port 3000...');

