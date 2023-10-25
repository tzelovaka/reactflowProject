import React, { useState, useCallback } from 'react';
import { Handle, Position, useReactFlow, useNodeId } from 'reactflow';
import { useText } from './store/storeNode';

function Block({ data, isConnectable, id }) {
  const nodeId = useNodeId();
  const switchText = useText(state => state.switchText)
  const { deleteElements, getEdges} = useReactFlow();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = useCallback(() => {
    let deletedNodes = [nodeId]
    let f = 0;
    const dgs = getEdges();
    dgs.slice(f).forEach((dg) => {
      deletedNodes.forEach ((deletedNode) => {
      if (dg.source === deletedNode) { 
        deletedNodes.push(dg.target);
        f++;
      }
      })
    });
    for (let i=0; i<deletedNodes.length; i++) deleteElements({ nodes: [{ id: deletedNodes[i]}] });
  }, [nodeId, deleteElements]);

  const onChange = useCallback((evt) => {

    /*
    let i;
    nodes.forEach((node) => {if (node.id === nodeId) i=nodes.indexOf(node) });
    nodes[i].data.label=evt.target.value;
    fetch(`https://storinter.herokuapp.com/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nodes)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });*/
  }, []);
  
  if (isDeleted) {
    return null;
  }
  const textWindow = () => {
    switchText ({
      textWindowIsOpen: true,
      nodeId: id,
      placeholderLabel: data.label,
      placeholderImg: data.img
    })      
  }
  //<button className="rounded my-2 w-8 h-8 bg-white text-sm justify-self-start"><img src={img} alt="img" className='w-full'/></button>
  return (
    <React.Fragment>
      <div className='inline-block'>
        <Handle 
        style={{
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          borderBottomLeftRadius: '50px',
        borderBottomRightRadius: '50px',  
      }}
          type="target" 
          position={Position.Top} 
          isConnectable={isConnectable} 
        />
        <div className="border-2 px-4 pb-4 rounded-xl bg-white" 
        style={{
          backgroundImage: `linear-gradient(to top, rgba(255,255,255,1) 60%, rgba(255,255,255,0)), url(${data.img})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',}}>
          <div className="grid grid-cols-1 my-3">
            
            
            {isOpen &&
                <div className='inline-blick text-center text-md h-12'>
                  <p>Удалить ветвь?</p>
                  <div className='grid grid-cols-2 gap-x-2'>
                  <button className='border-2 rounded-full' onClick={() => setIsOpen(false)}>Нет</button>
                  <button className='border-2 rounded-full' onClick={onClick}>Да</button>
                </div>
                </div>
                
            }
            { !isOpen && nodeId !== '0' && <button className="rounded-xl px-4 h-8 my-2 bg-retro text-white text-lg justify-self-end flex items-center justify-center" onClick={() => setIsOpen(true)}>×</button>}
          </div>
          <textarea id={id + 'mirageTextarea'} className="resize-none border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg" rows={3} cols={30} onChange={onChange} onClick={()=>textWindow()} value={data.label}></textarea>
        </div>
        <Handle
        style = {{
          borderTopLeftRadius: '50px',
          borderTopRightRadius: '50px',
          borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',  
        }}
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