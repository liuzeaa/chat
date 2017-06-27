<template>
    <div class="postitem">
      <h2>{{title}}</h2>
      <p>{{content}}</p>
        <h3>评论</h3>
        <el-table :data="comments">
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="content" prop="id"></el-table-column>
        </el-table>
      <h3>点赞数</h3>
      <el-table :data="stars">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="userId" prop="userId"></el-table-column>
      </el-table>
    </div>
</template>
<style>

</style>
<script>
import {detail} from './post.item.api'
    export default{
        name:"post-item",
        data(){
            return{
               id:"-1",
              title:'',
              content:'',
                stars:[],
                comments:[]
            }
        },
        methods:{
          fetch(){
            detail(this.id,(item)=>{
                this.title=  item.title
                this.content = item.content
                this.comments  =item.comment
                this.stars = item.stars
            })
          }
        },
        mounted(){
            this.id = this.$route.params.id
            this.fetch()
        },
        watch:{
          $route(){
            this.id = this.$route.params.id
            this.fetch()
          }
        }
    }
</script>
