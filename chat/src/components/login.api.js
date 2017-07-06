import {host} from '../config'
import request from 'superagent'

export function queryLogin(id,obj,cb){
  request
    .get(host+'user/'+id)
    .send(obj)
    .end((err,res)=>{
      cb(res.body)
    })
}

