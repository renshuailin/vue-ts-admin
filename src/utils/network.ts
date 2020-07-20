import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Message } from "element-ui";
import router from "@/router";

//请求拦截 识别token并放置头部提交服务器
//响应拦截 请求网络或业务错误

// 实例化axios
const service = axios.create({
  timeout: 10000
});

// q请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Do something before request is sent
    // 处理token
    if (localStorage.tsToken) {
      config.headers.Authorization = localStorage.tsToken;
    }
    return config;
  },
  (error: any) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something before response is sent
    return response;
  },
  (error: any) => {
    // Do something with response error
    let errMsg = "";
    if (error && error.response.status) {
      // 判断错误状态
      switch (error.response.status) {
        case 401:
          errMsg = "登录状态失效，请重新登录";
          localStorage.removeItem("tsToken");
          router.push("/login");
          break;
        case 403:
          errMsg = "拒绝访问";
          break;
        case 408:
          errMsg = "请求超时";
          break;
        case 500:
          errMsg = "服务器错误";
          break;
        case 501:
          errMsg = "服务器未实现";
          break;
        case 501:
          errMsg = "服务器未实现";
          break;
        case 502:
          errMsg = "网关错误";
          break;

        case 503:
          errMsg = "服务不可用";
          break;

        case 504:
          errMsg = "网关超时";
          break;

        case 505:
          errMsg = "HTTP版本不受支持";
          break;

        default:
          errMsg = error.response.data.msg;
          break;
      }
    } else {
      errMsg = error;
    }
    Message.error(errMsg);
    return Promise.reject(errMsg);
  }
);

export default service;
