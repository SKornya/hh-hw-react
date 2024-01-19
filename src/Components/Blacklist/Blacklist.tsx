import { FormEvent, FunctionComponent, useLayoutEffect, useRef } from 'react';
import useLocalStorage, { Settings } from '../../hooks/useLocalStorage';

interface BlacklistProps {
  imgSrc: string;
}

const Blacklist: FunctionComponent<BlacklistProps> = ({ imgSrc }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [settings, setSettings] = useLocalStorage('settings') as [
    Settings,
    React.Dispatch<React.SetStateAction<Settings>>
  ];

  // useLayoutEffect(() => {
  //   if (inputRef.current) {
  //     console.log(inputRef.current);
  //   }
  // }, []);

  const addToBlacklist = (e: FormEvent) => {
    e.preventDefault();
    const login = inputRef.current?.value;
    const { blacklist } = settings;

    if (login) {
      blacklist.push(login);
    }

    console.log(settings);

    setSettings(settings);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef} className="blacklist" onSubmit={addToBlacklist}>
      <img src={imgSrc} alt="" />
      <button>Add login to blacklist</button>
      <input ref={inputRef} />
    </form>
  );
};

export default Blacklist;
