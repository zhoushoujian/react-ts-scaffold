import thunk from 'redux-thunk';
// eslint-disable-next-line camelcase
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '@/store';

const middleware: any[] = [thunk];
middleware.push(
  createLogger({
    collapsed: false,
  }),
);
const store = legacy_createStore(reducer, compose(applyMiddleware(...middleware)));
export const $dispatch = store.dispatch;
export const $getState = store.getState as any;
export default store;
//@ts-ignore
// window.$getState = $getState;
