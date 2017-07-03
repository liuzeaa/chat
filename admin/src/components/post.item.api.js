import {host} from '../config'
import request from 'superagent'


export function detail(id,cb) {
  request
    .get(host+'post/'+id)
    .end(function (err,res) {
      cb(res.body)
    })
}
export function addComment(id,obj,cb) {
  request
    .post(host+'post/'+id+'/comment')
    .send(obj)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function editComment(postId,commentId,obj,cb){
  request
    .patch(host+'post/'+postId+'/comment/'+commentId)
    .send(obj)
    .end(function(err,res){
      cb(res.body)
    })
}
export function deleteComment(postId,commentId,cb){
  request
    .delete(host+'post/'+postId+'/comment/'+commentId)
    .end(function(err,res){
      cb(res.body)
    })
}
