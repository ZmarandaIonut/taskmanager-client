import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {ApiProvider} from "@reduxjs/toolkit/query/react";
import { Provider } from 'react-redux';
//import store from "./redux/store";
import store from "./state/store";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);
