import React, {useState, useEffect} from "react";
import Xarrow from "react-xarrows";
import logo from './logo.svg';
import './App.css';
const bl = {
  border: "#00DAD5 solid", borderWidth: "3px 0 3px 0px", padding: "5px", listStyleType: "none", marginTop: "30px"
};
const li = {
  display: "inline", border: "#EC5A5A solid 1px", padding: "1px", listStyleType: "none", margin: "10px", fontSize: "7px", boxShadow: "0 3px 0px 0px #EC5A5A"
};
function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  if (tgid == undefined){
    tgid = 0
  }
  console.log(tgid);
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
          !data[0] ? "В поиске..." : 
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
          <Xarrow color="#EC5A5A" strokeWidth={1} curveness={0.2} headSize={4} path={"smooth"} startAnchor="bottom" endAnchor="top"
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
