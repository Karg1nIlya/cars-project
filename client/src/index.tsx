import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../store/store';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
