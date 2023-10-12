import React, { useCallback, useRef, useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import './index.css';

const CreatingApp = () => {
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      title: formData.get('title'),
      imgurl: formData.get('imgurl'),
      desc: formData.get('desc')
    };
    this.props.onSubmit(data);
  }
  return (
    <div>
      <form  onSubmit={this.handleSubmit} className='flex flex-wrap w-full h-full'>
       <label id="title" className='mx-5 my-3'>Название истории</label>
        <input className='w-full mx-2 my-3 border-2 rounded-xl bg-slate-300' type="text" name="title" value=""/>
      <label id="imgurl" className='mx-5 my-3'>URL Обложки</label>
        <input className='w-full mx-2 my-3 border-2 rounded-xl bg-slate-300' type="text" name="imgurl" value=""/>
      <label id="description" className='mx-5 my-3'>Описание</label>
        <textarea className="w-full border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg mx-2 my-3" name="desc" rows={3} cols={30}/>
      <input className='my-5 mx-5 rounded-full bg-cyan-500 text-white text-lg px-5 py-2' type="button"value="Создать"/> 
      </form>
      
    </div>
  );
};

export default () => (
    <CreatingApp/>
);
