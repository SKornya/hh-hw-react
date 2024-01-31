import { combineReducers, createStore } from 'redux';

interface Settings {
  user: string;
  repo: string;
  blacklist: {
    list: Array<string>;
    currentLogin: string;
  };
  // [key: string]: string | { blacklist: Array<string>; currentLogin: string };
}

interface Status {
  status: string;
  error: {
    message: string;
    code: number | null;
  };
}

export interface Action {
  type: string;
  payload?: {
    message?: string;
    code?: number;
  };
}

export interface SettingsAction {
  type: string;
  payload: string;
}

const SETUSER = 'SETUSER';
const SETREPO = 'SETREPO';
const ADDTOBLACKLIST = 'ADDTOBLACKLIST';
const REMOVEFROMBLACKLIST = 'REMOVEFROMBLAKCLIST';
const SETCURRENTLOGIN = 'SETCURRENTLOGIN';

const LOADING = 'LOADING';
const LOADED = 'LOADED';
const ERROR = 'ERROR';
const FILLING = 'FILLING';

const initialSettings = {
  user: '',
  repo: '',
  blacklist: {
    list: [],
    currentLogin: '',
  },
};

const initialStatus = {
  status: FILLING,
  error: {
    message: '',
    code: null,
  },
};

const setUser = (user: string): SettingsAction => ({
  type: SETUSER,
  payload: user,
});

const setRepo = (repo: string): SettingsAction => ({
  type: SETREPO,
  payload: repo,
});

const addToBlacklist = (login: string): SettingsAction => ({
  type: ADDTOBLACKLIST,
  payload: login,
});

const removeFromBlacklist = (login: string): SettingsAction => ({
  type: REMOVEFROMBLACKLIST,
  payload: login,
});

const setCurrentLogin = (login: string): SettingsAction => ({
  type: SETCURRENTLOGIN,
  payload: login,
});

const setLoading = (): Action => ({
  type: LOADING,
});

const setLoaded = (): Action => ({
  type: LOADED,
});

const setError = (error: { message?: string; code?: number }): Action => ({
  type: ERROR,
  payload: error,
});

const setFilling = (): Action => ({
  type: FILLING,
});

const settingsReducer = (
  state: Settings = initialSettings,
  action: SettingsAction
) => {
  switch (action.type) {
    case SETUSER:
      return { ...state, user: action.payload };
    case SETREPO:
      return { ...state, repo: action.payload };
    case SETCURRENTLOGIN:
      return {
        ...state,
        blacklist: {
          ...state.blacklist,
          currentLogin: action.payload,
        },
      };
    case ADDTOBLACKLIST:
      return {
        ...state,
        blacklist: {
          ...state.blacklist,
          list: [...state.blacklist.list, action.payload],
        },
      };
    case REMOVEFROMBLACKLIST:
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

const statusReducer = (state: Status = initialStatus, action: Action) => {
  switch (action.type) {
    case FILLING:
    case LOADING:
    case LOADED:
      return { ...state, status: action.type };
    case ERROR:
      return {
        status: action.type,
        error: { ...state.error, ...action.payload },
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  settings: settingsReducer,
  status: statusReducer,
});

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;

export {
  setUser,
  setRepo,
  addToBlacklist,
  removeFromBlacklist,
  setCurrentLogin,
  setLoading,
  setLoaded,
  setError,
  setFilling,
};
