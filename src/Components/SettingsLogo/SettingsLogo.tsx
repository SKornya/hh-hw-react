import { FunctionComponent } from 'react';

import './SettingsLogo.less';

import settingsIcon from '../../assets/settings_icon.svg';

interface SettingsLogoProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsLogo: FunctionComponent<SettingsLogoProps> = ({
  show,
  setShow,
}) => {
  return (
    <div className="settings-logo">
      <input type="checkbox" id="settings" className="settings__checkbox" />
      <label htmlFor="settings" className="settings__label">
        <img
          src={settingsIcon}
          alt="settings"
          className="logo"
          onClick={() => setShow(!show)}
        />
      </label>
    </div>
  );
};

export default SettingsLogo;
