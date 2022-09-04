/*
 * @Author: 阮志雄
 * @Date: 2022-08-30 22:57:36
 * @LastEditTime: 2022-09-02 22:21:42
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-template-with-vue-cli\src\hooks\useParentRoute.ts
 */
import { IrouteItem } from 'types/globals'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

// 通过子路ID 寻找父级路由集合
export function useParentRoute() {
  const store = useStore()
  const route = useRoute()

  const routeArr = computed(() => store.getters.routes)

  const parentRoute = ref<Array<IrouteItem>>([])
  const findRouteById = (routeArrs: Array<IrouteItem>, id: number) => {
    for (let index = 0; index < routeArrs.length; index++) {
      const element = routeArrs[index]
      if (element.id === id) {
        parentRoute.value = [element]
        findRouteById(routeArr.value, element.parentId)
        break
      } else if (element.children) {
        findRouteById(element.children, id)
      }
    }
  }
  findRouteById(routeArr.value, route.meta.rId)

  watch(
    () => route.path,
    () => {
      findRouteById(routeArr.value, route.meta.rId)
    }
  )

  return { parentRoute }
}
