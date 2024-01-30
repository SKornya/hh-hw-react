import { FunctionComponent, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  RootState,
  Action,
  SettingsAction,
  setFilling,
  setUser,
  setRepo,
} from '../../store';

import './Input.less';

interface InputProps {
  inputType: string;
  imgSrc: string;
}

const Input: FunctionComponent<InputProps> = ({ inputType, imgSrc }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch<Action | SettingsAction>>();
  const settings = useSelector((state: RootState) => state.settings);
  const [inputValue, setInputValue] = useState(settings[inputType] as string);

  const setUserSetting = () => {
    dispatch(setFilling());

    const value = inputRef.current?.value;

    if (value !== undefined) {
      setInputValue(value);

      if (inputType === 'user') {
        dispatch(setUser(value));
      } else if (inputType === 'repo') {
        dispatch(setRepo(value));
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
