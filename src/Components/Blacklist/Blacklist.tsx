import { FormEvent, FunctionComponent, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  removeFromBlacklist,
  addToBlacklist,
  RootState,
  Action,
  SettingsAction,
} from '../../store';

import './Blacklist.less';

interface BlacklistProps {
  imgSrc: string;
}

const Blacklist: FunctionComponent<BlacklistProps> = ({ imgSrc }) => {
  const dispatch = useDispatch<Dispatch<Action | SettingsAction>>();

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const blacklist = useSelector((state: RootState) => state.settings.blacklist);

  const removeLogin = (login: string) => {
    dispatch(removeFromBlacklist(login));
  };

  const addLogin = (e: FormEvent) => {
    e.preventDefault();
    const login = inputRef.current?.value;

    if (login !== undefined && !blacklist.includes(login.toLowerCase())) {
      dispatch(addToBlacklist(login.toLowerCase()));
    }

    formRef.current?.reset();
  };

  return (
    <div className="blacklist">
      <form ref={formRef} className="blacklist__form" onSubmit={addLogin}>
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
          {blacklist.map((login) => (
            <li key={login} className="blacklist__list-element">
              <div className="blacklist__list-user">{login}</div>
              <button
                className="blacklist__button-remove"
                onClick={() => removeLogin(login)}
              ></button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Blacklist;
