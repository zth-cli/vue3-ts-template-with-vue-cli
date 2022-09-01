<template>
  <div>
    <child id="123" ref="childRef" v-dialogDrag @change="getData">
      <h4>默认内容</h4>
    </child>
    <el-tag type="danger" effect="dark" closable>危险</el-tag>
    <overlay v-model="close" title="弹框" oheight="50vh"></overlay>
  </div>
</template>

<script lang="ts" setup>
import child from '@/components/child.vue'
import { overlay } from '@/components/Overlay'
import { ref, onMounted } from 'vue'

const close = ref<boolean>(false)
onMounted(() => {
  console.log(process.env.MODE)
  console.log(process.env)

  console.log(childRef.value)
})
const childRef = ref<InstanceType<typeof child>>(null)
const getData = (id: number) => {
  close.value = !close.value
}
</script>
<style></style>
