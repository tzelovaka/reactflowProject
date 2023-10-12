import React, { useCallback, useRef, useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import './index.css';

const CreatingApp = () => {
/*const [data, setData] = useState(null)
const tgid = window.Telegram.WebApp.initDataUnsafe.user.id;
useEffect(() => {
      fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
          method: 'GET',
      })
  .then(response => response.json())
  .then (response => setData(response.message))
}, [tgid])*/
  return (
    <div className='flex flex-wrap w-full h-full'>
      <label>Название истории</label>
        <input className='w-full mx-5 my-3 border-2 rounded-xl bg-slate-300' type="name" name="" value=""/>
      <label>URL Обложки</label>
        <input className='w-full mx-5 my-3 border-2 rounded-xl bg-slate-300' type="name" name="" value=""/>
      <label>Описание</label>
        <textarea className="w-full border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg mx-5 my-3" rows={3} cols={30}/>
      <input className='justify-self-end my-5 mx-5 rounded-full bg-cyan-500 text-white text-lg px-3 py-2' type="button"value="Создать"/>
    </div>
  );
};

export default () => (
    <CreatingApp/>
);
