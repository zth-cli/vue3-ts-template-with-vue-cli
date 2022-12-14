import { defineStore } from 'pinia'
import router from '@/router'
import addRouter from '@/utils/getRoutes'
import { getAsyncRoutes } from '@/api'
import Main from '@/layout/index.vue'
import routerArr from '@/mock/routerArr'

export const useMenuStore = defineStore('menu', {
  state() {
    return {
      routes: JSON.parse(localStorage.getItem('_menu_')) || [],
    }
  },
  getters: {},
  actions: {
    getUserMenu() {
      return new Promise((resolve, reject) => {
        const asyncRoutes = routerArr
        const routes = addRouter(asyncRoutes)
        ;(router.options.routes as Array<any>).splice(0, 1, {
          path: '/',
          name: 'Main',
          component: Main,
          redirect: routes[0].path,
          children: routes,
        })
        router.options.routes.concat(
          ...[
            {
              component: () => import('../views/Error/404.vue'),
              meta: { title: '404', isCache: false, requiresAuth: true },
              name: '404error',
              path: '/404error',
            },
            {
              path: '/:path(.*)*',
              redirect: '/404error',
            },
          ]
        )
        router.options.routes.forEach((item) => {
          router.addRoute(item)
        })
        this.routes = asyncRoutes
        resolve(routes)
      })
    },
  },
})
