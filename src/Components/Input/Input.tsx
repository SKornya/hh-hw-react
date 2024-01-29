import { FunctionComponent, useRef, useState } from 'react';
import store, { setRepo, setUser } from '../../store';
// import { StorageContext, Settings } from '../../Context/StorageContext';

import './Input.less';

interface InputProps {
  inputType: string;
  imgSrc: string;
}

const Input: FunctionComponent<InputProps> = ({ inputType, imgSrc }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const settings = store.getState().settings;
  const [inputValue, setInputValue] = useState(settings[inputType] as string);

  const setUserSetting = () => {
    const value = inputRef.current?.value;

    if (value !== undefined) {
      setInputValue(value);

      if (inputType === 'user') {
        store.dispatch(setUser(value));
      } else if (inputType === 'repo') {
        store.dispatch(setRepo(value));
      }
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
        placeholder={inputType}
        onChange={setUserSetting}
        className={`${inputType}__input`}
        value={inputValue}
      />
    </div>
  );
};

export default Input;
