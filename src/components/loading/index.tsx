import React from 'react';
import styles from './index.module.less';

const colors = ['#ff0', '#f00', '#f0f', '#0ff', '#00f', '#0f0'];

const Loading = ({ text = 'loading' }) => {
  const changeColor = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className={styles.loading} onClick={changeColor}>
      {text}
    </div>
  );
};

export default Loading;
