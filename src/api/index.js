// api.js

import axios from 'axios';

const instance = axios.create({
  timeout: 20000, // 设置请求超时时间
});

// 模拟节流函数
const throttle = (fn, delay) => {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      return fn.apply(this, args);
    } else {
      // 如果在节流时间内再次调用，直接返回一个 resolved 的 Promise
      return Promise.resolve();
    }
  };
};

// 封装 API 请求函数
const apiRequest = (url, method = 'get', data = {}) => {
  const headers = {};

  headers['Content-Type'] = `application/json;chartset=utf-8`;

  return instance({
    url,
    method,
    data,
    headers,
  });
};

// 导出节流后的 API 请求函数
export const throttledApiRequest = throttle(apiRequest, 1000); // 1秒内只允许发起一次请求
