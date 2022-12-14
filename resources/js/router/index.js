import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('../pages/Index.vue'),
            },
            {
                path: 'news',
                name: 'news',
                component: () => import('../pages/News.vue'),
                children: [
                    {
                        path: '',
                        name: 'news-list',
                        component: () => import('../pages/news/List.vue'),
                    },
                    {
                        path: ':id',
                        name: 'news-item',
                        component: () => import('../pages/news/Item.vue')
                    },
                ]
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('../pages/Settings.vue'),
                // children: [
                //     {
                //         path: '',
                //         name: 'news-list',
                //         component: () => import('../pages/news/List.vue'),
                //     },
                //     {
                //         path: ':id',
                //         name: 'news-item',
                //         component: () => import('../pages/news/Item.vue')
                //     },
                // ]
            },
            {
                path: ':pathMatch(.*)*',
                name: 'not-found',
                component: () => import('../pages/errors/NotFound.vue'),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router