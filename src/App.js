import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Fade, Slide, Bounce } from "react-awesome-reveal";
import { useSpring, animated, config } from "react-spring";
import ReactFlow, {
  Panel,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import block from './BlockNode';
import CustomEdge from './CustomEdge';
import './index.css';
import menuIcon from './img/menu.png';
const nodeTypes = { block: block };
const edgeTypes = {CustomEdge: CustomEdge};
const screenHeight = window.screen.height - 0.22*window.screen.height;
const proOptions = { hideAttribution: true };
const minimapStyle = {
  height: 120,
};

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
const [cover, setCover] = useState(true);
const [coverAnimate, setCoverAnimate] = useState(true);
const [title, setTitle] = useState('');
const [imgUrl, setImgUrl] = useState('');
const [desc, setDesc] = useState('');
const [scheme, setScheme] = useState()
const tgid = window.Telegram.WebApp.initDataUnsafe.user.id;
const controlsConfig = {
  showZoom: false,
  showFitView: false,
  showInteractive: true,
};
/*const getId = () => {
  fetch(`https://storinter.herokuapp.com/api/?storyId=${scheme[0].id}&authId=${tgid}&sourceId=${connectingNodeId.current}`, {
          method: 'GET',
      })
  .then(response => response.json())
  .then (response => {
    setCreatedBlockId(response.message[0])
    setCreatedEdgeId(response.message[1])
      })
.catch(error => {
  console.error('Error:', error);
});
};*/
const animatedMenu = useSpring({

  from: {opacity: 0, transform: "translateY(-40rem)"},
  to: {opacity: 1, transform: "translateY(0rem)"},
  reverse: !coverAnimate
});

useEffect(() => {
      fetch(`https://storinter.herokuapp.com/api/?data=${tgid}`, {
          method: 'GET',
      })
  .then(response => response.json())
  .then (response => {
    setScheme(response.message)
    setNodes(response.message[1])
    if (response.message[2].length>0) setEdges(response.message[2])
      })
.catch(error => {
  console.error('Error:', error);
});
}, [tgid])

const fitViewOptions = {
  padding: 3,
};

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      let targetIsPane
      if (event.type === "touchend") {
        targetIsPane = event.changedTouches[0]
      }
      if (targetIsPane) {
        const id = getId()
        const left = event.changedTouches[0].clientX;
        const top = event.changedTouches[0].clientY;
        const newNode = {
          id: id,
          type: 'block',
          position: project({ x: left-75, y: top+100 }),
          data: { label: `Node ${id}`, img: '' },
        };
        setNodes((nds) => nds.concat(newNode));
        console.log(nodes);
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, type: 'CustomEdge', target: id }));
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
    <div className="wrapper" style={{height: screenHeight}} ref={reactFlowWrapper}>
      { cover &&
      <animated.div style={animatedMenu} className='w-full grid grid-cols-1'>
      <div className='justify-self-end'>
        <button className="rounded-xl px-4 h-8 my-2 bg-retro text-white mr-2 text-xl" 
        onClick={
          e => {
            setCoverAnimate(false)
            setTimeout(()=>{
   setCover(false)
  }, 200)
}}>
–</button>
      </div>
      <div class="container mx-auto px-4">
  <form class="max-w-screen-lg">
    <div class="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher' for="input1">
        Название
      </label>
      <input className="w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2" onChange={e => setTitle(e.target.value)} id="input1" type="text" placeholder="Название"/>
    </div>
    <div class="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher' for="input2">
        URL картинки
      </label>
      <input className="w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2" onChange={e => setImgUrl(e.target.value)} id="input2" type="text" placeholder="Адрес"/>
    </div>
    <div class="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher' for="textarea1">
        Описание
      </label>
      <textarea className="w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2" rows={4} onChange={e => setDesc(e.target.value)} id="textarea1" placeholder="Описание"></textarea>
    </div>
  </form>
      <div className='mt-4 grid grid-cols-2 justify-items-center'>
        <button className='bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md' onClick={onChange}>Сохранить</button>
        <button className='bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md' onClick={onChange}>Опубликовать</button>
      </div>
</div>
    </animated.div>
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
        proOptions={proOptions}
      >
        <Controls {...controlsConfig} />
        <Panel position="top-left"><img className='w-6 h-6' src={menuIcon} alt="menu" onClick={
          e => {
            setCoverAnimate(true)
            setTimeout(()=>{
   setCover(true)
  }, 100)
}}/></Panel>
        <Background color="#aaa" gap={16} />
    </ReactFlow>}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
