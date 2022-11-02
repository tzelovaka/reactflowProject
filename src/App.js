import React, {useState, useEffect} from "react";
import { ArcherContainer, ArcherElement } from 'react-archer';
import logo from './logo.svg';
import './App.css';


function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  if (tgid == undefined){
    tgid = 0
  }
  const [data, setData] = useState(null)
  useEffect(() => {
        fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
            method: 'GET',
        })
    .then(response => response.json())
    .then (response => setData(response.message))
  }, [])
  new LeaderLine(
    document.getElementById('1'),
    document.getElementById('2')
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {
            tgid
          }
        </p>
        {
          !data ? "Загрузка..." : 
          data.map((row, y) =>
  row.map((item, x) => 
    <p id = {x}>{item.blocktext}
    <hr/>
  <u>{item.linktext}</u></p>)
)
          /*data.map((lins) => {
            lins.map((link) => {
              <p>{link.blocktext}
              {link.linktext}</p>
            })
          })*/
          /*data.map((link, i) => (
              <li key={i}>{link.linktext}</li>
          ))*/
        }
      </header>
    </div>
  );
  }

export default App;
