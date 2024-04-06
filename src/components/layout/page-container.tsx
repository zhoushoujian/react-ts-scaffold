import React, { ReactNode } from 'react';
import TopHeader from '@/components/top-header';
import LeftMenu from '@/components/left-menu';
import { connect } from 'react-redux';
import styles from './index.module.less';

const PageContainer = ({ children, menuFold }: { children: ReactNode; menuFold: boolean }) => {
  return (
    <>
      <LeftMenu />
      <div
        className={styles.rightContainer}
        style={{
          width: `calc(100% - ${menuFold ? '80px' : '200px'})`,
        }}
      >
        <TopHeader />
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state: { common: { menuFold: boolean } }) => {
  return {
    menuFold: state.common.menuFold,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
