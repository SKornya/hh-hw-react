import { FunctionComponent } from 'react';

interface InputProps {
  classname: string;
  imgSrc: string;
}

const Input: FunctionComponent<InputProps> = ({ classname, imgSrc }) => {
  return (
    <div className={classname}>
      <img src={imgSrc} alt="" />
      <input className={`${classname}__input`} />
    </div>
  );
};

export default Input;
