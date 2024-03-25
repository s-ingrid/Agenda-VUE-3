import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'ContactList',
        component: () => import('../views/ContactList/ContactList.vue')
    },
    {
        path: '/criarContato',
        name: 'CreateContato',
        component: () => import('../views/CreateContact/CreateContact.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router