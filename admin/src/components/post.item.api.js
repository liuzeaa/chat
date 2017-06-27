import {host} from '../config'
import request from 'superagent'


export function detail(id,cb) {
  request
    .get(host+'post/'+id)
    .end(function (err,res) {
      cb(res.body)
    })
}
