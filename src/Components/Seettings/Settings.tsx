import { FunctionComponent, useState } from 'react';

import Blacklist from '../Blacklist/Blacklist';
import Input from '../Input/Input';
import SettingsLogo from '../SettingsLogo/SettingsLogo';

import './Settings.less';

import userIcon from '../../assets/user_icon.svg';
import repoIcon from '../../assets/repo_icon.svg';
import blacklistIcon from '../../assets/blacklist_icon.svg';

const Settings: FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="settings">
      <div className="header">
        <h1 className="header-heading">Reviewer search</h1>
        <SettingsLogo show={show} setShow={setShow} />
      </div>

      {show && (
        <div className="settings-container">
          <Input inputType="user" imgSrc={userIcon} />
          <Input inputType="repo" imgSrc={repoIcon} />
          <Blacklist imgSrc={blacklistIcon} />
        </div>
      )}
    </div>
  );
};

export default Settings;
