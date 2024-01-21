import { FunctionComponent, useRef } from 'react';

import useLocalStorage, { Settings } from '../../hooks/useLocalStorage';

interface InputProps {
  inputType: string;
  imgSrc: string;
}

const Input: FunctionComponent<InputProps> = ({ inputType, imgSrc }) => {
  const [settings, setSettings] = useLocalStorage() as [
    Settings,
    React.Dispatch<React.SetStateAction<Settings>>
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  const setUserSetting = () => {
    const value = inputRef.current?.value;

    if (value) {
      setSettings({ ...settings, [inputType]: value });
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
        value={`${settings[inputType]}`}
      />
    </div>
  );
};

export default Input;
