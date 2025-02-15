/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '@/components/loading';
import { updateRedux } from '@/ducks/common';
import { $getState, $dispatch } from '@/ducks/main';
import { request } from '@/utils/request';
import { IApiResponse } from '@/@types/common';
import styles from './index.module.less';

console.log('get redux data => ', $getState().common.redux);

const Demo = ({ redux }: { redux: string }) => {
  console.log('redux => ', redux);

  const getApi = (): IApiResponse<{ apiCount: string; date: string }> => {
    return request('https://api.zhoushoujian.com');
  };

  useEffect(() => {
    // console.log('Object.fromEntries', Object.fromEntries);
    // console.log('spread data', [...new Set([1, 2, 1])]);
    $dispatch(updateRedux('redux update'));
    getApi().then((res) => {
      console.log('res', res);
    });
  }, []);

  return (
    <div className={styles.container}>
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
