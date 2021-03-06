import {host} from '../config'
import request from 'superagent'

export function detail(id, cb) {
    request
      .get(host +'user/'+id+'/detail')
      .end((err,res)=>{
          cb(res.body)
      })
}
export function queryUser(id,cb){
  request
    .get(host+'user/'+id)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function addPost(id,obj,cb) {
    request
      .post(host+'user/'+id+'/post')
      .send(obj)
      .end((err,res)=>{
          cb(res.body)
      })
}
export function editPost(userId,postId,obj,cb){
  request
    .patch(host+'user/'+userId+'/post/'+postId)
    .send(obj)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function deletePost(userId,postId,cb){
  request
    .delete(host+'user/'+userId+'/post/'+postId)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function addFriend(userId,friendId,cb){
  request
    .post(host+'user/'+userId+'/friend/'+friendId)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function deleteFriend(userId,friendId,cb){
  request
    .delete(host+'user/'+userId+'/friend/'+friendId)
    .end((err,res)=>{
      cb(res.body)
    })
}
