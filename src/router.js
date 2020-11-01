import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/privmess',
            component: () => import('./components/pages/Home page/HomePage'),
        },
        {
            path: '/privmess/:id',
            component: () => import('./components/pages/Read message page/ReadMessagePage')
        },
    ]
})
