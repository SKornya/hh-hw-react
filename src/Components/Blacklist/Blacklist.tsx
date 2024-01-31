import { FormEvent, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  removeFromBlacklist,
  addToBlacklist,
  RootState,
  Action,
  SettingsAction,
  setCurrentLogin,
} from '../../store';

import './Blacklist.less';
import Input from '../Input/Input';

interface BlacklistProps {
  imgSrc: string;
}

const Blacklist: FunctionComponent<BlacklistProps> = ({ imgSrc }) => {
  const dispatch = useDispatch<Dispatch<Action | SettingsAction>>();

  const blacklist = useSelector(
    (state: RootState) => state.settings.blacklist.list
  );
  const currentLogin = useSelector(
    (state: RootState) => state.settings.blacklist.currentLogin
  );

  const handleCurrentLoginChange = (value: string): void => {
    dispatch(setCurrentLogin(value));
  };

  const removeLogin = (login: string) => {
    dispatch(removeFromBlacklist(login));
  };

  const addLogin = (e: FormEvent) => {
    e.preventDefault();
    const trimmedLogin = currentLogin.trim();
    if (
      trimmedLogin !== '' &&
      !blacklist.includes(trimmedLogin.toLowerCase())
    ) {
      dispatch(addToBlacklist(trimmedLogin.toLowerCase()));
    }
    dispatch(setCurrentLogin(''));
  };

  return (
    <div className="blacklist-container">
      <form className="blacklist-container__form" onSubmit={addLogin}>
        <Input
          imgSrc={imgSrc}
          type="blacklist"
          value={currentLogin}
          placeholder="add login to blacklist"
          onChange={handleCurrentLoginChange}
        />
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
