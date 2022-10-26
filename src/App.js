import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
//const tg = window.Telegram.WebApp.initData
function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch ('https://storinter.com/api')
    .then((response) => response.json())
    .then (response => setData(response.message))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><i>
        {
          !data ? "Загрузка..." : data
        }  
        </i></p>
        
      </header>
    </div>
  );
}

export default App;
