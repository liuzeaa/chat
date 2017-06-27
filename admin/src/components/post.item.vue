<template>
    <div class="postitem">
        postitem{{id}}
    </div>
</template>
<style>

</style>
<script>
import {detail} from './post.api'
    export default{
        name:"post-item",
        data(){
            return{
               id:"-1"
            }
        },
        methods:{
          /*fetch(){

          }*/
        },
        mounted(){
            this.id = this.$route.params.id
           // this.fetch()
        },
        watch:{
          $route(){
            this.id = this.$route.params.id
          }
        }
    }
</script>
