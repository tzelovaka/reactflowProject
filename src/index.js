import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreatingApp from './CreatingApp'
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
const i = false;
root.render(
  <React.StrictMode>
    <CreatingApp/>
    {i && <App />}
  </React.StrictMode>
);
reportWebVitals();
