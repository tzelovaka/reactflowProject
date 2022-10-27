import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';


function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.username;
  console.log(`${tgid}`);
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch ('https://storinter.herokuapp.com/api')
    .then((response) => response.json())
    .then (response => setData(response.message))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><i>
          {
            tgid
          }
        {
          !data ? "Загрузка..." : data
        }  
        </i></p>
        
      </header>
    </div>
  );
}

export default App;
