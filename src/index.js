import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {ApiProvider} from "@reduxjs/toolkit/query/react";
import { apiSlice } from './api/apiSlice';
import { Provider } from 'react-redux';
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider  api={apiSlice} store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);
