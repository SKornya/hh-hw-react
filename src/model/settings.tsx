interface Settings {
  user: string;
  repo: string;
  blacklist: {
    list: Array<string>;
    currentLogin: string;
  };
}

const SET_USER = 'SETUSER';
const SET_REPO = 'SETREPO';
const ADD_TO_BLACKLIST = 'ADDTOBLACKLIST';
const REMOVE_FROM_BLACKLIST = 'REMOVEFROMBLAKCLIST';
const SET_CURRENT_LOGIN = 'SETCURRENTLOGIN';

const initialSettings: Settings = {
  user: '',
  repo: '',
  blacklist: {
    list: [],
    currentLogin: '',
  },
};

export interface SettingsAction {
  type: string;
  payload: string;
}

const setUser = (user: string): SettingsAction => ({
  type: SET_USER,
  payload: user,
});

const setRepo = (repo: string): SettingsAction => ({
  type: SET_REPO,
  payload: repo,
});

const addToBlacklist = (login: string): SettingsAction => ({
  type: ADD_TO_BLACKLIST,
  payload: login,
});

const removeFromBlacklist = (login: string): SettingsAction => ({
  type: REMOVE_FROM_BLACKLIST,
  payload: login,
});

const setCurrentLogin = (login: string): SettingsAction => ({
  type: SET_CURRENT_LOGIN,
  payload: login,
});

const settingsReducer = (
  state: Settings = initialSettings,
  action: SettingsAction
) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_REPO:
      return { ...state, repo: action.payload };
    case SET_CURRENT_LOGIN:
      return {
        ...state,
        blacklist: {
          ...state.blacklist,
          currentLogin: action.payload,
        },
      };
    case ADD_TO_BLACKLIST:
      return {
        ...state,
        blacklist: {
          ...state.blacklist,
          list: [...state.blacklist.list, action.payload],
        },
      };
    case REMOVE_FROM_BLACKLIST:
      return {
        ...state,
        blacklist: {
          ...state.blacklist,
          list: state.blacklist.list.filter(
            (login) => login !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export {
  setUser,
  setRepo,
  addToBlacklist,
  removeFromBlacklist,
  setCurrentLogin,
  settingsReducer,
};
