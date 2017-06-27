<template>
    <div class="message">
        <h3>{{user}}和{{friend}}的聊天记录</h3>
        <ul>
          <li v-for="a in list">{{a}}</li>
        </ul>
    </div>
</template>
<style>
  ul,li{
    list-style:none;
  }
</style>
<script>
import {getMessage} from './message.api'
    export default{
        name:'message',
        data(){
            return{
                user:'',
                friend:'',
                list:[]
            }
        },
       methods:{
          fetch(){
            getMessage(this.$route.query,(list)=>{
              this.list = list
            })
          }
        },
        mounted(){
          var query = this.$route.query
          this.user = query.user
          this.friend = query.friend
         this.fetch()
          console.log(this.$route)
        }
    }
</script>
