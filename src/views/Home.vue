<template>
  <div>
    <div class="test">
      <van-button @click="test" type="primary" block>主要按钮</van-button>
      <van-button @click="showDialog = true" type="info" block>信息按钮</van-button>
      <van-button type="default" block>默认按钮</van-button>
    </div>

    <div class="ttt" @click="handleClipboard($event)">复制内容</div>

    <SimpleDialog v-model="showDialog" @clickCloseBtn="showDialog = false" showTitleLine showConfirmButton showCancelButton>
      <div class="dialog-con">con</div>
    </SimpleDialog>

    <div class="t-icon">
      <GLIcon icon="icon404" fontSize="200px" iconClass="icon"></GLIcon>
      <GLBgIcon class="bg-icon" :img="require('@/assets/logo.png')" />
    </div>
  </div>
</template>

<script>
import handleClipboard from '@/utils/clipboard';

import testApi from '@/api/modules/test.api.js';
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.show_cut_model = true;
    }, 1000);
  },
  methods: {
    handleClipboard,
    async test() {
      // let data = await this.$API.test.getTest({ id: 3778678 });
      let data = await testApi.getTest({ id: 3778678 });
      console.log(...data);
    },
  },
};
</script>
<style lang="scss" scoped>
.test {
  padding-top: 20px;
  .van-button {
    margin: 0 auto 20px;
    width: 750px;
  }
}

.ttt {
  text-align: center;
  color: $bg-orange;
  font-size: 32px;
}

.dialog-con {
  text-align: center;
  margin: 40px 20px;
}

.t-icon {
  text-align: center;
  .bg-icon {
    width: 200px;
    height: 200px;
  }
}
</style>
