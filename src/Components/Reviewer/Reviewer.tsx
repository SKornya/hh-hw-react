import { FunctionComponent, useContext, useState } from 'react';

import { StorageContext } from '../../Context/StorageContext';

import './Reviewer.less';
// import useLocalStorage, { Settings } from '../../hooks/useLocalStorage';

interface Contributor {
  login: string;
  html_url: string;
}

// interface Reviewer extends Contributor {
//   link: string;
// }

const ROOT_URL = 'https://api.github.com';

const Reviewer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const [contributors, setContributors] = useState<Array<Contributor>>([]);
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
          login: contributor.login,
          html_url: contributor.html_url,
        })
      );
      // setContributors(mappedContributors);
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

      {!isLoading && user && (
        <button disabled={isLoading || !user} onClick={searchContributor}>
          Search reviewer for {user}!
        </button>
      )}

      {!user && !errorMessage && <div>Fill settings to start use app</div>}

      {errorMessage && (
        <div>
          Oops! {errorMessage} Error status is {errorStatus}
        </div>
      )}

      {isLoaded && (
        <div className="content__contributors">
          Your reviewer is{' '}
          <a
            href={reviewer?.html_url}
            className="content__contributors-link"
            target="_blank"
          >
            {reviewer?.login}
          </a>
        </div>
      )}
    </div>
  );
};

export default Reviewer;
