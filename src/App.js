import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useSpring, animated, config } from "react-spring";
import emojis from './emojis'
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
import { useEmoji } from './store/storeEmoji';
import { useText } from './store/storeNode';
const nodeTypes = { block: block };
const edgeTypes = {CustomEdge: CustomEdge};
const screenHeight = window.screen.height - 0.22*window.screen.height;
const proOptions = { hideAttribution: true };
const initialNodes = [
  {
    id: '0',
    type: 'block',
    data: { label: 'Node' },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
  const emojiWindowIsOpen = useEmoji(state => state.emojiWindowIsOpen)
  const switchEmoji = useEmoji(state => state.switchEmoji)
  const edgeId = useEmoji(state => state.edgeId)
  const textWindowIsOpen = useText(state => state.textWindowIsOpen)
  const switchText = useText(state => state.switchText)
  const nodeId = useText(state => state.nodeId)
  const nodePlaceholderLabel = useText(state => state.placeholderLabel)
  const nodePlaceholderImg = useText(state => state.placeholderImg)
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project, deleteElements } = useReactFlow();
  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
const [cover, setCover] = useState(true);
const [coverAnimate, setCoverAnimate] = useState(true);
const [emojiAnimate, setEmojiAnimate] = useState(true);
const [textAnimate, setTextAnimate] = useState(true);
useEffect(() => {
  setEmojiAnimate(emojiWindowIsOpen)
}, [emojiWindowIsOpen])
useEffect(() => {
  setTextAnimate(textWindowIsOpen)
}, [textWindowIsOpen])
const [title, setTitle] = useState('');
const [imgUrl, setImgUrl] = useState('');
const [desc, setDesc] = useState('');
const [nodeImg, setNodeImg] = useState('');
const [nodeText, setNodeText] = useState('');
useEffect(()=>{
  setNodeImg(nodePlaceholderImg)
}, [nodePlaceholderImg])
useEffect(()=>{
  setNodeText(nodePlaceholderLabel)
}, [nodePlaceholderLabel])
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
  from: {opacity: 0, transform: "translateY(40rem)"},
  to: {opacity: 1, transform: "translateY(0rem)"},
  reverse: !coverAnimate
});
const animatedEmoji = useSpring({
  from: {opacity: 0, transform: "translateY(40rem)"},
  to: {opacity: 1, transform: "translateY(0rem)"},
  reverse: !emojiAnimate
});
const animatedText = useSpring({
  from: {opacity: 0, transform: "translateY(-40rem)"},
  to: {opacity: 1, transform: "translateY(0rem)"},
  reverse: !textAnimate
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
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, type: 'CustomEdge', target: id, data: {smile: '', label: ''} }));
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
      <div className="container mx-auto px-4">
  <form className="max-w-screen-lg">
    <div className="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher'>
        Название
      </label>
      <input className="focus:outline-none w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2" onChange={e => setTitle(e.target.value)} id="input1" type="text" placeholder="Название"/>
    </div>
    <div className="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher'>
        URL картинки
      </label>
      <input className="focus:outline-none w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2" onChange={e => setImgUrl(e.target.value)} id="input2" type="text" placeholder="Адрес"/>
    </div>
    <div className="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher'>
        Описание
      </label>
      <textarea className="focus:outline-none w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2" rows={4} onChange={e => setDesc(e.target.value)} id="textarea1" placeholder="Описание"></textarea>
    </div>
  </form>
      <div className='mt-4 grid grid-cols-2 justify-items-center'>
        <button className='bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md' onClick={onChange}>Сохранить</button>
        <button className='bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md' onClick={onChange}>Опубликовать</button>
      </div>
</div>
    </animated.div>
}
      {!cover && !emojiWindowIsOpen && !textWindowIsOpen &&
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




    {
      emojiWindowIsOpen &&
      <animated.div style={animatedEmoji} className='w-screen grid grid-cols-1'>
  <div className='justify-self-end'>
    <button className="rounded-xl px-4 h-8 my-2 bg-retro text-white mr-2 text-xl" onClick={e => {
            setEmojiAnimate(false)
            setTimeout(()=>{
              switchEmoji ({
                emojiWindowIsOpen: false,
                edgeId: id
              })  
  }, 200)}}>
      –
    </button>
  </div>
  <div className='flex flex-wrap p-2 text-center justify-self-center justify-center'>
    {emojis.map((emoji, index) => (
      <div key={index} className="text-3xl mx-2 my-3" onClick={e=>{
            let dg
            edges.forEach((edge)=> {
              if (edge.id === edgeId) dg = edge})
            if (dg !== null && dg !== undefined){
             dg.data.smile = emoji
            deleteElements({ edges: [{ id: dg.id}] })
            setEdges((eds) => eds.concat( dg )); 
            }
            setEmojiAnimate(false)
            setTimeout(()=>{
              switchEmoji ({
                emojiWindowIsOpen: false,
                edgeId: id
              })  
  }, 200)
        }}>
        {emoji}
      </div>
    ))}
  </div>
</animated.div>
    }


    {
      textWindowIsOpen &&
      <animated.div style={animatedText} className='w-screen grid grid-cols-1'>
        <div className='justify-self-end'><button className="rounded-xl px-4 h-8 my-2 bg-retro text-white mr-2 text-xl" onClick={e => {
            let nd
            nodes.forEach((node)=> {
            if (node.id === nodeId) nd = node})
            nd.data.img = nodeImg;
            nd.data.label  = nodeText
            deleteElements({ nodes: [{ id: nd.id}] })
            setNodes((nds) => nds.concat( nd )); 
            setTextAnimate(false)
            setTimeout(()=>{
              switchText ({
                textWindowIsOpen: false,
                nodeId: id
              })   
  }, 200)}}>
      –
    </button></div>
        <div>
        <div className="container mx-auto px-4">
  <form className="max-w-screen-lg">
    <div className="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher'>
        URL картинки
      </label>
      <input className="w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2 focus:outline-none"  value={nodeImg} onChange={e => setNodeImg(e.target.value)} id="input2" type="text" placeholder="Адрес"/>
    </div>
    <div className="mb-4">
      <label id='label' className='text-lg mx-3 mt-4 font-philosopher'>
        Текст
      </label>
      <textarea className="w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md mt-2 focus:outline-none" rows={4}  value={nodeText} onChange={e => setNodeText(e.target.value)} id="textarea1" placeholder="Текст"></textarea>
    </div>
  </form>
</div>
        </div>
      </animated.div>
      
    }
    </div>
  );
};


export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
