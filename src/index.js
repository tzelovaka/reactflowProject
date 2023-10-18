import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));


const defaultState = {
  emojiWindowIsOpen: false,
  textWindowIsOpen: false
}


const reducer = (state=defaultState, action) => {
  if (action.type === "EMOJI_STATE"){
    switch (action.payload){
    case true:
      return {...state, emojiWindowIsOpen: true, textWindowIsOpen: false}
    case false:
      return {...state, emojiWindowIsOpen: false, textWindowIsOpen: false}
    default:
      return state
  }
  } else{
    switch (action.payload){
      case true:
        return {...state, emojiWindowIsOpen: false, textWindowIsOpen: true}
      case false:
        return {...state, emojiWindowIsOpen: false, textWindowIsOpen: true}
      default:
        return state
    }
  }
    
  
}

const store = createStore(reducer)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
   
  </React.StrictMode>
);
reportWebVitals();
