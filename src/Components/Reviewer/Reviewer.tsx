import { FunctionComponent } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  ErrorAction,
  loadReviewer,
  ReviewerAction,
  SettingsAction,
} from '../../model/model';
import { RootState } from '../../store';

import './Reviewer.less';

const Reviewer: FunctionComponent = () => {
  const dispatch =
    useDispatch<Dispatch<ReviewerAction | SettingsAction | ErrorAction>>();

  const reviewer = useSelector((state: RootState) => state.reviewer);
  const { data, loading } = reviewer;

  const settings = useSelector((state: RootState) => state.settings);
  const { user, repo } = settings;

  const error = useSelector((state: RootState) => state.error);
  const { message, code } = error;

  return (
    <div className="content">
      <button
        className="button content__button"
        disabled={!user || !repo || loading === 'loading'}
        onClick={() => dispatch(loadReviewer())}
      >
        {user && repo
          ? 'Search reviewer'
          : 'Fill user and repo fileds in settings'}
      </button>

      {loading === 'loading' && <div className="spinner"></div>}

      {loading === 'loaded' && (
        <div className="content__contributor">
          {reviewer.data.login ? (
            <>
              Your reviewer
              <a
                href={data.html_url}
                className="content__contributor-link"
                target="_blank"
              >
                {data.login}
              </a>
            </>
          ) : (
            <>There is no contributors for this user or repository</>
          )}
        </div>
      )}

      {message && code && loading === 'error' && (
        <div className="content__error">
          Oops! {message} Error status is {code}
        </div>
      )}
    </div>
  );
};

export default Reviewer;
