import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';


function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  console.log(`${tgid}`);
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch ('https://storinter.herokuapp.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "ZHOPA"})
    })
    .then((response) => response.json())
    .then (response => setData(response.message))
  }, [])
  /*const [dota, setDota] = useState(null)
  useEffect(() => {
    fetch ('https://storinter.herokuapp.com/api')
    .then((response) => response.json())
    .then (response => setDota(response.message))
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
          //!data ? "Загрузка..." : data
        }  
        </i></p>
        
      </header>
    </div>
  );
  }

export default App;
