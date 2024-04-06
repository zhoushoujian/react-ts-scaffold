import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/ducks/main';
import Routers from './router';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
);

// 开发环境开启热更新
if (process.env.NODE_ENV === 'development' && typeof module !== 'undefined') {
  if ((module as any).hot) {
    (module as any).hot.accept();
  }
}
