<!--
阿里巴巴图标库使用说明：
icon--对应图片库font class名
iconClass--自定义类名
<HkIcon icon="iconexittuichu" fontSize="16px" iconClass="hk-header-list-icon"></HkIcon>
-->
<template>
  <svg class="g-icon" :class="iconClass" aria-hidden="true" :style="{ fontSize: fontSize }">
    <use :xlink:href="'#' + icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'HkIcon',
  props: {
    icon: {
      type: String,
      require: true,
    },
    iconClass: {
      type: String,
      default: '',
    },
    fontSize: {
      type: String,
      default: '1em',
    },
  },
};
</script>
