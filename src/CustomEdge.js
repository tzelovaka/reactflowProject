import React, { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow, useEdges } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

function CustomEdge({ id, sourceX, sourceY, targetX, targetY}) {
  const setEmoji = useSelector(state => state.data.emoji)
  const [label, setLabel] = useState('');
  const edges = useEdges();
  const dispatch = useDispatch()
  const emojiWindowIsOpen = useSelector(state => state.window.emojiWindowIsOpen)
  const handleInputChange = (event) => {
    setLabel(event.target.value);
    const updatedEdges = edges.map((edge) => {
      if (edge.id === id) {
        return { ...edge, data: { ...edge.data, label: event.target.value } };
      }
      return edge;
    });
    console.log(updatedEdges);
  };
  const curveY = targetY - 100;
  const EmojiDropdown = () => {
    const emojiWindow = () => {
      dispatch({type: "EMOJI_STATE", payload: !emojiWindowIsOpen})
    }
    return (
      <div className="relative inline-block">
        <button
          //onClick={handleToggleDropdown}
          onClick={()=>emojiWindow()}
          className="px-6 py-2 text-sm font-medium text-white rounded-full bg-yellow-300 mr-2"
        >
          {setEmoji ? `${setEmoji}` : ":)"}
        </button>
      </div>
    );
  };
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
              <input
            type="text"
            value={label}
            onChange={handleInputChange}
            className='focus:outline-none border-2 border-sea rounded-full px-2 py-1 text-lg mr-8'
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