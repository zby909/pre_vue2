<!-- 日期选择 年月日 返回选择的 开始结束时间戳 数组字符串 -->
<!-- 默认选择区间为当天零点与23:59:59、手动选择其它日期也是输出其00:00:00到23:59:59-->
<!-- 需使用JSON.parse()接收-->
<!-- <PickerDate v-model="showTimePicker" @confirmTime="confirmTime" @cancelTime="showTimePicker = false" :chooseType="chooseType" /> -->
<template>
  <van-popup
    v-on="$listeners"
    v-bind="$attrs"
    :value="value"
    @input="val => $emit('input', val)"
    :overlay="true"
    position="bottom"
    :style="{ height: '50%' }"
  >
    <van-datetime-picker
      class="datePicker-con"
      @change="changeTime"
      type="date"
      title="选择时间"
      :formatter="formatterFn"
      visible-item-count="3"
      v-model="defaultDate"
    >
      <template slot="default">
        <div class="title-box">
          <span @click="cancelTime" class="cancel">取消</span>
          <span class="title">选择时间</span>
          <span @click="confirmTime" class="confirm">确定</span>
        </div>
      </template>
      <template slot="columns-top">
        <div class="dateData">
          <div @click="chooseTime('start')" :class="[chooseTimeType == 'start' ? 'choose' : '']" class="start">
            <span>开始时间</span><span>{{ filterChooseDate(chooseDateCopy[0]) }}</span>
          </div>
          <div class="line">一</div>
          <div @click="chooseTime('end')" :class="[chooseTimeType == 'end' ? 'choose' : '']" class="end">
            <span>结束时间</span><span>{{ filterChooseDate(chooseDateCopy[1]) }}</span>
          </div>
        </div>
      </template>
    </van-datetime-picker>
  </van-popup>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'PickerDate',
  components: {},
  props: {
    //显示状态
    value: {
      type: Boolean,
      default: false,
    },
    chooseType: {
      type: String,
      default: 'start', //start||end
    },
    //默认选择的全部开始结束日期（传入毫秒时间戳/Date()）如:chooseDate="[new Date('2025/01/03'), 1735948800000]"
    chooseDate: {
      type: Array,
      default: () => {
        return [new Date().setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1];
      },
    },
  },
  data() {
    return {
      chooseDateCopy: JSON.parse(JSON.stringify(this.chooseDate)), //上面选择的日期(深拷贝下来再操作防止错乱)

      chooseTimeType: 'start', //当前选择的是开始日期还是结束日期
      defaultDate: new Date(), //当前选择器默认日期
    };
  },
  computed: {},
  watch: {
    chooseDateCopy: {
      deep: true,
      immediate: true,
      handler() {
        //统一转换为00:00:00/23:59:59毫秒时间戳操作
        this.chooseDateCopy[0] = new Date(this.chooseDateCopy[0]).setHours(0, 0, 0, 0);
        this.chooseDateCopy[1] = new Date(this.chooseDateCopy[1]).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1;
        //让当前选择器选择传过来的日期
        this.defaultDate = this.chooseTimeType == 'start' ? new Date(this.chooseDateCopy[0]) : new Date(this.chooseDateCopy[1]);
        console.log(this.chooseDateCopy);
      },
    },
    chooseType(val) {
      this.chooseTime(val);
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    filterChooseDate(val) {
      return dayjs(val).format('YYYY-MM-DD');
    },

    formatterFn(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
    },

    chooseTime(val) {
      this.chooseTimeType = val;
      this.defaultDate = this.chooseTimeType == 'start' ? new Date(this.chooseDateCopy[0]) : new Date(this.chooseDateCopy[1]);
    },

    changeTime(picker) {
      const pickerVal = picker.getValues(); // ['2022年', '11月', '03日']
      const formatValue = pickerVal[0] + pickerVal[1] + pickerVal[2]; // 2013年01月01日
      let format = formatValue.replace(/[\u4e00-\u9fa5]/g, '/'); //2013/01/01/
      format = format.substr(0, format.length - 1); //2013/01/01
      if (this.chooseTimeType == 'start') {
        this.chooseDateCopy.splice(0, 1, new Date(format).setHours(0, 0, 0, 0));
      } else {
        this.chooseDateCopy.splice(1, 1, new Date(format).setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1);
      }
    },

    //时间选择
    confirmTime() {
      if (this.chooseDateCopy[0] > this.chooseDateCopy[1]) {
        this.$toast('开始时间不能大于结束时间');
        return;
      }

      let outObj = {
        timestamp: this.chooseDateCopy,
        filterTime: [],
      };
      this.chooseDateCopy.forEach(i => {
        outObj.filterTime.push(dayjs(i).format('YYYY-MM-DD'));
      });
      const timeArr = JSON.stringify(outObj);
      this.$emit('confirmTime', timeArr);
    },

    cancelTime() {
      this.$emit('cancelTime');
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .datePicker-con {
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 15px;
    .title {
      font-weight: 700;
      color: #333;
      font-size: 17px;
    }
    .cancel {
      color: #999;
      font-size: 16px;
    }
    .confirm {
      color: #ff7920;
      font-size: 16px;
    }
  }

  .dateData {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 15px 40px;
    border-top: 1px solid #eee;
    .start,
    .end {
      width: 155px;
      height: 55px;
      box-sizing: border-box;
      padding: 9px 10px 8px;
      border-radius: 5px;
      background-color: #f2f2f2;
      text-align: center;
      color: #808080;
      font-size: 13px;
      span:first-of-type {
        margin-bottom: 5px;
      }
      span {
        display: block;
      }
    }
    .choose {
      background-color: #fff;
      color: #ff7920;
      font-weight: 700;
      border: 1px solid #ff7920;
    }
  }
}
</style>
