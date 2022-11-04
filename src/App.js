import React, {useState, useEffect} from "react";
import Xarrow from "react-xarrows";
import logo from './logo.svg';
import './App.css';
const bl = {
  border: "grey solid 2px", borderRadius: "5px", padding: "5px", listStyleType: "none", marginTop: "30px"
};
const li = {
  display: "inline", border: "coral solid 1px", padding: "1px", listStyleType: "none", margin: "10px", fontSize: "7px"
};
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
  return (
    <div className="App">
      <header className="App-header">
        <ul>
        { 
          !data ? "Загрузка..." : 
          data[0].map((level, h) =>
          level.map ((blin, x) =>
          <li id = {blin.id} style = {blin.type == 'block' ? bl : li}>{blin.text}</li>
          )
          )
          
        }
        </ul>
        {
          !data ? "Загрузка..." : 
          data[1].map((arrow) =>
          <Xarrow color="coral" strokeWidth={5} curveness={2} headSize={5}
                start={arrow.start}
                end={arrow.end}
            />
          )
        }
      </header>
    </div>
  );
  }

export default App;
