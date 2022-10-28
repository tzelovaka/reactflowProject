import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import { Axios } from "axios";
import { response } from "express";


function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  console.log(`${tgid}`);
  Axios.post ('https://storinter.herokuapp.com/api', {message: `${tgid}`}).
  then((response) => {
    console.log(response.data);
  }).
  catch((error) => {
    console.error(error)
  })
  /*const [data, setData] = useState(null)
  useEffect(() => {
    fetch('https://storinter.herokuapp.com/api')
      .then((response) => response.json())
      .then(response => setData(response.message));
  }, [])*/
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><i>
          {
            tgid
          }
          <br/>
        {
          !data ? "Загрузка..." : data
        }  
        </i></p>
        
      </header>
    </div>
  );
  }

export default App;
