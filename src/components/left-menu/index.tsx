import React, { useState, useCallback, useEffect } from 'react';
import { Menu } from 'antd';
import * as Icons from '@ant-design/icons';
import { connect } from 'react-redux';
import maxLogo from '@/assets/max-logo.png';
import minLogo from '@/assets/min-logo.png';
import useRouter from '@/hooks/use-router';
import { MenuItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems';
import { isUrl } from '@/utils/common';
import { IMenuList } from '@/@types/common';
import styles from './index.module.less';

const LeftMenu = ({ menuData, menuFold }: { menuData: IMenuList[]; menuFold: boolean }) => {
  const { push } = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string>('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onClick = (e: any) => {
    if (/^https?:\/\//.test(e.key)) {
      window.open(e.key);
    } else {
      setSelectedKeys(e.key);
      push(`${e.key}`);
    }
  };

  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  const getSubMenuOrItem = (item: IMenuList): SubMenuType | MenuItemType => {
    const { name, redirectUrl, path, menuIcon, routes } = item;
    //@ts-ignore
    const Icon = menuIcon ? (isUrl(menuIcon) ? menuIcon : Icons[menuIcon]) : undefined;
    const hasChildren = !!routes?.length;
    const key = hasChildren ? path : redirectUrl!;
    return {
      label: hasChildren ? (
        name
      ) : (
        <a onClick={(e) => e.preventDefault()} href={window.location.origin + key}>
          {name}
        </a>
      ),
      key,
      icon: typeof Icon !== 'object' ? Icon : <Icon />,
      children: hasChildren ? getNavMenuItems(routes) : undefined,
    };
  };

  const getNavMenuItems = (menusData: IMenuList[]) => {
    return menusData.map((item) => getSubMenuOrItem(item)).filter((item) => item);
  };

  const findOpenMenu = useCallback((menuData: IMenuList[], result: string[]) => {
    return menuData.some((item) => {
      if (item.redirectUrl === location.pathname) {
        const arr = item.path?.split('/') || [];
        const openKeys: string[] = [];
        for (let i = 1; i < arr.length - 1; i++) {
          openKeys.push((openKeys[openKeys.length - 1] || '') + '/' + arr[i]);
        }
        result.push(...openKeys);
        return true;
      } else {
        if (Array.isArray(item.routes)) {
          findOpenMenu(item.routes, result);
          return false;
        }
        return false;
      }
    });
  }, []);

  const prepareMenuFunc = useCallback(
    (firstRun: boolean) => {
      if (menuData.length) {
        const pathname = location.pathname;
        const result: string[] = [];
        findOpenMenu(menuData, result);
        setOpenKeys(result);
        setSelectedKeys(pathname);
        if (!result.length && firstRun) {
          setTimeout(() => {
            //从directPage跳转到目标页，菜单的展开和选中要再次计算
            prepareMenuFunc(false);
          }, 1000);
        }
      }
    },
    [menuData, findOpenMenu],
  );

  useEffect(() => {
    prepareMenuFunc(true);
  }, [prepareMenuFunc]);

  useEffect(() => {
    // getResourceInfo().then((res: any) => {
    //   $dispatch(updateMenuData(res.data.menuList));
    // });
  }, []);

  return (
    <div className={styles.container}>
      <img
        id='logo'
        className={menuFold ? styles.minLogo : styles.maxLogo}
        src={menuFold ? minLogo : maxLogo}
        alt='logo'
      />
      <Menu
        theme='dark'
        inlineCollapsed={menuFold}
        onClick={onClick}
        style={{ width: menuFold ? 80 : 200, height: '100vh', flexShrink: 0 }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[selectedKeys]}
        mode='inline'
        items={getNavMenuItems(menuData || [])}
      ></Menu>
    </div>
  );
};

const mapStateToProps = (state: { common: { menuData: IMenuList[]; menuFold: boolean } }) => {
  return {
    menuData: state.common.menuData,
    menuFold: state.common.menuFold,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
