/* 设置整个APP的路由*/

import  Vue from 'vue'
import  VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from '../views/index.vue'
import rage from '../views/rage.vue'
import songList from '../views/songList.vue'

const router=new VueRouter({
    routes:[{
        path:'/index',
        component:index,
        children:[
            {
                path:'rage',
                component:rage
            },
            {
                path:'songList',
                component:songList
                // component:require('../views/songList')  //修改成require引入就报错？
            }
        ]
    },{
        path:"*",redirect:'/index/rage'
    }]
})

export default router