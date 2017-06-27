<template>
  <div id="app">
    <el-row>
      <el-col :md="4">
        <el-menu style="overflow:auto">
          <el-menu-item
            v-for="route in $router.options.routes"
            v-if="!route.hidden"
            :index="route.path"
            @click="click(route.path)"
          >
            {{route.name}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :md="20" style="padding:0px 20px;overflow:auto">
        <router-view ></router-view>
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
      var app = document.querySelector('#app');
      var winHeight = window.innerHeight?window.innerHeight:((document.body) && (document.body.clientHeight)?document.body.clientHeight:'');
      app.style.height = winHeight +'px'
  }
}
</script>

<style>
  *{padding:0;margin:0;}

#app {
  width:100%;height:100%;
}
  .el-row{
    height:100%;
  }
  .el-col{
    height:100%;
  }
.el-menu{
  height:100%;overflow-y: auto;}
</style>
