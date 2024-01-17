import { useState } from 'react';

import Settings from './Components/Seettings/Settings';

import './App.less';
import settingsIcon from './assets/settings_icon.svg';

const App = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="settings">
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
      {show && <Settings />}
    </>
  );
};

export default App;
