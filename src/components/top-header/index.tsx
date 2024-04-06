import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Menu, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CalendarOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { $dispatch } from '@/store/main';
import { updateMenuFold } from '@/store/common';
import useRouter from '@/hooks/use-router';
import styles from './index.module.less';

const TopHeader = ({ menuFold }: { menuFold: boolean }) => {
  const { push } = useRouter();

  const logoutFun = () => {
    localStorage.removeItem('tempLocation');
    push('/login');
  };

  const foldMenuFunc = () => {
    $dispatch(updateMenuFold(!menuFold));
    const logo = document.getElementById('logo');
    logo!.style.display = 'none';
    Promise.resolve().then(() => {
      logo!.style.display = 'block';
    });
  };

  const loginDate = dayjs(+new Date()).format('YYYY-MM-DD');
  return (
    <div className={styles.header}>
      {menuFold ? <MenuUnfoldOutlined onClick={foldMenuFunc} /> : <MenuFoldOutlined onClick={foldMenuFunc} />}
      <div className={styles.headerLeft}>
        <div className={styles.headerWebTitle}>demo运营系统</div>
      </div>
      <div className={styles.headerRight}>
        <Menu mode='horizontal' style={{ color: 'rgba(0, 0, 0, 0.48)' }} disabledOverflow={true}>
          <Menu.Item key='loginDate'>
            <CalendarOutlined />
            <span>{loginDate}</span>
          </Menu.Item>
          <Menu.Item key='personalCenter'>
            <Fragment>
              <UserOutlined />
              <span className={styles.name}>您好，charm</span>
            </Fragment>
          </Menu.Item>
          <Menu.Item key='logout' className={styles.logout}>
            <Popconfirm
              title='确定退出系统?'
              onConfirm={logoutFun}
              okText='确定'
              cancelText='取消'
              style={{ width: 200 }}
              placement='leftBottom'
            >
              <Fragment>
                <LogoutOutlined />
                <span>退出</span>
              </Fragment>
            </Popconfirm>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { common: { menuFold: boolean } }) => {
  return {
    menuFold: state.common.menuFold,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
