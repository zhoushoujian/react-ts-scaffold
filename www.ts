import express from 'express';
import webpack from 'webpack';
import proxy from 'express-http-proxy';
import openBrowser from 'react-dev-utils/openBrowser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { consoleFormat } from '@szhou/script-tools';
import webpackConf from './webpack/dev';

consoleFormat();

// 设置运行环境
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const app = express();
//@ts-ignore
const compiler = webpack(webpackConf);
const { publicPath } = webpackConf.output;
app.use(webpackDevMiddleware(compiler, { stats: { colors: true, cached: false }, publicPath }));
app.use(webpackHotMiddleware(compiler));

//todo
app.use(
  '/authCenter/',
  proxy('http://10.30.4.94:8190', {
    proxyReqPathResolver(req: any) {
      // eslint-disable-next-line no-console
      console.log('proxy received, req.url', req.url);
      return 'http://10.30.4.94:8190/authCenter' + req.url;
    },
  }),
);

const port = 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
  const url = `http://localhost:${port}/#demo`;
  // eslint-disable-next-line no-console
  console.info('服务地址：', url);
  openBrowser(url);
});

export default app;
