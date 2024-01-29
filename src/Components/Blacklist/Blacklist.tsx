import { FormEvent, FunctionComponent, useContext, useRef } from 'react';
import { StorageContext } from '../../Context/StorageContext';

import './Blacklist.less';

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

    if (login && !blacklist.includes(login.toLowerCase())) {
      const newSettings = {
        ...settings,
        blacklist: [...blacklist, login.toLowerCase()],
      };
      setDataToLocalStorage(newSettings);
      setSettings(newSettings);
    }

    formRef.current?.reset();
  };

  return (
    <div className="blacklist">
      <form ref={formRef} className="blacklist__form" onSubmit={addToBlacklist}>
        <div className="blacklist__form-container">
          <label htmlFor="blacklist__input" className="blacklist__label">
            <img src={imgSrc} alt="blacklist-logo" className="blacklist-logo" />
          </label>
          <input
            ref={inputRef}
            placeholder="add login to blacklist"
            id="blacklist__input"
            className="blacklist__input"
          />
        </div>
        <button className="blacklist__button"></button>
      </form>

      {blacklist.length > 0 ? (
        <ul className="blacklist__list">
          {blacklist.map((user) => (
            <li key={user} className="blacklist__list-element">
              <div className="blacklist__list-user">{user}</div>
              <button
                className="blacklist__button-remove"
                onClick={() => removeFromBlacklist(user)}
              ></button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Blacklist;
