import React, { useEffect, useState} from 'react';
import  {useReactFlow, getNodes, useEdges, useNodes } from 'reactflow';
//import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { useEmoji } from './store/storeEmoji';

function CustomEdge({ id, sourceX, sourceY, targetX, targetY, source, target, data}) {
  const [render, setRender] = useState(false)
  useEffect(()=>{
    data.label = data.label+ '1'
  }, [nds])
  const { getNodes } = useReactFlow();
  const nds = useNodes()

  const sX = nds.find(nd=>nd.id === source).position.x//sourceX
  const sY = nds.find(nd=>nd.id === source).position.y//sourceY
  const tX = nds.find(nd=>nd.id === target).position.x//targetX
  const tY = nds.find(nd=>nd.id === target).position.y//targetY
  console.log(sX, sY, tX, tY);
  const [label, setLabel] = useState(data.label);
  //const dispatch = useDispatch()
  //const emojiWindowIsOpen = useSelector(state => state.emojiWindowIsOpen)
  const switchEmoji = useEmoji(state => state.switchEmoji)
  const handleInputChange = (event) => {
    if (event.target.value.length <= 280){
    const newValue = event.target.value
    setLabel(newValue);
    data.label = newValue;
    }
    /*const updatedEdges = edges.map((edge) => {
      if (edge.id === id) {
        return { ...edge, data: { ...edge.data, label: event.target.value } };
      }
      return edge;
    });*/
  };
  const curveY = tY - 100;
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
  const rightX = tX-100;
  const leftX = tX-350;
  const offsetX = ((sX * 0.5 + tX) / 1.5) - 220;
  const limitedX = Math.max(leftX, Math.min(rightX, offsetX));
  return (
    <>
      <path
        id={id}
        d={`M${sX+100},${sY-100} C${sX},${curveY} ${tX},${curveY} ${tX+100},${tY}`}
        className="CustomEdge"
      />
      <foreignObject x={limitedX} y={tY-125} width="500" height="250">
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