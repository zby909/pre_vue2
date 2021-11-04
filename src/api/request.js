import axios from 'axios';
import Qs from 'qs';
import { Toast } from 'vant';

const BaseServiceApi = process.env.VUE_APP_SERVICE_BASE_URL;
// 一个axios请求实例
const BaseService = axios.create({
  baseURL: BaseServiceApi, // url = base url + request url
  timeout: 5000, // request timeout
});

let g_showMsg = true;

BaseService.getRequest = async (url, params = {}, { showMsg = true } = {}) => {
  g_showMsg = showMsg;
  const res = await BaseService.get(url, { params });
  return [res?.data?.data, res?.data, res];
};

BaseService.postRequest = async (url, params = {}, { showMsg = true, isJson = true } = {}) => {
  g_showMsg = showMsg;
  const res = await BaseService.post(url, isJson ? params : Qs.stringify(params));
  return [res?.data?.data, res?.data, res];
};

// 添加请求拦截器
BaseService.interceptors.request.use(
  config => {
    //后续可以在这进行token的传递
    config.headers['Auth-Code'] = 'wsnbb';
    // 请求发送前进行处理
    console.log('请求拦截BaseService', config);
    return config;
  },
  error => {
    // 请求错误处理
    console.log(error);
    // return Promise.reject(error);
    return error;
  }
);

// 添加响应拦截器
BaseService.interceptors.response.use(
  response => {
    console.log('响应拦截BaseService', response);
    if (g_showMsg && response.data.code !== 0) {
      Toast({
        message: response.data.msg ?? '未知错误',
        type: 'fail',
        duration: 5 * 1000,
      });
    }
    return response;
  },
  error => {
    // 响应错误处理
    Toast({
      message: '请求错误',
      type: 'fail',
      duration: 5 * 1000,
    });
    console.log(error);
    return error;
  }
);

//----------------------------------下一个实例----------------------------------

export { BaseService };
