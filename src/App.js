import React, {useRef, useState, useEffect} from "react";
import Xarrow from "react-xarrows";
import logo from './logo.svg';
import './App.css';
const boxBlock = {border: "grey solid 2px", borderRadius: "5px", padding: "5px"};
//const boxLink = {border: "red solid 1px", borderRadius: "15px", padding: "2px"};
function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  if (tgid == undefined){
    tgid = 0
  }
  //const box1Ref = useRef(1);
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
        <p>
        {
          !data ? "Загрузка..." : 
          data[0].map((level, h) =>
          level.map ((blin, x) =>
          <p id = {level.id}><br/>{level.text}</p>
          )
          )
          //data.map((row, y) =>
  //row.map((item, x) =>
    //<i>{item.blocktext == null ? item.linktext : item.blocktext}
    //{item.blocktext != null ? item.linktext : null}</i>
  //)
//)
          /*data.map((lins) => {
            lins.map((link) => {
              <p>{link.blocktext}
              {link.linktext}</p>
            })
          })*/
          /*data.map((link, i) => (
              <li key={i}>{link.linktext}</li>
          ))
          <div ref={box1Ref} style={boxStyle}>hey</div>
            <p id="elem2" style={boxStyle}>hey2</p>*/
        }
        </p>
        <Xarrow
                start="0" //can be react ref
                end="1" //or an id
            />
      </header>
    </div>
  );
  }

export default App;
