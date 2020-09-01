import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./components/pages/Home page/Home'),
        },
        {
            path: '/template',
            component: () => import('./components/pages/Test page/Template')
        }
    ]
})