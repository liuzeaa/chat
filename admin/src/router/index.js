import Vue from 'vue'
import Router from 'vue-router'
import userItem from '../components/user.item.vue'
import message from '../components/message.vue'
import user from '../components/user.vue'
import post from '../components/post.vue'
import postItem from '../components/post.item.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: '用户',
      component: user
    },
    {
      path: '/user/:id',
      name: '用户项目',
      component: userItem,
      hidden:true
    },
    {
      path: '/post',
      name: '说说',
      component: post
    },
    {
      path: '/post/:id',
      name: '说说项',
      component: postItem,
      hidden:true
    },
    {
      path: '/message',
      name: '聊天记录',
      component: message,
      hidden:true
    }
  ]
})
