<!-- 弹窗简易自定义版本  除标题样式外其余需自定义  by: zby -->
<!-- Events: clickCloseBtn 点击右上角关闭按钮时触发-->
<!-- https://vant-contrib.gitee.io/vant/#/zh-CN/dialog#jie-shao-->
<template>
  <van-dialog
    :value="value"
    @input="$event => $emit('input', $event)"
    :showConfirmButton="showConfirmButton"
    class="g-dialogtips"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #default>
      <div v-if="showTitle" class="tipsconbox">
        <div class="confirmconbox-tit" :class="[showTitleLine ? 'bomline' : '']">
          <div>{{ title }}</div>
          <div v-if="showClose" @click="() => $emit('clickCloseBtn', false)" class="closebtn"><van-icon name="cross" /></div>
        </div>
      </div>
      <slot></slot>
    </template>
  </van-dialog>
</template>
<script>
export default {
  name: 'SimpleDialog',
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
    },
    //是否显示标题
    showTitle: {
      type: Boolean,
      default: true,
    },
    //标题内容
    title: {
      default: '提示',
    },
    //是否显示标题下方横线
    showTitleLine: {
      type: Boolean,
      default: false,
    },
    //是否显示关闭按钮
    showClose: {
      default: true,
    },
    //是否显示确认按钮
    showConfirmButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.g-dialogtips {
  overflow: hidden;
  .tipsconbox {
    position: relative;
    color: #333333;
    padding: 0 10px;
    .confirmconbox-tit {
      text-align: center;
      padding: 16px 0;
      font-weight: 700;
      &.bomline {
        border-bottom: 1px solid #e6e6e6;
      }
      font-size: 16px;
      .closebtn {
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }
  }
}
</style>
