import { FunctionComponent, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Action, setRepo, PayloadAction, setUser } from '../../model/model';
import { RootState } from '../../store';

import Blacklist from '../Blacklist/Blacklist';
import Input from '../Input/Input';
import SettingsLogo from '../SettingsLogo/SettingsLogo';

import './Settings.less';

import userIcon from '../../assets/user_icon.svg';
import repoIcon from '../../assets/repo_icon.svg';
import blacklistIcon from '../../assets/blacklist_icon.svg';

const Settings: FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useDispatch<Dispatch<Action | PayloadAction>>();

  const user = useSelector((state: RootState) => state.settings.user);
  const repo = useSelector((state: RootState) => state.settings.repo);

  const handleUserChange = (value: string): void => {
    dispatch(setUser(value));
  };

  const handleRepoChange = (value: string): void => {
    dispatch(setRepo(value));
  };

  return (
    <div className="settings">
      <div className="header">
        <h1 className="header-heading">Reviewer search</h1>
        <SettingsLogo show={show} setShow={setShow} />
      </div>

      {show && (
        <div className="settings-container">
          <Input
            value={user}
            type="user"
            onChange={handleUserChange}
            imgSrc={userIcon}
            placeholder="fill the user field"
          />
          <Input
            value={repo}
            type="repo"
            onChange={handleRepoChange}
            imgSrc={repoIcon}
            placeholder="field the repo field"
          />
          <Blacklist imgSrc={blacklistIcon} />
        </div>
      )}
    </div>
  );
};

export default Settings;
