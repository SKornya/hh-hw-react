import { useEffect, useState } from 'react';

export interface Settings {
  login: string;
  repo: string;
  blacklist: Array<string>;
}

const defaultSettings: Settings = {
  login: '',
  repo: '',
  blacklist: [],
};

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<Settings>(() => {
    try {
      const localStorageData: string | null = localStorage.getItem(key);

      if (localStorageData !== null) {
        const data = JSON.parse(localStorageData) as Settings;
        // console.log(data);
        return data;
      }
      // return typeof data === Settings ? data : null;
    } catch (e) {
      // console.log(e);
    }
    return defaultSettings;
  });
  console.log(value);
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value]
  );

  return [value, setValue];
};

export default useLocalStorage;
