import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';


function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  if (tgid == undefined){
    tgid = 0
  }
  var [data, setData] = useState(null)
  useEffect(() => {
        fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
            method: 'GET',
        })
    .then((response) => response.json())
    .then (response => setData(response.message))
      }, [])
      let arr = data.split('|');
      console.log(arr);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {
            tgid
          }
          <br/>
        {
          !data ? "Загрузка..." : data
        }  
        </p>
        
      </header>
    </div>
  );
  }

export default App;
