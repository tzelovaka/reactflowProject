import React, { useCallback, useState } from 'react';
import './index.css';

const CreatingApp = () => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [desc, setDesc] = useState();
  
  const onChange = useCallback((evt) => {
    setDesc(evt.target.value);
  }, []);

  const beginStory = useCallback((evt) => {
  let story = {
      title: title,
      imgUrl: imgUrl,
      desc: desc
    };
    fetch(`https://storinter.herokuapp.com/api`, {
        method: 'POST',
        body: JSON.stringify(story)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }, [title, imgUrl, desc])
  return (
    <div>
        <textarea className="w-full border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg mx-2 my-3" rows={3} cols={30} onChange={onChange}/> 
      
      <button className='my-5 mx-5 rounded-full bg-cyan-500 text-white text-lg px-5 py-2' type="submit" onClick={beginStory}>Создать</button>
      
    </div>
  );
};

export default CreatingApp;
