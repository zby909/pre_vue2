import dayjs from 'dayjs';
// console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'));

/* 格式化时间 */
//params: 时间戳/new Date(?)
const dayFormat = (timeval = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(timeval).format(format);
};

/* 获取上周时间范围 默认从当天算起 */
// 使用：getLastWeek()
//params: 时间戳/new Date(?)
// 返回：{startDateTime: "2021-05-10 00:00:00", endDateTime: "2021-05-16 23:59:59"}
const getLastWeek = (value = null, separate = '-') => {
  // 如果为null,则格式化当前时间
  if (!value) value = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  const one_day = 86400000; // 24 * 60 * 60 * 1000;
  const lastWeekDate = new Date(value - 7 * one_day);
  const day = lastWeekDate.getDay() === 0 ? 7 : lastWeekDate.getDay(); // 返回1-7,7表示周日
  // 设置时间为上周那天的0点
  lastWeekDate.setHours(0, 0, 0, 0);

  //算出上周开始时间结束时间
  const week_start_time = new Date(lastWeekDate.getTime() - (day - 1) * one_day);
  const week_end_time = new Date(lastWeekDate.getTime() + (7 - day) * one_day);

  //格式化日期
  const filters = n => {
    return n < 10 ? (n = '0' + n) : n;
  };
  const startmonth = filters(week_start_time.getMonth() + 1);
  const startDay = filters(week_start_time.getDate());
  const endmonth = filters(week_end_time.getMonth() + 1);
  const endDay = filters(week_end_time.getDate());

  const startDateTime = week_start_time.getFullYear() + separate + startmonth + separate + startDay;
  const endDateTime = week_end_time.getFullYear() + separate + endmonth + separate + endDay;

  return {
    startDateTime: startDateTime + ' 00:00:00',
    endDateTime: endDateTime + ' 23:59:59',
  };
};

/* 获取本周时间范围 默认从当天算起 */
const getCurrentWeek = (value = null, separate = '-') => {
  // 如果为null,则格式化当前时间
  if (!value) value = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  const one_day = 86400000; // 24 * 60 * 60 * 1000;
  const weekDate = new Date(value);
  const day = weekDate.getDay() === 0 ? 7 : weekDate.getDay(); // 返回1-7,7表示周日
  // 设置时间为当天的0点
  weekDate.setHours(0, 0, 0, 0);

  //算出本周开始时间结束时间
  const week_start_time = new Date(weekDate.getTime() - (day - 1) * one_day);
  const week_end_time = new Date(weekDate.getTime() + (7 - day) * one_day);

  //格式化日期
  const filters = n => {
    return n < 10 ? (n = '0' + n) : n;
  };
  const startmonth = filters(week_start_time.getMonth() + 1);
  const startDay = filters(week_start_time.getDate());
  const endmonth = filters(week_end_time.getMonth() + 1);
  const endDay = filters(week_end_time.getDate());

  const startDateTime = week_start_time.getFullYear() + separate + startmonth + separate + startDay;
  const endDateTime = week_end_time.getFullYear() + separate + endmonth + separate + endDay;
  return {
    startDateTime: startDateTime + ' 00:00:00',
    endDateTime: endDateTime + ' 23:59:59',
  };
};

/* 获取上月时间范围 默认从当天算起 */
const getLastMonth = (value = null, separate = '-') => {
  // 如果为null,则格式化当前时间
  if (!value) value = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  // 获取上个月时间
  const targetTime = new Date(value);
  let year = targetTime.getFullYear();
  let month = targetTime.getMonth();
  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const yDate = new Date(year, month, 0);

  const startDateTime = year + separate + month + separate + '01 00:00:00'; //上个月第一天
  const endDateTime = year + separate + month + separate + yDate.getDate() + ' 23:59:59'; //上个月最后一天
  return {
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
};

/* 获取本月时间范围 默认从当天算起 */
const getCurrentMonth = (value = null, separate = '-') => {
  // 如果为null,则格式化当前时间
  if (!value) value = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (value.toString().length == 10) value *= 1000;
  value = +new Date(Number(value));

  const targetTime = new Date(value);
  const year = targetTime.getFullYear();
  let month = targetTime.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  const yDate = new Date(year, month, 0);

  const startDateTime = year + separate + month + separate + '01 00:00:00'; //这个月第一天
  const endDateTime = year + separate + month + separate + yDate.getDate() + ' 23:59:59'; //这个月最后一天

  return {
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
};

export { dayjs, dayFormat, getLastWeek, getCurrentWeek, getLastMonth, getCurrentMonth };
