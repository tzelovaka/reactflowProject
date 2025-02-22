import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useSpring, animated } from "react-spring";
import emojis from './emojis'
import Facts from './facts'
import back from './img/back.png';
import ReactFlow, {
  Panel,
  Controls,
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
const proOptions = { hideAttribution: true};

const initialNodes = [
  {
    id: '0',
    type: 'block',
    data: { 
      label: 'Зажмите область цвета светло-зелёного моря и проведите в сторону=>', 
      img: ''
    },
    position: { x: 0, y: 50 },
  },
  {
      id: '1',
      type: 'block',
      data: { 
          label: '=>Отпустите и нажмите на серую форму в появившемся блоке=>', 
          img: ''
        },
      position: { x: 150, y: 400 },
  },
  {
    id: '2',
    type: 'block',
    data: { 
        label: '=>Творите...', 
        img: ''
      },
    position: { x: -150, y: 700 },
},
];
const initialEdges = [
  {
      id: 'e0-1', 
      source: '0', 
      type: 'CustomEdge', 
      target: '1', 
      data: { label: 'Введите текст выбора...', smile: '' } 
  },
  {
    id: 'e0-2', 
    source: '0', 
    type: 'CustomEdge', 
    target: '2', 
    data: { label: '...иначе не опубликуется', smile: '' } 
}
]


const tgid = window.Telegram.WebApp.initDataUnsafe.user.id;

const AddNodeOnEdgeDrop = () => {
 useEffect(() => {
    fetch(`http://storinter.site/api/?data=${tgid}`, {
        method: 'GET',
    })
.then(response => response.json())
.then (response => {
  if (response){
  setNodes(response.message.nodes)
  setEdges(response.message.edges)
  setTitle(response.message.head.title)
  response.message.head.img === undefined || response.message.head.img === null ? setImgUrl('') : setImgUrl(response.message.head.img)
  setDesc(response.message.head.desc)
  }
    })
.catch(error => {
console.error('Error:', error);
});
}, [tgid])
  function checkImageExists(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function() {
        resolve(true);
      };
      img.onerror = function() {
        resolve(false);
      };
      img.src = url;
    });
  }
  const emojiWindowIsOpen = useEmoji(state => state.emojiWindowIsOpen)
  const switchEmoji = useEmoji(state => state.switchEmoji)
  const edgeId = useEmoji(state => state.edgeId)
  const textWindowIsOpen = useText(state => state.textWindowIsOpen)
  const switchText = useText(state => state.switchText)
  const nodeId = useText(state => state.nodeId)
  const nodePlaceholderLabel = useText(state => state.placeholderLabel)
  const nodePlaceholderImg = useText(state => state.placeholderImg)
  const [simulateNodeId, setSimulateNodeId] = useState('0') 
  const [simulatedHistory, setSimulatedHistory] = useState(['0']);
 const [verificationOfPublish, setVerificationOfPublish] = useState(false)
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [id, setId]=useState('0')
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  useEffect(()=>{
    nodes.forEach(node => {
      if (Number(node.id)>=Number(id)) setId(String(Number(node.id)+1))
    });
  },[nodes])
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { project, deleteElements, getNodes } = useReactFlow();
  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
const [displayError, setDisplayError] = useState(false)
const [displaySaving, setDisplaySaving] = useState(false)
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
const [isReleased, setIsReleased] = useState(false)
const data = {
  head: {
  title: title,
  imgUrl: imgUrl,
  desc: desc,
  authId: tgid,
  release: isReleased
  },
  nodes: nodes,
  edges: edges
}
useEffect(()=>{
  data.head.title = title
  data.head.imgUrl = imgUrl
  data.head.desc = desc
  data.head.release = isReleased
  data.nodes = nodes
  data.edges = edges
}, [data])
useEffect(()=>{
  setVerificationOfPublish(false)
  setDisplaySaving(false)
  setDisplayError(false)
}, [title, imgUrl, desc, nodes])
const [nodeImg, setNodeImg] = useState('');
const [nodeText, setNodeText] = useState('');
useEffect(()=>{
  setNodeImg(nodePlaceholderImg)
}, [nodePlaceholderImg])
useEffect(()=>{
  setNodeText(nodePlaceholderLabel)
}, [nodePlaceholderLabel])


