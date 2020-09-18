import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            component: () => import('./components/pages/Home page/HomePage'),
        },
        {
            path: '/template',
            component: () => import('./components/pages/Test page/Template')
        },
        {
            path: '/message/:id',
            component: () => import('./components/pages/Read message page/ReadMessagePage')
        },
        {
            path: '*',
            component: () => import('./components/pages/404')
        }
    ]
})