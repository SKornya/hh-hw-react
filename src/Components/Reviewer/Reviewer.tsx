import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { loadReviewer } from '../../model/reviewer';
import { RootState, useAppDispatch } from '../../store';

import './Reviewer.less';

const Reviewer: FunctionComponent = () => {
  const dispatch = useAppDispatch();

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
        disabled={!user || !repo || loading}
        onClick={() => dispatch(loadReviewer())}
      >
        {user && repo
          ? 'Search reviewer'
          : 'Fill user and repo fileds in settings'}
      </button>

      {loading && <div className="spinner"></div>}

      {data && (
        <div className="content__contributor">
          <>
            Your reviewer
            <a
              href={data.htmlUrl}
              className="content__contributor-link"
              target="_blank"
            >
              {data.login}
            </a>
          </>
        </div>
      )}

      {code && (
        <div className="content__error">
          Oops! {message} Error status is {code}
        </div>
      )}
    </div>
  );
};

export default Reviewer;
