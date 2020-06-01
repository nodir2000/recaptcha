import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
Vue.use(Router);


export default new Router({
    mode:'history',
    routes:[
        // {
        //     path:'/',
        //     component:Home
        // },
        // {
        //     path:'/todos',
        //     component:()=>import('@/views/Todos.vue')
        // },
        // {
        //     path:'/A',
        //     component:()=>import('@/views/A.vue')
        // }
        {
            path:'/',
            component:()=>import('@/Login/Index.vue'),
        },
        {
            path:'/card',
            component:()=>import('@/card/Card.vue')
        },
        {
            path:'/register',
            component:()=>import('@/Register/Index.vue')
        },
        {
            path:'*',
            component:()=>('@/views/Error.vue')
        }        
    ]
})