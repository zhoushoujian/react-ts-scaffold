# 基于react的ts脚手架项目

## 框架

react16 + redux + typescript + antd4 + webpack5 + less + css module + eslint

## 介绍

1. 本脚手架默认采用`react16+antd4`，如需使用最新的框架(react18 + antd5)，需手动切到分支`release/react18+antd5`
2. 本脚手架里的ts编译方式有esbuild，babel和swc，默认使用babel构建，如需更换，请修改`webpack\common.ts`
3. 本脚手架支持使用webpack5和vite4，默认使用webpack打包，如需使用vite，运行`npm run vite`
4. 脚手架中todo的地方皆需要在具体项目里替换,全局搜索todo即可

## 安装

node: 16.20.0（推荐）
pnpm: 7.32.0（推荐）

```shell
pnpm install
pnpm start
```

## 功能

### 通用能力

1. eslint相关配置全家桶
2. husky,lint-stage,commitlint相关的git提交钩子
3. typescript相关配置
4. webpack5,vite等构建工具相关的配置（包含polyfill,热更新,前端代理,css module等）
5. react框架全家桶环境搭建
6. redux框架及中间件相关环境搭建
7. 封装常用的react hooks操作
8. 提供ES标准的高版本的polyfill测试用例
9. 登录后优先跳往401后的那个页面

### 专用能力

1. 集成sso逻辑
2. 集成乾坤微前端的框架服务能力
3. 封装路由守卫，对菜单类的路由进行鉴权
4. 集成登录页面
5. 登录成功后自动跳往该用户拥有权限的第一个菜单路由页面
6. 通过域名访问自动跳往该用户拥有权限的第一个菜单路由页面
7. 集成左侧菜单功能和顶部导航栏功能
8. 封装axios拦截器及请求前缀
9. 封装cookie相关的操作
10. 菜单带链接跳转
