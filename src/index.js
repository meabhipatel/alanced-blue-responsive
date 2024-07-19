import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';

const clientid="1068202922581-vp0qu9ronmrhnm7rajqb49djtu75ha4f.apps.googleusercontent.com";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={clientid}>
            <App/></GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
