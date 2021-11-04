<template>
  <div class="box">
    <div class="con">
      <HkIcon icon="icon404" fontSize="200px" iconClass="icon"></HkIcon>
      <div class="text">路径不正确~</div>
      <p class="status">404</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
  display: flex;
  margin-top: 20vh;
  justify-content: center;
  .con {
    text-align: center;
    .icon {
      color: #333;
    }
    .status {
      font-size: 28px;
      letter-spacing: 3px;
      padding-left: 3px;
    }
  }
}
</style>
