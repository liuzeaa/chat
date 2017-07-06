<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.uname" ></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.upwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  </template>
  <script>
  export default {
    data() {
      return {
        form: {
          uname:'',
          upwd:''
        }
      }
    },
    methods: {
      onSubmit() {
        if(this.uname==''||this.upwd=='') return;
        /*queryLogin(this.username,{password:this.upwd},(res)=>{
          console.log(res)
        })*/
      }
    }
  }
</script>
