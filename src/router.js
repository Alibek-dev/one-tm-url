import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./components/pages/Home page/HomePage'),
        },
        {
            path: '/:id',
            component: () => import('./components/pages/Read message page/ReadMessagePage')
        },
        {
            path: '/*',
            component: () => import('./components/pages/404')
        }
    ]
})
