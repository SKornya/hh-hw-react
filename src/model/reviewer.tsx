import { Dispatch } from 'redux';
import { RootState } from '../store';
import { SettingsAction } from './settings';
import { ErrorAction, setErrorCode, setErrorMessage } from './error';

interface Contributor {
  login: string;
  html_url: string;
}

interface Reviewer {
  data: Contributor | null;
  loading: boolean;
}

export interface ReviewerAction {
  type: string;
  payload: boolean | Contributor | null;
}

const SET_REVIEWER = 'SETREVIEWER';

const SET_LOADING = 'SETLOADING';

const initialReviewer: Reviewer = {
  data: null,
  loading: false,
};

const setReviewer = (reviewer: Contributor | null): ReviewerAction => ({
  type: SET_REVIEWER,
  payload: reviewer,
});

const setLoading = (loading: boolean): ReviewerAction => ({
  type: SET_LOADING,
  payload: loading,
});

const reviewerReducer = (
  state: Reviewer = initialReviewer,
  action: ReviewerAction
) => {
  switch (action.type) {
    case SET_REVIEWER:
      if (typeof action.payload !== 'boolean') {
        return { ...state, data: action.payload };
      }
      return state;
    case SET_LOADING:
      if (typeof action.payload === 'boolean') {
        return { ...state, loading: action.payload };
      }
      return state;
    default:
      return state;
  }
};

const loadReviewer =
  () =>
  async (
    dispatch: Dispatch<ReviewerAction | SettingsAction | ErrorAction>,
    getState: () => RootState
  ) => {
    dispatch(setLoading(true));
    dispatch(setReviewer(null));
    dispatch(setErrorMessage(null));
    dispatch(setErrorCode(null));

    const state = getState();

    const { settings } = state;
    const { user, repo, blacklist } = settings;

    const ROOT_URL = 'https://api.github.com';
    const DATA_NOT_FOUND_ERROR_CODE = -1;
    const DATA_NOT_FOUND_ERROR_MESSAGE = 'Reviewer not found';

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

      const filteredContributors = mappedContributors.filter(
        (contributor) =>
          !blacklist.list.some((item) => item === contributor.login)
      );
      const randomIndex = Math.floor(
        Math.random() * filteredContributors.length
      );
      const reviewer = filteredContributors[randomIndex];

      if (reviewer) {
        dispatch(setReviewer(reviewer));
      } else {
        dispatch(setErrorCode(DATA_NOT_FOUND_ERROR_CODE));
        dispatch(setErrorMessage(DATA_NOT_FOUND_ERROR_MESSAGE));
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setErrorMessage(e.message));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

export { setLoading, loadReviewer, reviewerReducer };
