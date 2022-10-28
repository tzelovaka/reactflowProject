import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import { Axios } from "axios";


function App() {
  const tgid = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  console.log(`${tgid}`);
  const str = JSON.stringify(`${tgid}`);
  Axios.post('https://storinter.herokuapp.com/api', str)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
  /*useEffect(() => {
    const requestOptions = 
    res.json({
      message: `${st.name} - история под номером ${st.id}`
  })
    fetch('https://storinter.herokuapp.com/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tgid })
  })
  .then((response) => response.json())
  .then((tgid) => {
    console.log('Success:', tgid);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
const [data, setData] = useState(null)
  useEffect(() => {
    fetch ('https://storinter.herokuapp.com/api')
    .then((response) => response.json())
    .then (response => setData(response.message))
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
