import { Switch, Route } from 'react-router-dom';
import React, { lazy } from 'react';
import PermissionRoute from '@/components/permission-route';
import RedirectPage from '@/views/redirect-page';
import CONSTANTS from '@/constants/enumeration';

const Demo = lazy(() => import('./views/demo/index'));

const BusinessRouter = () => {
  return (
    <Switch>
      {/* 只有菜单路由才需要PermissionRoute,详情页等不需要 */}
      <PermissionRoute path={`${CONSTANTS.routePrefix}/project`} render={() => <Demo />} />
      <PermissionRoute path={`${CONSTANTS.routePrefix}/contract`} render={() => <div>alotclient</div>} />
      <Route path={CONSTANTS.routePrefix} exact={true} render={() => <RedirectPage />} />
      <Route path='/' exact={true} render={() => <RedirectPage />} />
    </Switch>
  );
};

export default BusinessRouter;
