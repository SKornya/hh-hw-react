import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './index.less';

import store from './store';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
