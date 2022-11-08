<template>
  <span>
    <svg class="icon" aria-hidden="true" :style="{ fontSize: size + 'px' }">
      <use :xlink:href="name" />
    </svg>
  </span>
</template>

<script lang="ts">
import './iconfont'
export default defineComponent({
  name: 'ZthIcon',
  props: ['icon', 'size'],
  data() {
    return {
      name: '#icon-' + this.icon,
    }
  },
})
</script>
<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
