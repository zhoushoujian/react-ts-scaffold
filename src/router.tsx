import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';
import PageContainer from '@/components/layout/page-container';
import BusinessRouter from './business-router';
import Login from './views/login/index';
import CONSTANTS from './constants/enumeration';

const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <Route path={`${CONSTANTS.routePrefix}/login`} render={() => <Login />} />
        <PageContainer>
          <Suspense fallback={<Spin />}>
            {/* todo - 业务router */}
            <Route path={`${CONSTANTS.routePrefix}`} render={() => <BusinessRouter />} />
            <Route path='/' exact={true} render={() => <BusinessRouter />} />
          </Suspense>
        </PageContainer>
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
