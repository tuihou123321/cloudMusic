/* 设置整个APP的路由*/

import  Vue from 'vue'
import  VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from '../views/index.vue'
import Rage from '../views/rage.vue'

const router=new VueRouter({
    routes:[{
        path:'/index',
        component:Index,
        children:[
            {
                path:'rage',
                component:Rage
            }
        ]
    },{
        path:"*",redirect:'/index'
    }]
})

export default router