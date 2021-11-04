import { hexMD5 } from '@/utils/signature/md5';

export function getToken() {
  return {
    token: uni.getStorageSync('Device-Code') || '',
    secretKey: uni.getStorageSync('secretKey') || '',
  };
}

export function removeToken() {
  //清除配置信息
  uni.removeStorageSync('snKey');
  uni.removeStorageSync('secretKey');
  uni.removeStorageSync('Device-Code');
}

export function setCommonParams(params) {
  params.nonce = generateNonce();
  params.timestamp = parseInt(Date.now() / 1000);
}

export function generateNonce() {
  var d = new Date().getTime();
  if (window?.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function getSign(params, secretKey) {
  params = removeNull(params);
  let asciiSortArr = asciiSort(params);
  // let asciiSortKey = Object.keys(params).sort();
  let str = asciiSortArr
    .map(v => {
      return `${v[0]}=${typeof v[1] !== 'object' ? v[1] : JSON.stringify(v[1])}`;
    })
    .join('&');
  str += `&${secretKey}`;
  // console.log(asciiSortArr, asciiSortKey, str, hexMD5(str));
  return hexMD5(str);
}

export function asciiSort(params) {
  let asciiSortKey = Object.keys(params).sort();
  return asciiSortKey.map(v => {
    return [v, params[v]];
  });
}

export function removeNull(data) {
  if (typeof data !== 'object') return;
  let obj = JSON.parse(JSON.stringify(data));
  Object.keys(obj).map(item => {
    if (obj[item] === null || obj[item] === '' || typeof obj[item] === 'undefined') {
      delete obj[item];
    }
    return true;
  });
  return obj;
}
