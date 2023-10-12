import React, { useCallback, useRef, useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import './index.css';

const CreatingApp = () => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [desc, setDesc] = useState('');

  const beginStory = useCallback((evt) => {
  console.log('PZDCCCCCCCCCCCCCC: ' + title);
  let story = {
      title: this.title,
      imgUrl: this.imgUrl,
      desc: this.desc
    };
    fetch(`https://storinter.herokuapp.com/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(story)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }, [])
  return (
    <div>
       <label><p id="title" className='mx-5 my-3'>Название</p>      </label>
        <input className='w-full mx-2 my-3 border-2 rounded-xl bg-slate-300' type="text" value={title} onChange={event => setTitle(event.target.value)}/>

      <label><p id="imgurl" className='mx-5 my-3'>URL Обложки</p>      </label>
        <input className='w-full mx-2 my-3 border-2 rounded-xl bg-slate-300' type="text" value={imgUrl} onChange={event => setImgUrl(event.target.value)}/>
      
      <label><p id="description" className='mx-5 my-3'>Описание</p>      </label>
        <textarea className="w-full border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg mx-2 my-3" rows={3} cols={30} value={desc} onChange={event => setDesc(event.target.value)}/> 
      
      <button className='my-5 mx-5 rounded-full bg-cyan-500 text-white text-lg px-5 py-2' type="submit" onClick={beginStory}>Создать</button>
      
    </div>
  );
};

export default CreatingApp;
