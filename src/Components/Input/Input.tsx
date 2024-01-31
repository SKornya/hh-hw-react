import React, { FunctionComponent } from 'react';

import './Input.less';

interface InputProps {
  value: string;
  imgSrc: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Input: FunctionComponent<InputProps> = ({
  value,
  imgSrc,
  type,
  placeholder,
  onChange,
}) => {
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onChange(event.target.value);
  };

  return (
    <div className={type}>
      <label htmlFor={type} className={`${type}__label`}>
        <img src={imgSrc} alt={type} className="input-logo" />
      </label>
      <input
        id={type}
        placeholder={placeholder}
        onChange={onChangeHandler}
        className={`${type}__input`}
        value={value}
      />
    </div>
  );
};

export default Input;
