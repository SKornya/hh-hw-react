import { FormEvent, FunctionComponent, useRef } from 'react';

import useLocalStorage, { Settings } from '../../hooks/useLocalStorage';

interface BlacklistProps {
  imgSrc: string;
}

const Blacklist: FunctionComponent<BlacklistProps> = ({ imgSrc }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [settings, setSettings] = useLocalStorage() as [
    Settings,
    React.Dispatch<React.SetStateAction<Settings>>
  ];

  const removeFromBlacklist = (user: string) => {
    const { blacklist } = settings;
    const newBlacklist = blacklist.filter((login) => login !== user);
    const newSettings = { ...settings, blacklist: newBlacklist };

    setSettings(newSettings);
  };

  const addToBlacklist = (e: FormEvent) => {
    e.preventDefault();
    const login = inputRef.current?.value;
    const { blacklist } = settings;

    if (login) {
      const newSettings = { ...settings, blacklist: [...blacklist, login] };
      setSettings(newSettings);
    }

    formRef.current?.reset();
  };

  return (
    <div>
      <form ref={formRef} className="blacklist" onSubmit={addToBlacklist}>
        <img src={imgSrc} alt="" />
        <button>Add login to blacklist</button>
        <input ref={inputRef} />
      </form>

      {settings.blacklist.length > 0 ? (
        <ul>
          {settings.blacklist.map((user) => (
            <li key={user}>
              <span>{user}</span>
              <button onClick={() => removeFromBlacklist(user)}>remove</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Blacklist;
