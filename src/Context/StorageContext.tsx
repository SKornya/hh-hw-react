import { useState, createContext, ReactNode } from 'react';

export interface Settings {
  user: string;
  repo: string;
  blacklist: Array<string>;
  [key: string]: string | Array<string>;
}

const defaultSettings: Settings = {
  user: '',
  repo: '',
  blacklist: [],
};

export interface StorageContextValue {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  setDataToLocalStorage: (value: Settings) => void;
}

const getDataFromLocalStorage = (): Settings => {
  try {
    const localStorageData: string | null = localStorage.getItem('settings');

    if (localStorageData !== null) {
      const data = JSON.parse(localStorageData) as Settings;
      return data;
    }
  } catch (e) {
    return defaultSettings;
  }
  return defaultSettings;
};

const setDataToLocalStorage = (value: Settings): void => {
  try {
    localStorage.setItem('settings', JSON.stringify(value));
  } catch (e) {
    localStorage.clear();
    localStorage.setItem('settings', JSON.stringify(value));
  }
};

export const StorageContext = createContext<StorageContextValue | null>(null);

export default ({ children }: { children: ReactNode }) => {
  const currentSettings = getDataFromLocalStorage();
  const [settings, setSettings] = useState<Settings>(currentSettings);

  return (
    <StorageContext.Provider
      value={{ settings, setSettings, setDataToLocalStorage }}
    >
      {children}
    </StorageContext.Provider>
  );
};
