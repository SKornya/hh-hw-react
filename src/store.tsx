import { combineReducers, createStore } from 'redux';

interface Settings {
  user: string;
  repo: string;
  blacklist: Array<string>;
  [key: string]: string | Array<string>;
}

type Status = string;

interface Action {
  type: string;
}

interface SettingsAction extends Action {
  payload: string;
}

const SETUSER = 'SETUSER';
const SETREPO = 'SETREPO';
const ADDTOBLACKLIST = 'ADDTOBLACKLIST';
const REMOVEFROMBLACKLIST = 'REMOVEFROMBLAKCLIST';

const LOADING = 'LOADING';
const LOADED = 'LOADED';
const ERROR = 'ERROR';
const FILLING = 'FILLING';

const initialSettings = {
  user: '',
  repo: '',
  blacklist: [],
};

const initialStatus = FILLING;

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

const setLoading = (): Action => ({
  type: LOADING,
});

const setLoaded = (): Action => ({
  type: LOADED,
});

const setError = (): Action => ({
  type: ERROR,
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
    case ADDTOBLACKLIST:
      return { ...state, blacklist: [...state.blacklist, action.payload] };
    case REMOVEFROMBLACKLIST:
      return {
        ...state,
        blacklist: state.blacklist.filter((login) => login !== action.payload),
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
    case ERROR:
      return action.type;
    default:
      return state;
  }
};

const reducer = combineReducers({
  settings: settingsReducer,
  status: statusReducer,
});

const store = createStore(reducer);

export default store;

export {
  setUser,
  setRepo,
  addToBlacklist,
  removeFromBlacklist,
  setLoading,
  setLoaded,
  setError,
  setFilling,
};
