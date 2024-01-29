import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.less';

import StorageProvider from './Context/StorageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StorageProvider>
      <App />
    </StorageProvider>
  </React.StrictMode>
);