const controlsConfig = {
  showZoom: false,
  showFitView: false,
  showInteractive: true,
};
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
  from: {opacity: 0, transform: "translateY(40rem)"},
  to: {opacity: 1, transform: "translateY(0rem)"},
  reverse: !textAnimate
});

const fitViewOptions = {
  padding: 3,
  minZoom: 0.1,
  maxZoom: 3
};

const imgTest = async (img) => {
  return checkImageExists(img)
  .then(exists => {
    if (exists) {
      return true
    } else {
      return false
    }
  });
}

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);


  const onConnectEnd = useCallback(
    (event) => {
      let targetIsPane = false;
      if (event.type === "touchend") {
        targetIsPane = event.changedTouches[0];
      } else if (event.type === "mouseup") {
        targetIsPane = true;
      }
      if (targetIsPane) {
        /*let i=0;
        let n = nodes
        console.log(n);
        n.forEach(node=>{
          console.log(node.id);
          if (Number(node.id)>Number(id)) setId(node.id)
        })
      console.log(id);*/
        const left = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX;
        const top = event.type === "touchend" ? event.changedTouches[0].clientY : event.clientY;
        const newNode = {
          id: id,
          type: 'block',
          position: project({ x: Math.round(left - 75), y: Math.round(top + 100) }),
          data: { label: '', img: '' },
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id: `e${connectingNodeId.current}-${id}`, source: connectingNodeId.current, type: 'CustomEdge', target: id, data: { smile: '', label: '' } })
        );
      }
    },
    [project, setNodes, setEdges, id]
  );

  const saveStory = useCallback(async (evt) => {
    let testBeforePublish=true
    if (data.head.release === true) {
      data.nodes.forEach(node=> {
        if(node.data.label.length < 1) 
        {
          setIsReleased(false)
          testBeforePublish=false
          setDisplayError(true)
        }
        
      })
      data.edges.forEach(edge=> {
        if(edge.data.label.length < 1) {
          setIsReleased(false)
          testBeforePublish=false
          setDisplayError(true)
        }
        
      })
    }
    if (testBeforePublish){
      setDisplaySaving(true)
      let url = 'http://storinter.site/api/story' //?title=${title}&imgUrl=${imgUrl}&desc=${desc}
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        window.location.reload()
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    
  }, [data]);

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
  <h2 id='label' className='mx-3 text-3xl font-philosopher'>История</h2>
  <hr/>
    <div className="mb-4">
      <label id='label' htmlFor="input1" className='text-lg mx-3 mt-4 font-philosopher'>
        Название
      </label>
      <div className='font-philosopher text-xs mt-2'>
        <div id='label' className='mx-2'>{title === undefined || title === null ? '0 / 100' : (title.length + ' / 100')}</div>
      </div>
      <input maxLength="100" className="focus:outline-none w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md" value={title || ''} onChange={e => setTitle(e.target.value)} id="input1" type="text" placeholder="Название"/>
    </div>
    <div className="mb-4 backdrop-blur-sm rounded-xl" style={imgUrl ? {backgroundImage: `url(${imgUrl})`} : null}>
      <div className='rounded-xl' style={imgUrl ? {backgroundColor: 'rgba(0, 0, 0, 0.3)'} : null}>
        <label id="label" htmlFor="input2" className='text-lg mx-3 mt-4 font-philosopher' style={imgUrl ? {color: 'white'} : null}>
        URL картинки
      </label>
      <div className='font-philosopher text-xs mt-2'>
        <div id='label' className='mx-2' style={imgUrl ? {color: 'white'} : null}>{imgUrl === undefined || imgUrl === null ? '0 / 2083' : (imgUrl.length + ' / 2083')}</div>
      </div>
      <input maxLength="2083" className="focus:outline-none w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md" value={imgUrl || ''} 
      onChange={
        e => {
          setImgUrl(e.target.value)
          }
          }
          onBlur={e => {
            e.stopPropagation();
            imgTest(imgUrl).then(result => {
              if (!result) {
                setImgUrl('')
              }
            })
          }
            
          } id="input2" type="text" placeholder="Адрес"/>
      </div>
    </div>
    <div className="mb-4">
      <label id='label' htmlFor="textarea1" className='text-lg mx-3 mt-4 font-philosopher'>
        Описание
      </label>
      <div className='font-philosopher text-xs mt-2'>
        <div id='label' className='mx-2'>{desc === undefined || desc === null ? '0 / 4000' : (desc.length + ' / 4000')}</div>
      </div>
      <textarea maxLength="4000" className="focus:outline-none w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md" value={desc || ''} rows={4} onChange={e => setDesc(e.target.value)} id="textarea1" placeholder="Описание"></textarea>
    </div>
  </form>
      <div className='mt-4 grid grid-cols-2 justify-items-center'>
        {!displaySaving && displayError &&
          <div className='col-span-2 font-philosopher text-retro text-lg mb-4 rounded-full border-2 px-3 py-1'>
          Некорректные значения
        </div>
}
{displaySaving && !displayError &&
  <div className='col-span-2 font-philosopher text-sea text-lg rounded-full border-2 px-3 py-1 mb-4'>
  Всё верно...
</div>
}
{ !verificationOfPublish &&
  <button
  className="bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md focus:outline-none"
  onClick={e => {
    if(title === undefined  || desc === undefined || title === null || desc === null || title.length < 1 || desc.length <1 ){
      setDisplayError(true);
    }else{
        if (imgUrl === undefined ||imgUrl === null || imgUrl.length<1) {
          setImgUrl('')
        }
        setDisplaySaving(true);
        saveStory();
    }
    }
    }
>
  Сохранить
</button>
}

<div>
  { !verificationOfPublish &&
    <button 
        className='focus:outline-none bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md' 
        onClick={
          e => 
          {
            setVerificationOfPublish(true)
            setIsReleased(true)
        }}>
            Опубликовать
            </button>
  }
  
</div>
{ verificationOfPublish &&
  <div className='col-span-2 w-100 grid grid-cols-2 items-center'>
        <button className='focus:outline-none bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md' 
        onClick={
          async e=>{
            if(title === undefined  || desc === undefined || title === null || desc === null || title.length < 1 || desc.length <1 ){
              setDisplayError(true);
            }else{
                if (imgUrl === undefined ||imgUrl === null || imgUrl.length<1) {
                  setImgUrl('')
                }
                saveStory();
              }
            
          }
          
  }>
          Да
        </button>
        <button onClick={
          e => 
          {
            setIsReleased(false)
            setVerificationOfPublish(false)
          }
        }
          className='focus:outline-none bg-sea font-philosopher text-white font-bold py-2 px-4 rounded-full mx-3 text-md' >
          Нет
        </button>
      </div>
}

        
      </div>
</div>
<div className='container mx-auto font-philosopher w-100 mt-28 px-4'>
  <div className='max-w-screen-lg'>
    <h2 id='label' className='mx-3 text-3xl'>Симуляция</h2>
  <hr/>
  <div>
  {
  nodes.find(node => node.id === simulateNodeId).data.img ?
  <div className='w-100 flex justify-center mt-3'>
    <img className='w-64 rounded-xl' src={nodes.find(node => node.id === simulateNodeId).data.img} alt="Картинка" />
  </div>
  : null
}
<div className='mt-4 mx-3 font-philosopher w-100 px-3 py-2 border-2 rounded-full'>
  <div id='label'>
    {
  (nodes.find(node => node.id === simulateNodeId) === undefined || nodes.find(node => node.id === simulateNodeId).data.label === null ||  nodes.find(node => node.id === simulateNodeId).data.label.length < 1) ? <div className='w-100 text-center text-red-300'>Уупс... (здесь должен быть текст)</div> : (nodes.find(node => node.id === simulateNodeId).data.label.length > 35 ? (nodes.find(node => node.id === simulateNodeId).data.label.substring(0, 35) + '...') : nodes.find(node => node.id === simulateNodeId).data.label)
}
    </div>
</div>
<div className='flex flex-wrap mt-2'>
    {
 edges.map (edge => {
  if (edge.source === nodes.find(node => node.id === simulateNodeId).id){
     return <div className='mx-3 border rounded-full px-4 py-1 my-2' key={edge.id} 
     onClick={
      e => {
        setSimulateNodeId(edge.target)
        setSimulatedHistory(simulatedHistory.concat(edge.target))
        }}>
          <div id='label'>
            {(edge.data.smile ? edge.data.smile : '👆') +  (edge.data.label > 35 ? ' ' + edge.data.label.substring(0, 8) + '...' : edge.data.label)}
          </div>
    
  </div> 
      }
 })
}
</div>
{
  simulatedHistory.length >= 2 ? <div className='w-100 flex justify-end'>
    <button disabled={simulatedHistory.length < 2} onClick={e => {
      let x = simulatedHistory.length;
      setSimulateNodeId(simulatedHistory[x - 2])
      setSimulatedHistory(simulatedHistory.slice(0, -1))
    }}><img src={back} alt="img" className='w-6'/></button>
  </div> : null
}

  </div>  
  </div>
  <div className='max-w-screen-lg mt-28 mb-28'>
    <h2 id='label' className='mx-3 text-3xl'>Полезности</h2>
  <hr/>
  <Facts/> 
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
        deleteKeyCode = {[]}
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
                edgeId: null
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
            deleteElements({ edges: [{ id: dg.id }] })
            //setEdges((eds) => eds.concat( dg )); 
            }
            setEmojiAnimate(false)
            setTimeout(()=>{
              switchEmoji ({
                emojiWindowIsOpen: false,
                edgeId: null
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
            imgTest(nodeImg).then(result => {
              let nd
              nodes.forEach((node)=> {
              if (node.id === nodeId) nd = node})
              if (result) {nd.data.img = nodeImg}else{nd.data.img = ''; setNodeImg('')} 
              nd.data.label  = nodeText
              setNodes((nds) =>
                  nds.map((node) => {
                    if (node.id === nodeId) {
                      node.data = {
                        ...node.data,
                        label: nd.data.label,
                        img: nd.data.img
                      };
                    }
            
                    return node;
                  })
                );
            //deleteElements({ nodes: [{ id: nd.id}] })
            //console.log(nd);
            //setNodes((nds) => nds.concat( nd ));
          })
            setTextAnimate(false)
            setTimeout(()=>{
              switchText ({
                textWindowIsOpen: false,
                nodeId: null
              })   
  }, 200)}}>
      –
    </button></div>
        <div>
        <div className="container mx-auto px-4">
  <form className="max-w-screen-lg">
    <div className="mb-4">
      <label id='label' htmlFor='input3' className='text-lg mx-3 mt-4 font-philosopher'>
        URL картинки
      </label>
    <div className='font-philosopher text-xs mt-2'>
        <div id='label' className='mx-2'>{nodeImg === undefined || nodeText === null ? '0 / 2083' : (nodeImg.length + ' / 2083')}</div>
      </div>
      <input maxLength="2083" className="w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md focus:outline-none"  value={nodeImg || ''} 
            onChange={
              e =>{
                if (nodeImg.length <= 2083) 
                {
                  setNodeImg(e.target.value)
                }
                } 
              } 
              id="input3" type="text" placeholder="Адрес"/>
    </div>
    <div className="mb-4">
      <label id='label' htmlFor='textarea2' className='text-lg mx-3 mt-4 font-philosopher'>
        Текст
      </label>
      <div className='font-philosopher text-xs mt-2'>
      <div id='label' className='mx-2'>{nodeText === undefined || nodeText === null ? '0 / 4000' : (nodeText.length + ' / 4000')}</div>
      </div>
      <textarea maxLength="4000" className="w-full font-philosopher border-2 rounded-xl bg-slate-300 px-2 py-1 text-md focus:outline-none" rows={15}  value={nodeText || ''}
      onChange={e => {if (nodeText.length <= 4000) setNodeText(e.target.value)}} id="textarea2" placeholder="Текст"></textarea>
    </div>
  </form>
</div>
        </div>
        <div className='container mx-auto font-philosopher w-100 mt-20 px-4 mb-32'>
  <div className='max-w-screen-lg'>
    <h2 id='label' className='mx-3 text-3xl'>Полезности</h2>
  <hr/>
  <Facts/> 
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
