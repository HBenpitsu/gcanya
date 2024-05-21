import '../global.css';
import './popup.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { proxyStore } from '../../app/proxyStore';
import { PopUp } from '../../app/features/popup';

proxyStore.ready().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={proxyStore}>
        {' '}
        <PopUp />{' '}
      </Provider>
    </React.StrictMode>
  );
});
