import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

const Demo = lazy(() => import('./views/demo/index'));

const Routers = () => {
  return (
    <HashRouter basename='/'>
      <Suspense fallback={<Spin />}>
        <Routes>
          {/* todo */}
          <Route path='/demo' element={<Demo />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default Routers;
