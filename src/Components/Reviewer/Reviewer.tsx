import { FunctionComponent, useEffect, useRef, useState } from 'react';

import useLocalStorage, { Settings } from '../../hooks/useLocalStorage';

// interface ReviewerProps {
//   inputType: string;
//   imgSrc: string;
// }

const rootURL = 'https://api.github.com';

const Reviewer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contributors, setContributors] = useState<Array<string>>([]);

  const [settings, setSettings] = useLocalStorage() as [
    Settings,
    React.Dispatch<React.SetStateAction<Settings>>
  ];

  const { user, repo, blacklist } = settings;

  const searchUser = async () => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${rootURL}/repos/${user}/${repo}/contributors`
        );
        setIsLoading(false);
        return response.json();
      } catch (e) {
        console.log(e);
        return 'error';
      }
    };

    const data = await getData();
    console.log(data.map((contributor) => contributor.login));
  };

  return isLoading ? (
    <span>Spinner</span>
  ) : user ? (
    <button disabled={isLoading} onClick={searchUser}>
      Search reviewer for {user}!
    </button>
  ) : (
    <div>Fill settings to start use app</div>
  );
};

export default Reviewer;
