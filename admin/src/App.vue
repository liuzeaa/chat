<template>
  <div id="app">
    <el-row>
      <el-col :md="4">
        <el-menu>
          <el-menu-item
            v-for="route in $router.options.routes"
            :index="route.path"
            @click="click(route.path)"
          >
            {{route.name}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :md="20">
        <router-view></router-view>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
      click(path){
          this.$router.push(path)
      }
  },
  mounted(){
      console.log(this.$router.options.routes)
  }
}
</script>

<style>
  *{padding:0;margin:0;}
#app {
height:100%;width:100%;
  position: fixed;
}
  .el-row{
    height:100%;
  }
  .el-col{
    height:100%;
  }
.el-menu{
  height:100%;overflow-y: scroll;}
  .el-col-md-20{
    height:100%;overflow-y: scroll;box-sizing: border-box;padding-left: 20px;
  }
</style>
