import CONSTANTS from '@/constants/enumeration';
import { $getState } from '@/store/main';
import { message } from 'antd';
import * as axiosPackage from 'axios';

// axios拦截器配置
export const axiosInterceptorsConfig = (request: axiosPackage.AxiosInstance) => {
  request.defaults.timeout = 10000;

  request.interceptors.request.use(
    function (config: axiosPackage.AxiosRequestConfig) {
      config.headers.authorization = 'commonUserToken';
      return config;
    },
    function (err: Error) {
      // eslint-disable-next-line no-console
      console.error('axios.interceptors.request err', err);
      return Promise.reject(err);
    },
  );

  request.interceptors.response.use(
    (response: axiosPackage.AxiosResponse) => {
      if (response.data?.code && response.data?.code !== '000000') {
        message.error(response.data?.msg);
        return Promise.reject(Error(response.data));
      }
      return response.data;
    },
    (error: axiosPackage.AxiosError) => {
      const { response } = error;
      const { status } = response || {};
      if (status === 401 || status === 403) {
        localStorage.setItem('tempLocation', location.href);
        return backToLoginFunc();
      }
      return Promise.reject(error); // 返回接口的错误信息
    },
  );
};

export const reportCallError = (err: any) => {
  if (err && err.result && err.result.errCode === 400) {
    message.error(err.result.errText);
  }
};

export const isUrl = (path: string) => {
  // eslint-disable-next-line no-useless-escape
  return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(
    path,
  );
};

export const backToLoginFunc = () => {
  window.location.href = `${window.location.origin}${CONSTANTS.routePrefix}/login`;
};

const getAllMenuListFunc = (menuList: any, allMenuList: string[]) => {
  menuList.forEach((item: any) => {
    if (Array.isArray(item.routes) && item.routes.length) {
      getAllMenuListFunc(item.routes, allMenuList);
    } else {
      allMenuList.push(item.redirectUrl!);
    }
  });
};

export const getAllMenuList = () => {
  const menuList = $getState().common.menuData;
  const allMenuList: string[] = [];
  getAllMenuListFunc(menuList, allMenuList);
  return allMenuList;
};
