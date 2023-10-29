import React, { useEffect, useState, useReactFlow } from 'react';
import  { useEdges, getNodes } from 'reactflow';
//import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { useEmoji } from './store/storeEmoji';

function CustomEdge({ id,  target, source, data}) {//sourceX, sourceY, targetX, targetY,
  
  const [label, setLabel] = useState(data.label);
  const { getNodes} = useReactFlow();
  const nds = getNodes();
  const sourceX = nds.find(nd => nd.id === source).data.customX
  const sourceY = nds.find(nd => nd.id === source).data.customY
  const targetX = nds.find(nd => nd.id === target).data.customX
  const targetY = nds.find(nd => nd.id === target).data.customY
  const switchEmoji = useEmoji(state => state.switchEmoji)
  const handleInputChange = (event) => {
    if (event.target.value.length <= 280){
    const newValue = event.target.value
    setLabel(newValue);
    data.label = newValue;
    }
  };
  const curveY = targetY - 100;
  const EmojiDropdown = () => {
    
    const emojiWindow = () => {
      switchEmoji ({
        emojiWindowIsOpen: true,
        edgeId: id
      })      
    }
    return (
      <div className="relative inline-block">
        <button
          //onClick={handleToggleDropdown}
          onClick={()=>emojiWindow()}
          className="px-6 py-2 text-sm font-medium font-philosopher text-white rounded-full bg-yellow-300 mr-2"
        >
          {
            data.smile ? data.smile : 'Выберите эмоцию'
          }
        </button>
      </div>
    );
  };
  console.log(sourceX, sourceY, targetX, targetY);
  const rightX = targetX-100;
  const leftX = targetX-350;
  const offsetX = ((sourceX * 0.5 + targetX) / 1.5) - 220;
  const limitedX = Math.max(leftX, Math.min(rightX, offsetX));
  return (
    <>
      <path
        id={id}
        d={`M${sourceX},${sourceY} C${sourceX},${curveY} ${targetX},${curveY} ${targetX},${targetY}`}
        className="CustomEdge"
      />
      <foreignObject x={limitedX} y={targetY-125} width="500" height="250">
        <div className="flex flex-col w-full">
          <div className='flex'>
            <div className='grow h-14 '>
            </div>
            <div className='grow-0'>
              <EmojiDropdown />
            </div>
            <div className='grow h-14'>
            </div>
          </div>
          <div className='flex'>
            <div className='grow h-14'>
            </div>
            <div className='grow-0 px-6'>
            <div className='text-sm font-philosopher'>
              <p id='label' className='mx-4'>{label.length + ' / 280'}</p>
            </div>
              <input
            id={id + 'edgeInput'}
            type="text"
            value={label || ''}
            onChange={handleInputChange}
            className='focus:outline-none border-2 border-sea rounded-full px-3 py-1 text-lg mr-8 text-center'
          />
            </div>
          <div className='grow h-14'>
          </div>
          </div>
          </div>
      </foreignObject>
    </>
  );
}

export default CustomEdge;