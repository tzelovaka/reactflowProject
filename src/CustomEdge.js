import React, { useState } from 'react';
import { Handle, Position, useReactFlow, useEdges } from 'reactflow';

import './index.css';

function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [label, setLabel] = useState('');
  const edges = useEdges();
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

    return (
      <div className="relative inline-block">
        <button
          onClick={handleToggleDropdown}
          className="px-4 py-2 text-sm font-medium text-white rounded-full bg-yellow-300 mr-2"
        >
          {emj ? emj : ":)"}
        </button>
        {isDropdownOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-75 flex items-center justify-center">
            <div className="border-1 shadow-xl rounded-lg border-2 pl-2 pr-8">
              <div className='grid grid-cols-12 gap-x-6 gap-y-2'>
                {emojis.map((emoji, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => emojiSelect(emoji)}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <path
        id={id}
        d={`M${sourceX},${sourceY} C${sourceX},${curveY} ${targetX},${curveY} ${targetX},${targetY}`}
        className="CustomEdge"
      />
      <foreignObject x={curveX + 50} y={curveY + 50} width="1280" height="2400">
        <div className="flex items-center">
          <input
            type="text"
            value={label}
            onChange={handleInputChange}
            className='border-2 border-cyan-600 rounded-full px-2 py-1 text-sm mr-8'
          />
          <EmojiDropdown />
        </div>
      </foreignObject>
    </>
  );
}

export default CustomEdge;