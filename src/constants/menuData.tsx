import CONSTANTS from './enumeration';

const menuData = [
  {
    id: 308,
    path: '/project-management',
    name: '项目管理',
    authority: ['project-management'],
    redirectUrl: `${CONSTANTS.routePrefix}/project-management`,
    menuIcon: 'ProjectOutlined',
    routes: [
      {
        id: 309,
        path: '/project-management/project-list',
        name: '项目列表',
        authority: ['project-list'],
        redirectUrl: `${CONSTANTS.routePrefix}/project`,
        routes: [],
      },
      {
        id: 310,
        path: '/project-management/contract-management',
        name: '合同管理',
        authority: ['contract-management'],
        redirectUrl: `${CONSTANTS.routePrefix}/contract`,
        routes: [],
      },
    ],
  },
];

export default menuData;
