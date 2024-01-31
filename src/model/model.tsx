import { combineReducers, Dispatch } from 'redux';
import { RootState } from '../store';

interface Settings {
  user: string;
  repo: string;
  blacklist: {
    list: Array<string>;
    currentLogin: string;
  };
}

interface Contributor {
  login: string;
  html_url: string;
}

interface Reviewer {
  data: Contributor;
  loading: string;
}

interface Error {
  message: string;
  code: number | null;
}

export interface ErrorAction {
  type: string;
  payload?: string | number;
}

export interface ReviewerAction {
  type: string;
  payload: string;
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

const SETERRORMESSAGE = 'SETERRORMESSAGE';
const SETERRORCODE = 'SETERRORCODE';

const SETREVIEWERLOGIN = 'SETREVIEWERLOGIN';
const SETREVIEWERURL = 'SETREVIEWERURL';
const SETLOADING = 'SETLOADING';

const initialSettings: Settings = {
  user: '',
  repo: '',
  blacklist: {
    list: [],
    currentLogin: '',
  },
};

const initialError: Error = {
  message: '',
  code: null,
};

const initialReviewer: Reviewer = {
  data: {
    login: '',
    html_url: '',
  },
  loading: 'filling',
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

const setErrorMessage = (message: string): ErrorAction => ({
  type: SETERRORMESSAGE,
  payload: message,
});

const setErrorCode = (code: number): ErrorAction => ({
  type: SETERRORCODE,
  payload: code,
});

const setReviewerLogin = (login: string): ReviewerAction => ({
  type: SETREVIEWERLOGIN,
  payload: login,
});

const setReviewerURL = (url: string): ReviewerAction => ({
  type: SETREVIEWERURL,
  payload: url,
});

const setLoading = (loading: string): ReviewerAction => ({
  type: SETLOADING,
  payload: loading,
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

const errorReducer = (state: Error = initialError, action: ErrorAction) => {
  switch (action.type) {
    case SETERRORMESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SETERRORCODE:
      return {
        ...state,
        code: action.payload,
      };
    default:
      return state;
  }
};

const reviewerReducer = (
  state: Reviewer = initialReviewer,
  action: ReviewerAction
) => {
  switch (action.type) {
    case SETREVIEWERURL:
      return { ...state, data: { ...state.data, html_url: action.payload } };
    case SETREVIEWERLOGIN:
      return { ...state, data: { ...state.data, login: action.payload } };
    case SETLOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({
  reviewer: reviewerReducer,
  settings: settingsReducer,
  error: errorReducer,
});

const loadReviewer =
  () =>
  async (
    dispatch: Dispatch<ReviewerAction | SettingsAction | ErrorAction>, // Поменяйте на тип any, если вы хотите использовать любые действия
    getState: () => RootState
  ) => {
    dispatch(setLoading('loading'));
    dispatch(setReviewerLogin(''));

    const state = getState();

    const { settings } = state;
    const { user, repo, blacklist } = settings;

    const ROOT_URL = 'https://api.github.com';

    const getData = async () => {
      try {
        const response = await fetch(
          `${ROOT_URL}/repos/${user}/${repo}/contributors`
        );

        if (!response.ok) {
          dispatch(setErrorCode(response.status));
          if (response.status === 404) {
            throw Error('Not Found! Check user or repo settings.');
          }
          throw Error('Error occurs!');
        }

        return response.json();
      } catch (e) {
        throw e;
      }
    };

    try {
      const data = (await getData()) as Array<Contributor>;
      const mappedContributors: Array<Contributor> = data.map(
        (contributor) => ({
          login: contributor.login.toLowerCase(),
          html_url: contributor.html_url,
        })
      );
      dispatch(setLoading('loaded'));

      const filteredContributors = mappedContributors.filter(
        (contributor) =>
          !blacklist.list.some((item) => item === contributor.login)
      );
      const randomIndex = Math.floor(
        Math.random() * filteredContributors.length
      );
      const reviewer = filteredContributors[randomIndex];

      if (reviewer) {
        dispatch(setReviewerLogin(reviewer.login));
        dispatch(setReviewerURL(reviewer.html_url));
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setErrorMessage(e.message));
        dispatch(setLoading('error'));
      }
    }
  };

export {
  setUser,
  setRepo,
  addToBlacklist,
  removeFromBlacklist,
  setCurrentLogin,
  setReviewerLogin,
  setReviewerURL,
  setLoading,
  setErrorMessage,
  setErrorCode,
  loadReviewer,
  reducer,
};
