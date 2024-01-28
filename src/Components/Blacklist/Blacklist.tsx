import { FormEvent, FunctionComponent, useContext, useRef } from 'react';
import { StorageContext } from '../../Context/StorageContext';

interface BlacklistProps {
  imgSrc: string;
}

const Blacklist: FunctionComponent<BlacklistProps> = ({ imgSrc }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const context = useContext(StorageContext);

  if (!context) {
    return null;
  }

  const { settings, setSettings, setDataToLocalStorage } = context;
  const { blacklist } = settings;

  const removeFromBlacklist = (user: string) => {
    const newBlacklist = blacklist.filter((login) => login !== user);
    const newSettings = { ...settings, blacklist: newBlacklist };

    setDataToLocalStorage(newSettings);
    setSettings(newSettings);
  };

  const addToBlacklist = (e: FormEvent) => {
    e.preventDefault();
    const login = inputRef.current?.value;

    if (login) {
      const newSettings = { ...settings, blacklist: [...blacklist, login] };
      setDataToLocalStorage(newSettings);
      setSettings(newSettings);
    }

    formRef.current?.reset();
  };

  return (
    <div>
      <form ref={formRef} className="blacklist" onSubmit={addToBlacklist}>
        <img src={imgSrc} alt="blacklist-logo" className="blacklist-logo" />
        <button>Add login to blacklist</button>
        <input ref={inputRef} />
      </form>

      {blacklist.length > 0 ? (
        <ul>
          {blacklist.map((user) => (
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
