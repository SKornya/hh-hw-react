import { useEffect, useState } from 'react';

export interface Settings {
  user: string;
  repo: string;
  blacklist: Array<string>;
}

const defaultSettings: Settings = {
  user: '',
  repo: '',
  blacklist: [],
};

const useLocalStorage = () => {
  const [value, setValue] = useState<Settings>(() => {
    try {
      const localStorageData: string | null = localStorage.getItem('settings');

      if (localStorageData !== null) {
        const data = JSON.parse(localStorageData) as Settings;
        // console.log(data);
        return data;
      }
      // return typeof data === Settings ? data : null;
    } catch (e) {
      return defaultSettings;
    }
    return defaultSettings;
  });
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
