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
const [text, setText] = useState(22)
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
    console.log(text);
    const data = text;
    await fetch(`/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  }, []);
  return (
    <div className="wrapper" style={{height: 800}} ref={reactFlowWrapper}>
      {!scheme &&
      <div>
        <textarea className="border-2 rounded-xl bg-slate-300 px-2 py-1 text-lg" rows={3} cols={30} onChange={e => setText(e.target.value)}/>
        <button onClick={onChange}>Ок</button>
      </div>
      }
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
