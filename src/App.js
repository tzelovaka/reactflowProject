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
import CreatingApp from './CreatingApp';
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
const [cover, setCover] = useState(true);
const [title, setTitle] = useState('');
const [imgUrl, setImgUrl] = useState('');
const [desc, setDesc] = useState('');
const [scheme, setScheme] = useState()
const tgid = window.Telegram.WebApp.initDataUnsafe.user.id;
useEffect(() => {
      /*fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
          method: 'GET',
      })
  .then(response => response.json())
  .then (response => setScheme(response.message))*/
  fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  setScheme(data)
  console.log(scheme);
  //if (data.length>2) setCover(false)
})
.catch(error => {
  console.error('Error:', error);
});
}, [tgid, scheme])
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(scheme[1]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
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
  const onChange = useCallback(async (evt) => {
    /*const data = {
      title: title,
      imgUrl: imgUrl,
      desc: desc
    };*/
    
    await fetch(`https://storinter.herokuapp.com/api/story/?title=${title}&imgUrl=${imgUrl}&desc=${desc}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }, [title, imgUrl, desc]);
  return (
    <div className="wrapper" style={{height: 800}} ref={reactFlowWrapper}>
      {cover && 
      <div>
        <button className="rounded-xl px-4 h-8 my-2 bg-red-500 text-white text-lg justify-self-end flex items-center justify-center" onClick={e => setCover(false)}>×</button>
        <p id='label' className='text-lg mx-3 mt-4'>Название</p>
        <input type="text" className="border-2 rounded-xl bg-slate-300 px-5 py-1 text-lg mx-3 mt-2 text-center" onChange={e => setTitle(e.target.value)}/>
        <p id='label' className='text-lg mx-3 mt-4'>URL картинки</p>
        <input type="text" className="border-2 rounded-xl bg-slate-300 px-5 py-1 text-lg mx-3 mt-2" onChange={e => setImgUrl(e.target.value)}/>
        <p id='label' className='text-lg mx-3 mt-4'>Описание</p>
        <textarea className="border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg mx-3 mt-2" rows={3} cols={30} onChange={e => setDesc(e.target.value)}/>
        <button className='bg-cyan-300 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full' onClick={onChange}>Ок</button>
      </div>
      }
      {!cover && 
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
        <Panel position="bottom-right"><button className='bg-cyan-300 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full' onClick={e => setCover(true)}>Редактировать обложку</button></Panel>
      </ReactFlow>}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
