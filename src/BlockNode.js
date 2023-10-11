import React, { useState, useCallback, useEffect } from 'react';
import { Handle, Position, useReactFlow, useNodeId, useNodes, useEdges } from 'reactflow';
import img from './img/img.png';
//import styles from "./App.module.css";

function Block({ data, isConnectable }) {
  const nodeId = useNodeId();
  const nodes = useNodes();
  const edges = useEdges();
  const { deleteElements, getNodes, getEdges} = useReactFlow();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //useEffect(() => {
    //console.log(edges);
  //}, [edges]);

  const onClick = useCallback(() => {
    let deletedNodes = [nodeId]
    let f = 0;
    const dgs = getEdges();
    dgs.slice(f).forEach((dg) => {
      deletedNodes.forEach ((deletedNode) => {
      if (dg.source == deletedNode) { 
        deletedNodes.push(dg.target);
        f++;
      }
      })
    });
    for (let i=0; i<deletedNodes.length; i++) deleteElements({ nodes: [{ id: deletedNodes[i]}] });
  }, [nodeId, deleteElements]);

  const onChange = useCallback((evt) => {
    let i;
    nodes.forEach((node) => {if (node.id === nodeId) i=nodes.indexOf(node) });
    nodes[i].data.label=evt.target.value;
  }, []);
  useEffect(() => {
    fetch(`https://storinter.herokuapp.com/api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // другие необходимые заголовки
        },
        body: JSON.stringify(nodes) // данные для отправки в формате JSON
      })
        .then(response => response.json())
        .then(data => {
          // обработка ответа сервера
          console.log(data);
        })
        .catch(error => {
          // обработка ошибок
          console.error('Error:', error);
        });
}, [])
  if (isDeleted) {
    return null;
  }

  return (
    <React.Fragment>
      <div className='inline-block'>
        <Handle 
          type="target" 
          position={Position.Top} 
          isConnectable={isConnectable} 
        />
        <div className="border-2 px-4 pb-4 rounded-xl bg-white">
          <div className="grid grid-cols-2 my-3">
            <button className="rounded my-2 w-8 h-8 bg-white text-sm justify-self-start"><img src={img} alt="img" className='w-full'/></button>
            {isOpen &&
                <div className='inline-blick text-center text-md h-12'>
                  <p>Удалить ветвь?</p>
                  <div className='grid grid-cols-2 gap-x-2'>
                  <button className='border-2 rounded-full' onClick={() => setIsOpen(false)}>Нет</button>
                  <button className='border-2 rounded-full' onClick={onClick}>Да</button>
                </div>
                </div>
                
            }
            { !isOpen && nodeId != '0' && <button className="rounded-xl px-4 h-8 my-2 bg-red-500 text-white text-lg justify-self-end flex items-center justify-center" onClick={() => setIsOpen(true)}>×</button>}
          </div>
          <textarea className="border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg" rows={3} cols={30} onChange={onChange}/>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
        />
      </div>
    </React.Fragment>
  );
}

export default Block;