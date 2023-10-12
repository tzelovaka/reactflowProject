import React, { useCallback, useRef, useEffect, useState } from 'react';
import ReactFlow, {
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import block from './BlockNode';
import CustomEdge from './CustomEdge';
import './index.css';
const nodeTypes = { block: block };
const edgeTypes = {CustomEdge: CustomEdge};

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};


const AddNodeOnEdgeDrop = () => {
const [scheme, setScheme] = useState()
const tgid = window.Telegram.WebApp.initDataUnsafe.user.id;
useEffect(() => {
      fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
          method: 'GET',
      })
  .then(response => response.json())
  .then (response => setScheme(response.message))
}, [tgid])

  const initialNodes = [
    {
      id: '0',
      type: 'block',
      data: { label: 'Блок', img: '', title: '' },
      position: { x: 0, y: 50 },
    },
  ];
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project, getNodes } = useReactFlow();
  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      let targetIsPane
      if (event.type == "touchend") {
        targetIsPane = event.changedTouches[0]
      }
      if (targetIsPane) {
        const id = getId();
        const left = event.changedTouches[0].clientX;
        const top = event.changedTouches[0].clientY;
        const newNode = {
          id,
          type: 'block',
          position: project({ x: left-75, y: top+100 }),
          data: { label: `Node ${id}` },
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id, type: 'CustomEdge', data: {label: '', smile: '' } }));
      }
    },
    [project]
  );
    const [title, setTitle] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [desc, setDesc] = useState();
    useEffect((event) => {
      fetch(`https://storinter.herokuapp.com/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(title)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
}, [title])
  return (
    <div className="wrapper" style={{height: 800}} ref={reactFlowWrapper}>
      {!scheme && <div>
      <form className='flex flex-wrap w-full h-full'>
       <label><p id="title" className='mx-5 my-3'>Название</p>
        <input className='w-full mx-2 my-3 border-2 rounded-xl bg-slate-300' type="text" name="title" value={title} onChange={event => setTitle(event.target.value)}/>
      </label>
      <label><p id="imgurl" className='mx-5 my-3'>URL Обложки</p>
        <input className='w-full mx-2 my-3 border-2 rounded-xl bg-slate-300' type="text" name="imgurl"/>
      </label>
      <label><p id="description" className='mx-5 my-3'>Описание</p>
        <textarea className="w-full border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg mx-2 my-3" name="desc" rows={3} cols={30}/> 
      </label>
      <button className='my-5 mx-5 rounded-full bg-cyan-500 text-white text-lg px-5 py-2' type="submit">Создать</button>
      </form>
      
    </div>}
      {scheme && 
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        //onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={fitViewOptions}
      >
      </ReactFlow>}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
