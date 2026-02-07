import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// get the root element from our HTML
const rootElement = document.getElementById('root');

// create a React root and render our app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
