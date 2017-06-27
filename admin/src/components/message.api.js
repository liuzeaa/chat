
import {host} from '../config'
import request from 'superagent'

export function getMessage(query,cb){
  request
    .get(host+'message')
    .query(query)
    .end((err,res)=>{
      cb(res.body)
    })
}
