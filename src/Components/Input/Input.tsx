import { FunctionComponent, useContext, useRef, useState } from 'react';

import { StorageContext, Settings } from '../../Context/StorageContext';

import './Input.less';

// import debounce from '../../debounce';

interface InputProps {
  inputType: string;
  imgSrc: string;
}

const Input: FunctionComponent<InputProps> = ({ inputType, imgSrc }) => {
  const context = useContext(StorageContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(() => {
    if (context) {
      return `${context.settings[inputType] as string}`;
    }
    return '';
  });

  if (!context) {
    return null;
  }

  const { settings, setSettings, setDataToLocalStorage } = context;

  const setUserSetting = () => {
    const value = inputRef.current?.value;

    if (value) {
      setInputValue(value);

      const newSettings: Settings = {
        ...settings,
        [inputType]: value,
      };

      setDataToLocalStorage(newSettings);
      setSettings(newSettings);
    }
  };

  return (
    <div className={inputType}>
      <label htmlFor={inputType}>
        <img src={imgSrc} alt="" />
      </label>
      <input
        id={inputType}
        ref={inputRef}
        onChange={setUserSetting}
        className={`${inputType}__input`}
        value={inputValue}
      />
    </div>
  );
};

export default Input;
