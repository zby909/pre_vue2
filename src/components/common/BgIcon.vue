<!--
描述：将图片以背景显示 by: zby
使用说明：
<BackgroundImg :img="'图片路径'" :size="类型，可选cover / contain"/> 外部定义类名设置宽高即可显示
-->
<template>
  <div class="g-icon-wrap">
    <div class="g-icon-wrap_bg" :class="[size]" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
  </div>
</template>

<script>
export default {
  name: 'BgIcon',
  props: {
    img: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      default: 'contain',
    },
  },
};
</script>

<style lang="scss" scoped>
.g-icon-wrap {
  display: inline-block;

  .g-icon-wrap_bg {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    &.cover {
      background-size: cover;
    }
  }
}
</style>
