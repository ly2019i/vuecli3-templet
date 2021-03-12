import axios from "axios"; // 引入axios
const baseUrl = process.env.VUE_APP_BASE_URL;
// 请求超时重新请求次数，请求间隙
axios.defaults.retry = 3;
axios.defaults.retryDelay = 1000;
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 7000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  //  对出错的接口自动重试三次
  function axiosRetryInterceptor(err) {
    var config = err.config;
    if (config.transformResponse && !config.transformResponse.retry) {
      config.transformResponse.retry = 3; //设置默认重复次数
    }
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }
    config.__retryCount += 1;
    var backOff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 2000);
    });
    return backOff.then(function () {
      return instance(config);
    });
  }
);
export const get = (url, config) => {
  return instance.get(url, config);
};

export const post = (url, data, config) => {
  return instance.post(url, data, config);
};

export const del = (url, config) => instance.delete(url, config);

export const put = (url, data, config) => instance.put(url, data, config);
