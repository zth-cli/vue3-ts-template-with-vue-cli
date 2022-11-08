<template>
  <div class="co-split" ref="split-block">
    <div class="co-split-vertical" v-if="modeStr === 'vertical'">
      <div class="co-left-pane co-split-pane-vertical" :style="leftTopStyle">
        <slot name="left"></slot>
      </div>
      <div
        v-if="!disabled"
        class="co-split-trigger trigger-vertical"
        :style="{ left: percent + '%' }"
        @mousedown="triggerMousedown"
        @mouseup="triggerMouseup()"
      ></div>
      <div class="co-right-pane co-split-pane-vertical" :style="rightBottomStyle">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="co-split-horizontal" v-if="modeStr === 'horizontal'">
      <div class="co-top-pane co-split-pane-horizontal" :style="leftTopStyle">
        <slot name="top"></slot>
      </div>
      <div
        v-if="!disabled"
        class="co-split-trigger trigger-horizontal"
        :style="{ top: percent + '%' }"
        @mousedown="triggerMousedown"
        @mouseup="triggerMouseup()"
      ></div>
      <div class="co-bottom-pane co-split-pane-horizontal" :style="rightBottomStyle">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      percent: 0,
      spliting: false, //是否在split
      endPoint: 0,
      startPoint: 0,
      wrapWidth: 0,
    }
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      default: 0.8,
      validator: function (value: number) {
        // 比例小于1
        return value <= 1
      },
    },
    mode: {
      type: String,
      default: 'vertical',
      validator: function (value: string) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      },
    },
    miniRatio: {
      type: Number,
      default: 0.1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    modelValue: {
      handler(val) {
        this.percent = val * 100
      },
      immediate: true,
    },
  },
  computed: {
    leftTopStyle: function () {
      return this.mode === 'vertical' ? { right: 100 - this.percent + '%' } : { bottom: 100 - this.percent + '%' }
    },
    rightBottomStyle: function () {
      return this.mode === 'vertical' ? { left: this.percent + '%' } : { top: this.percent + '%' }
    },
    modeStr: function () {
      return this.mode
    },
  },
  methods: {
    splitHandle(event: PointerEvent) {
      if (this.spliting) {
        this.endPoint = this.mode === 'vertical' ? event.pageX : event.pageY
        // console.log(this.endPoint - this.startPoint)
        const percent = ((this.wrapWidth * this.modelValue + (this.endPoint - this.startPoint)) / this.wrapWidth) * 100
        const miniValue = this.miniRatio * 100
        this.percent = percent <= miniValue ? miniValue : percent >= 100 - miniValue ? 100 - miniValue : percent
      } else {
        console.log('up')
      }
    },
    triggerMousedown(event: PointerEvent) {
      const wrap = this.$refs['split-block']
      this.spliting = true
      this.startPoint = this.mode === 'vertical' ? event.pageX : event.pageY
      this.wrapWidth = this.mode === 'vertical' ? wrap.clientWidth : wrap.clientHeight
      wrap.addEventListener('mousemove', this.splitHandle)
    },
    triggerMouseup() {
      this.spliting = false
      this.$emit('update:modelValue', this.percent / 100)
      const wrap = this.$refs['split-block']
      wrap.removeEventListener('mousemove', this.splitHandle)
    },
  },
  mounted() {
    const wrap = this.$refs['split-block']
    window.addEventListener('mouseup', () => {
      this.spliting = false
      this.$emit('update:modelValue', this.percent / 100)
      wrap.removeEventListener('mousemove', this.splitHandle)
    })
  },
})
</script>
<style lang="scss">
.co-split {
  // user-select: none;
  position: relative;
  width: 100%;
  height: 100%;
  .co-split-vertical {
    .co-split-pane-vertical {
      position: absolute;
      top: 0;
      bottom: 0;
    }
    .co-left-pane {
      left: 0;
    }
    .co-right-pane {
      right: 0;
    }

    .trigger-vertical {
      width: 4px;
      height: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .co-split-horizontal {
    .co-split-pane-horizontal {
      position: absolute;
      left: 0;
      right: 0;
    }
    .co-top-pane {
      top: 0;
    }
    .co-bottom-pane {
      bottom: 0;
    }
    .trigger-horizontal {
      width: 100%;
      height: 4px;
      cursor: row-resize;
    }
  }
  .co-split-trigger {
    background: transparent;
    border-top: none;
    border-bottom: none;
    cursor: col-resize;
    position: absolute;
    z-index: 10;
    transition: all 0.1s ease-in-out;
    &:hover {
      // background-color: var(--el-color-primary-light-9);
      background-image: linear-gradient(
        to bottom,
        var(--el-color-primary-light-9),
        var(--el-color-primary),
        var(--el-color-primary-light-9)
      );
    }
    // left: 50%;
  }
}
</style>
