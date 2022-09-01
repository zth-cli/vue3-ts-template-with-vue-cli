<template>
  <div v-if="showTags" class="tags">
    <div>
      <el-tag
        class="tags-item"
        v-for="item in tagsList"
        size="default"
        closable
        @click="changeTab(item)"
        @close="closeTags(item)"
        :key="item.path"
        :type="activeValue !== item.title ? 'info' : ''"
        >{{ item.title }}</el-tag
      >
    </div>

    <div class="tags-close-box">
      <el-dropdown placement="bottom" @command="handleTags">
        <!-- <i class="el-icon-arrow-down drop-icon"></i> -->
        <el-button icon="ArrowDown" size="small" style="border: none"></el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import bus from '@/utils/bus'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { ref, Ref, watch, computed } from 'vue'
const route = useRoute()
const router = useRouter()
const tagsList: Ref<Array<any>> = ref([])
const activeValue: Ref<string> = ref('')
// 设置标签route
const setTags = (route: RouteLocationNormalizedLoaded) => {
  const routeObj = {
    title: route.meta.title,
    fullPath: route.fullPath,
    name: route.name,
    path: route.path,
    meta: route.meta,
  }
  const existIndex = tagsList.value.findIndex((item) => {
    return item.path === route.path
  })
  if (existIndex > -1) {
    tagsList.value.splice(existIndex, 1, routeObj)
  } else {
    tagsList.value.push(routeObj)
  }
  activeValue.value = route.meta.title
  bus.emit('tags', tagsList.value)
}
// 关闭单个标签
const closeTags = (tabName: string) => {
  const index = tagsList.value.findIndex((item) => item.title === tabName)
  const delItem = tagsList.value.splice(index, 1)[0]
  // 剩余的tags
  const item = tagsList.value[index] ? tagsList.value[index] : tagsList.value[index - 1]
  if (item) {
    // 更改路由，watch监听，调用setTags,触发自定义事件tags
    delItem.fullPath === route.fullPath && router.push(item.fullPath)
  } else {
    router.push('/')
  }
}
const changeTab = (data) => {
  console.log(data)

  // console.log(component.instance.attrs.tab )
  router.push(data.path)
}
// 关闭全部标签
const closeAll = () => {
  tagsList.value = []
  router.push('/')
}
// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item) => {
    return item.fullPath === route.fullPath
  })
  tagsList.value = curItem
}
// 设置标签route
const handleTags = (command: string) => {
  command === 'other' ? closeOther() : closeAll()
}
setTags(route)
watch(route, (newValue) => {
  setTags(newValue)
})
const showTags = computed(() => tagsList.value.length > 0)
/*
逻辑：
1.监听路有变化，添加到tagsList
2.关闭选项，

 */
</script>

<style lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 19px 6px 10px;
  .tags-item {
    line-height: 30px;
    // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
    cursor: pointer;
    margin-right: 8px;
  }
}
</style>
