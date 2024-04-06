import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { Configuration } from 'webpack-dev-server/types/lib/Server.d';
import config from './config';
import commonConf from './common';

const { publicPath } = config;
const dev: webpack.Configuration = merge(commonConf, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    polyfill: ['core-js/stable'],
    index: path.join(__dirname, '../src/index.tsx'),
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(publicPath, './index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    //@ts-ignore
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  //这个配置用于开启热更新，如果要支持IE，就注释掉，否则打开
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    //启用热更新
    liveReload: true,
    hot: true,
    client: {
      overlay: false,
      logging: 'none',
    },
    //todo
    open: `/demo/project`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      //todo
      '/authCenter': {
        target: 'http://10.30.4.94:8190',
        changeOrigin: true,
      },
    },
  } as Configuration,
});

export default dev;
