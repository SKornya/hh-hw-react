import { FunctionComponent } from 'react';

interface BlacklistProps {
  imgSrc: string;
}

const Blacklist: FunctionComponent<BlacklistProps> = ({ imgSrc }) => {
  return (
    <div className="blacklist">
      <img src={imgSrc} alt="" />
      <button>Add login to blacklist</button>
    </div>
  );
};

export default Blacklist;
