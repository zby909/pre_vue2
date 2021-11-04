<!-- 简易图片裁剪组件 --- 二次封装 -->
<!-- 更多api https://github.com/xyxiao001/vue-cropper -->
<!-- 使用：传入图片 比例 显示隐藏。方法：监听底部按钮点击即可  ---更多props查询文档自行添加 -->
<template>
  <div v-if="value" :value="value" @input="$emit('input', $event)" class="cropper-conbox" @touchmove.prevent>
    <div class="info">
      <vueCropper ref="cropper" v-bind="option" :img="img" :fixedNumber="fixedNumber"></vueCropper>
    </div>
    <div class="btns">
      <div @click="clickCancelCut" class="cancel">取消</div>
      <img @click="clickRotate" src="../../assets/rotate.png" alt="" />
      <div @click="clickOk" class="okey">确定</div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
  name: 'PictureCropping',
  components: { VueCropper },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    //裁剪图片的地址
    img: {
      type: String,
      default: '',
    },
    //截图框的宽高比例
    fixedNumber: {
      type: Array,
      default: () => {
        return [1, 1];
      },
    },
  },
  data() {
    return {
      option: {
        // 裁剪组件的基础配置option
        // img: this.img, // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        info: true, // 裁剪框的大小信息
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        //   autoCropWidth: 750, // 默认生成截图框宽度
        //   autoCropHeight: 180, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        // fixedNumber: this.fixedNumber, // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        fixedBox: false, // 固定截图框大小 不允许改变
        canMove: false, //上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        // high:true,// 是否按照设备的dpr 输出等比例图片
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        // maxImgSize: 2000, //限制图片最大宽度和高度
        // enlarge: 1, //图片根据截图框输出比例倍数
        mode: 'contain', //图片默认渲染方式
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clickCancelCut() {
      this.$refs.cropper.stopCrop();
      this.$refs.cropper.clearCrop();
      this.$emit('clickCancelCut', '点击取消');
    },
    clickRotate() {
      this.$refs.cropper.rotateRight();
      this.$emit('clickRotate', '点击旋转');
    },
    clickOk() {
      this.$refs.cropper.getCropData(base64 => {
        this.$refs.cropper.getCropBlob(blob => {
          this.$emit('clickOk', { blob, base64 });
          this.$refs.cropper.stopCrop();
          this.$refs.cropper.clearCrop();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.cropper-conbox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .info {
    width: auto;
    height: 400px;
    .vue-cropper {
      background-image: none;
      background-color: #000;
    }
  }
  .btns {
    padding: 0 10px;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 7.5px;
    img {
      width: 42.5px;
      height: 42.5px;
    }
    .cancel {
      background-color: #606465;
      padding: 7.5px 10px;
      width: 50px;
      border-radius: 5px;
    }
    .okey {
      background-color: #df6457;
      padding: 7.5px 10px;
      width: 50px;
      border-radius: 5px;
    }
  }
}
</style>
