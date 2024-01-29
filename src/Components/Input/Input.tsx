import { FunctionComponent, useContext, useRef, useState } from 'react';

import { StorageContext, Settings } from '../../Context/StorageContext';

import './Input.less';

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

    if (value !== undefined) {
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
      <label htmlFor={inputType} className={`${inputType}__label`}>
        <img src={imgSrc} alt={inputType} className="input-logo" />
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
