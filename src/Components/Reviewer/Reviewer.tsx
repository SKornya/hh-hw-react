import { FunctionComponent, useContext, useState } from 'react';

import { StorageContext } from '../../Context/StorageContext';

import './Reviewer.less';

interface Contributor {
  login: string;
  html_url: string;
}

const ROOT_URL = 'https://api.github.com';

const Reviewer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [reviewer, setReviewer] = useState<Contributor | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const context = useContext(StorageContext);

  if (!context) {
    return null;
  }

  const { settings } = context;
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
    setIsLoaded(false);
    setIsLoading(true);

    const getData = async () => {
      setErrorMessage(null);
      setErrorStatus(null);

      try {
        const response = await fetch(
          `${ROOT_URL}/repos/${user}/${repo}/contributors`
        );

        if (!response.ok) {
          setErrorStatus(response.status);
          if (response.status === 404) {
            throw Error('Not Found! Check user or repo settings.');
          }
          throw Error('Error occurs!');
        }

        setIsLoading(false);
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
      setIsLoaded(true);

      getRandomReviewer(mappedContributors);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="content">
      {isLoading && <div className="spinner"></div>}

      {!isLoading && user && repo && (
        <button
          className="button content__button"
          disabled={isLoading || !user || !repo}
          onClick={searchContributor}
        >
          Search reviewer for {user}!
        </button>
      )}

      {(!user || !repo) && !errorMessage && (
        <div className="content__initial">Fill settings to start use app</div>
      )}

      {errorMessage && (
        <div className="content__error">
          Oops! {errorMessage} Error status is {errorStatus}
        </div>
      )}

      {isLoaded && user && repo && (
        <div className="content__contributor">
          {reviewer ? (
            <>
              Your reviewer
              <a
                href={reviewer?.html_url}
                className="content__contributor-link"
                target="_blank"
              >
                {reviewer?.login}
              </a>
            </>
          ) : (
            <>There is no contributors for this user or repository</>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviewer;
