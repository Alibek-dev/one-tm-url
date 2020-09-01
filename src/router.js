import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/pages/Home page/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/template',
            component: () => import('./components/pages/Test page/Template')
        }
    ]
})