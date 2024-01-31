import { combineReducers, Dispatch } from 'redux';

interface Settings {
  user: string;
  repo: string;
  blacklist: {
    list: Array<string>;
    currentLogin: string;
  };
}

interface Reviewer {
  data: {
    login: string;
    html_url: string;
  };
  loading: boolean;
}

interface Status {
  // status: string;
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

export interface PayloadAction {
  type: string;
  payload: string;
}

const SETUSER = 'SETUSER';
const SETREPO = 'SETREPO';
const ADDTOBLACKLIST = 'ADDTOBLACKLIST';
const REMOVEFROMBLACKLIST = 'REMOVEFROMBLAKCLIST';
const SETCURRENTLOGIN = 'SETCURRENTLOGIN';

// const LOADING = 'LOADING';
// const LOADED = 'LOADED';
const ERROR = 'ERROR';
// const FILLING = 'FILLING';
const SETLOADING = 'SETLOADING';

const SETREVIEWERLOGIN = 'SETREVIEWERLOGIN';
const SETREVIEWERURL = 'SETREVIEWERURL';

const initialSettings = {
  user: '',
  repo: '',
  blacklist: {
    list: [],
    currentLogin: '',
  },
};

const initialStatus = {
  // status: FILLING,
  error: {
    message: '',
    code: null,
  },
};

const initialReviewer = {
  data: {
    login: '',
    html_url: '',
  },
  loading: false,
};

const setUser = (user: string): PayloadAction => ({
  type: SETUSER,
  payload: user,
});

const setRepo = (repo: string): PayloadAction => ({
  type: SETREPO,
  payload: repo,
});

const addToBlacklist = (login: string): PayloadAction => ({
  type: ADDTOBLACKLIST,
  payload: login,
});

const removeFromBlacklist = (login: string): PayloadAction => ({
  type: REMOVEFROMBLACKLIST,
  payload: login,
});

const setCurrentLogin = (login: string): PayloadAction => ({
  type: SETCURRENTLOGIN,
  payload: login,
});

// const setLoading = (): Action => ({
//   type: LOADING,
// });

// const setLoaded = (): Action => ({
//   type: LOADED,
// });

// const setError = (error: { message?: string; code?: number }): Action => ({
//   type: ERROR,
//   payload: error,
// });

// const setFilling = (): Action => ({
//   type: FILLING,
// });

const setReviewerLogin = (login: string): PayloadAction => ({
  type: SETREVIEWERLOGIN,
  payload: login,
});

const setReviewerURL = (url: string): PayloadAction => ({
  type: SETREVIEWERURL,
  payload: url,
});

const settingsReducer = (
  state: Settings = initialSettings,
  action: PayloadAction
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
    // case FILLING:
    // case LOADING:
    // case LOADED:
    //   return { ...state, status: action.type };
    case ERROR:
      return {
        status: action.type,
        error: { ...state.error, ...action.payload },
      };
    default:
      return state;
  }
};

const reviewerReducer = (
  state: Reviewer = initialReviewer,
  action: PayloadAction
) => {
  switch (action.type) {
    case SETREVIEWERLOGIN:
      return { ...state, data: { ...state.data, login: action.payload } };
    case SETREVIEWERURL:
      return { ...state, data: { ...state.data, html_url: action.payload } };
    case SETLOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({
  settings: settingsReducer,
  status: statusReducer,
  reviewer: reviewerReducer,
});

const loadReviewer = () => async (dispatch: Dispatch, getState) => {
  const state = getState();

  const { reviewer, settings, status } = state;
  const { user, repo, blacklist } = settings;
  const { login, html_url } = reviewer;

  const ROOT_URL = 'https://api.github.com';

  dispatch(setLoading(true));

  const getData = async () => {
    try {
      const response = await fetch(
        `${ROOT_URL}/repos/${user}/${repo}/contributors`
      );

      if (!response.ok) {
        dispatch(
          setError({
            code: response.status,
          })
        );
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

  dispatch(setLoading());

  try {
    const data = (await getData()) as Array<Reviewer>;
    const mappedContributors: Array<Reviewer> = data.map((contributor) => ({
      login: contributor.login.toLowerCase(),
      html_url: contributor.html_url,
    }));
    dispatch(setLoaded());

    const filteredContributors = contributors.filter(
      (contributor) =>
        !blacklist.list.some((item) => item === contributor.login)
    );
    const randomIndex = Math.floor(Math.random() * filteredContributors.length);
    const reviewer = filteredContributors[randomIndex];
    setReviewer(reviewer);
  } catch (e) {
    if (e instanceof Error) {
      dispatch(
        setError({
          message: e.message,
        })
      );
    }
  }

  dispatch(setLoading(false));
};

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
  setReviewerLogin,
  setReviewerURL,
  reducer,
};
