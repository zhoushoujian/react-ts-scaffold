import menuData from '@/constants/menuData';

//actionType
const REDUX = 'redux';
const MENU_DATA = 'MENU_DATA';
const MENU_FOLD = 'MENU_FOLD';
const USER_INFO = 'USER_INFO';
const RESOURCE_CODES = 'RESOURCE_CODES';

// initialSate
const initialState = () => ({
  redux: 'init',
  menuData,
  menuFold: false,
  userInfo: undefined,
  resourceCodes: [],
});

interface IAction {
  type: string;
  data: any;
}

// Reducer
export default function reducer(state = initialState(), action: IAction) {
  switch (action.type) {
    case REDUX:
      return { ...state, redux: action.data };
    case MENU_DATA:
      return { ...state, menuData: action.data };
    case MENU_FOLD:
      return { ...state, menuFold: action.data };
    case USER_INFO:
      return { ...state, userInfo: action.data };
    case RESOURCE_CODES:
      return { ...state, resourceCodes: action.data };
    default:
      return state;
  }
}

// update
export const updateRedux = (data: string) => {
  return { type: REDUX, data };
};

export const updateMenuData = (data: any[]) => {
  localStorage.setItem('menuData', JSON.stringify(data));
  return { type: MENU_DATA, data };
};

export const updateMenuFold = (data: boolean) => {
  return { type: MENU_FOLD, data };
};
