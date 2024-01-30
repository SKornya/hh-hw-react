import { FunctionComponent, useState } from 'react';
import store, {
  setError,
  // setFilling,
  setLoaded,
  setLoading,
} from '../../store';

import './Reviewer.less';

interface Contributor {
  login: string;
  html_url: string;
}

const ROOT_URL = 'https://api.github.com';

const Reviewer: FunctionComponent = () => {
  const [reviewer, setReviewer] = useState<Contributor | null>(null);

  const state = store.getState();
  const { settings, status } = state;
  const { user, repo, blacklist } = settings;

  const getRandomReviewer = (contributors: Array<Contributor>) => {
    const filteredContributors = contributors.filter(
      (contributor) => !blacklist.some((item) => item === contributor.login)
    );
    const randomIndex = Math.floor(Math.random() * filteredContributors.length);
    const reviewer = filteredContributors[randomIndex];
    setReviewer(reviewer);
  };

  const searchContributor = async (): Promise<void> => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${ROOT_URL}/repos/${user}/${repo}/contributors`
        );

        if (!response.ok) {
          store.dispatch(
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

    store.dispatch(setLoading());

    try {
      const data = (await getData()) as Array<Contributor>;
      const mappedContributors: Array<Contributor> = data.map(
        (contributor) => ({
          login: contributor.login.toLowerCase(),
          html_url: contributor.html_url,
        })
      );
      store.dispatch(setLoaded());

      getRandomReviewer(mappedContributors);
    } catch (e) {
      if (e instanceof Error) {
        store.dispatch(
          setError({
            message: e.message,
          })
        );
      }
    }
  };

  return (
    <div className="content">
      <button
        className="button content__button"
        disabled={!user || !repo}
        onClick={searchContributor}
      >
        {user && repo
          ? 'Search reviewer'
          : 'Fill user and repo fileds in settings'}
      </button>

      {status.status === 'LOADING' && <div className="spinner"></div>}

      {status.status === 'LOADED' && (
        <div className="content__contributor">
          {reviewer ? (
            <>
              Your reviewer
              <a
                href={reviewer.html_url}
                className="content__contributor-link"
                target="_blank"
              >
                {reviewer.login}
              </a>
            </>
          ) : (
            <>There is no contributors for this user or repository</>
          )}
        </div>
      )}

      {status.status === 'ERROR' && (
        <div className="content__error">
          Oops! {status.error.code} Error status is {status.error.message}
        </div>
      )}
    </div>
  );
};

export default Reviewer;
