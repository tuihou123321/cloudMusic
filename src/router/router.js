/* 设置整个APP的路由*/

import  Vue from 'vue'
import  VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from '../views/index.vue'
import rage from '../views/rage.vue'
import songList from '../views/songList.vue'
import leaderBoard from '../views/leaderBoard.vue'
import hotSinger from '../views/hotSinger.vue'

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
            },
            {
                path:'leaderBoard',
                component:leaderBoard
            },
            {
                path:'hotSinger',
                component:hotSinger
                // component:require( '../views/hotSinger.vue')
            }
        ]
    },{
        path:"*",redirect:'/index/rage'
    }]
})

export default router