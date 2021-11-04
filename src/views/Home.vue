<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="test">
      <van-button @click="test" type="primary" block>主要按钮</van-button>
      <van-button @click="showDialog = true" type="info" block>信息按钮</van-button>
      <van-button type="default" block>测试</van-button>
      <van-button type="warning" block>警告按钮</van-button>
      <van-button type="danger" block>危险按钮</van-button>
    </div>

    <div class="ttt">123</div>

    <SimpleDialog v-model="showDialog" @clickCloseBtn="showDialog = false" showTitleLine showConfirmButton showCancelButton>
      <div>con</div>
    </SimpleDialog>

    <div class="t-icon">
      <HkIcon icon="icon404" fontSize="200px" iconClass="icon"></HkIcon>
      <BgIcon class="bg-icon" :img="require('@/assets/logo.png')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
      showDialog: false,
      showTimePicker: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$toast('返回');
    },
    onClickRight() {
      this.$toast('按钮');
    },
    async test() {
      let data = await this.$API.test.getTest({ id: 3778678 });
      console.log(...data);
    },
    confirmTime(p) {
      console.log(p);
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
  .van-button {
    margin: 10px auto;
    width: 300px;
  }
}

.ttt {
  text-align: center;
  color: $bg-orange;
}

.t-icon {
  text-align: center;
  .bg-icon {
    width: 100px;
    height: 100px;
  }
}
</style>
