import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreatingApp from './CreatingApp'
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
const i = false;
const handleFormSubmit = (data) => {
  console.log(data);
}
root.render(
  <React.StrictMode>
    <CreatingApp onSubmit={this.handleFormSubmit}/>
    {i && <App />}
  </React.StrictMode>
);
reportWebVitals();
