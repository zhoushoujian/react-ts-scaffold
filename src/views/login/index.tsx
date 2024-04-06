import React from 'react';
import { Button } from 'antd';
import styles from './index.module.less';

const Login = () => {
  return (
    <div className={styles.container}>
      <div>todo </div>
      <Button type='primary' onClick={() => history.back()}>
        返回
      </Button>
    </div>
  );
};

export default Login;
