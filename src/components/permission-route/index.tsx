import { getAllMenuList } from '@/utils/common';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

//只有菜单路由才需要PermissionRoute
const PermissionRoute = (props: RouteProps) => {
  const { path } = props;
  const allMenuList = getAllMenuList();
  // eslint-disable-next-line no-constant-condition
  if (allMenuList.includes(path as string) || true) {
    return <Route {...props} />;
  } else {
    return <div>403无权限访问，请联系管理员</div>;
  }
};

export default PermissionRoute;
