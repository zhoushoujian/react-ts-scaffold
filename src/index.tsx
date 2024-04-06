import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import store from '@/store/main';
import Routers from './router';
import 'antd/dist/antd.css';

const container = document.getElementById('root');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Routers />
    </Provider>
  </ConfigProvider>,
  container,
);

// 开发环境开启热更新
if (process.env.NODE_ENV === 'development' && typeof module !== 'undefined') {
  if ((module as any).hot) {
    (module as any).hot.accept();
  }
}
