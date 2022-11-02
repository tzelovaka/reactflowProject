import React, {useRef, useState, useEffect} from "react";
import Xarrow from "react-xarrows";
import logo from './logo.svg';
import './App.css';
const boxStyle = {border: "grey solid 2px", borderRadius: "10px", padding: "5px"};

function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  if (tgid == undefined){
    tgid = 0
  }
  const box1Ref = useRef(1);
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
      <div ref={box1Ref} style={boxStyle}>hey</div>
            <p id="elem2" style={boxStyle}>hey2</p>
            <Xarrow
                start={box1Ref} //can be react ref
                end="2" //or an id
            />
    </div>
  );
  }

export default App;
