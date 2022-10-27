import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import { Axios } from "axios";


async function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  let response = await fetch('https://storinter.herokuapp.com/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(tgid)
  });
  /*await Axios.post("https://storinter.herokuapp.com/api", {authId: tgid})
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
  await fetch('https://storinter.herokuapp.com/api', {
    method: 'post',
    body: JSON.stringify(`${tgid}`),
    headers: {
        'content-type': 'application/json'
    }
})*/
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
