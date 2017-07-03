<template>
    <div class="postitem">
      <h2>{{title}}</h2>
      <p>{{content}}</p>
        <h3>评论</h3>
        <el-form :inline="true">
          <el-form-item>
            <el-button @click="addComment.visible=true">增加评论</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          title="增加评论"
          :visible="addComment.visible"
          :before-close="handleClose"
        >
          <el-form>
            <el-form-item  label="内容" label-width="50px">
              <el-input v-model="addComment.content"></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addComment.visible=false">取 消</el-button>
          <el-button type="primary" @click="handleAddComment">确 定</el-button>
        </span>
        </el-dialog>
      <el-dialog
        title="编辑评论"
        :visible="editComment.visible"
        :before-close="handleClose"
      >
        <el-form>
          <el-form-item  label="内容" label-width="50px">
            <el-input v-model="editComment.content"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editComment.visible=false">取 消</el-button>
          <el-button type="primary" @click="saveEditComment">确 定</el-button>
        </span>
      </el-dialog>
        <el-table :data="comments">
          <el-table-column label="content" prop="content"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button @click="showEditComment(scope.row)">编辑</el-button>
              <el-button type="danger" @click="deleteComment(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
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
import {detail,editComment,deleteComment,addComment} from './post.item.api'
    export default{
        name:"post-item",
        data(){
            return{
                id:"-1",
                title:'',
                content:'',
                stars:[],
                comments:[],
                addComment:{
                  visible:false,
                  content:''
                },
                editComment:{
                  visible:false,
                  content:''
                }
            }
        },
        methods:{
          fetch(){
            detail(this.id,(item)=>{
                this.title=  item.title
                this.content = item.content
                this.comments  = item.comments
                this.stars = item.stars
            })
          },
          handleAddComment(){
            addComment(this.id,{content:this.addComment.content},(item)=>{

                this.comments.push(item)
                this.addComment.visible = false
            })
          },
          showEditComment(obj){
              var comment = Object.assign({},obj,{visible:true})
              this.editComment = comment
          },
          saveEditComment(){
             var comment = this.editComment
            var obj = Object.assign({},comment)
            delete comment.visible
            editComment(this.id,obj.id,obj,(item)=>{
              this.comments =this.comments.map((obj)=>{
                if(obj.id==item.id){
                  obj = Object.assign({},item)
                }
                return obj
              })
            })
          },
          deleteComment(commentId){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                deleteComment(this.id,commentId,(item)=>{
                  this.comments = this.comments.filter(obj=>{
                  debugger;
                    return obj.id != item.id
                  })
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
          },
          handleClose(){
            this.addComment.visible= false
            this.editComment.visible = false
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
