import React, { useState } from 'react';
import { Handle, Position, useReactFlow, useEdges } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

function CustomEdge({ id, sourceX, sourceY, targetX, targetY}) {
  const [label, setLabel] = useState('');
  const edges = useEdges();
  const dispatch = useDispatch()
  const emojiWindowIsOpen = useSelector(state => state.emojiWindowIsOpen)
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
  const curveX = targetX - 125;
  const curveY = targetY - 100;
  const [emj, setEmj] = useState('');
  const EmojiDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const emojis = [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
      "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😛", "😝",
      "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒",
    ];

    const handleToggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const emojiSelect = (emoji) => {
      const updatedEdges = edges.map((edge) => {
        if (edge.id === id) {
          return { ...edge, data: { ...edge.data, smile: emoji } };
        }
        return edge;
      });
      console.log(updatedEdges);
      setEmj(emoji);
    };
    const emojiWindow = () => {
      dispatch({type: "CHANGE_STATE", payload: !emojiWindowIsOpen})
    }
    return (
      <div className="relative inline-block">
        <button
          //onClick={handleToggleDropdown}
          onClick={()=>emojiWindow()}
          className="px-6 py-2 text-sm font-medium text-white rounded-full bg-yellow-300 mr-2"
        >
          {emj ? emj : ":)"}
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 border-1 shadow-xl inline-block py-2 rounded-lg border-2 pl-2 pr-8">
            <div className='grid grid-cols-12 gap-x-10 gap-y-2'>
              {emojis.map((emoji, index) => (
                <div
                  key={index}
                  className="text-3xl hover:bg-gray-100"
                  onClick={() => emojiSelect(emoji)}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  const maxX = 100; // Максимальное значение x
  const offsetX = ((sourceX * 0.25 + targetX) / 1.25) - 220;
  return (
    <>
      <path
        id={id}
        d={`M${sourceX},${sourceY} C${sourceX},${curveY} ${targetX},${curveY} ${targetX},${targetY}`}
        className="CustomEdge"
      />
      <foreignObject x={Math.min(offsetX, maxX)} y={targetY-150} width="500" height="250">
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
            className='border-2 border-sea rounded-full px-2 py-1 text-lg mr-8'
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