import Blacklist from '../Blacklist/Blacklist';
import Input from '../Input/Input';

import userIcon from '../../assets/user_icon.svg';
import repoIcon from '../../assets/repo_icon.svg';
import blacklistIcon from '../../assets/blacklist_icon.svg';

const Settings = () => {
  return (
    <div className="settings-container">
      <Input inputType="user" imgSrc={userIcon} />
      <Input inputType="repo" imgSrc={repoIcon} />
      <Blacklist imgSrc={blacklistIcon} />
    </div>
  );
};

export default Settings;
