/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '@/components/loading';
import { updateRedux } from '@/store/common';
import { $getState, $dispatch } from '@/store/main';
import { request } from '@/utils/request';

console.log('get redux data => ', $getState().common.redux);

const Demo = ({ redux }: { redux: string }) => {
  console.log('redux => ', redux);

  useEffect(() => {
    $dispatch(updateRedux('redux update'));
    request('https://api.zhoushoujian.com').then((res: any) => {
      console.log('res', res);
    });
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Loading text='hello world, click me!' />
    </div>
  );
};

const mapStateToProps = (state: { common: { redux: string } }) => {
  return {
    redux: state.common.redux,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
