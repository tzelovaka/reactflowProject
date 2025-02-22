require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const story = require('./models/story')
const storybl = require('./models/block');
const storylin = require('./models/link');
const bodyParser = require('body-parser');
const BigInt = require('big-integer')
const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())
app.use (express.static('build'));
app.use(bodyParser.json());
try{
    sequelize.sync({})
    sequelize.authenticate()
    console.log('Successful connect!');
}catch(e){
    console.log(e)
}
app.post('/api/story', async (req, res) => {
    try{
      const head = req.body.head;
    const nodes = req.body.nodes;
    const edges = req.body.edges;
    const st = await story.findOne({where:{authId: `${head.authId}`, release: false}})
    if (st){
        st.img = `${head.imgUrl}`;
        st.title= `${head.title}`;
        st.desc= `${head.desc}`;
        st.save()
    }else{
        await story.create({ img: `${head.imgUrl}`, title: `${head.title}`, desc: `${head.desc}`, authId: `${head.authId}`});
    }
    const s = await story.findOne({where:{authId: `${head.authId}`, release: false}})
    nodes.forEach(async (node) => {
        const bl = await storybl.findOne({where :{
            fId: `${node.id}`,
            storyId: `${s.id}`,
            authId: `${head.authId}`
        }
        })
        if (bl) {
            bl.img=node.data.img;
            bl.text=node.data.label;
            bl.positionX=Math.round(node.position.x);
            bl.positionY=Math.round(node.position.y)
            await bl.save()
        }else{
            await storybl.create({
            fId: node.id,
            img: node.data.img,
            text: node.data.label,
            positionX: Math.round(node.position.x),
            positionY: Math.round(node.position.y),
            storyId: s.id,
            authId: head.authId
        })     
        }
        
    })
    const bls = await storybl.findAll({where: {
        storyId: `${s.id}`,
        authId: `${head.authId}`,
        release: false
    }})
    bls.forEach(async (bl)=>{
        if (nodes.find(node=>node.id==bl.fId)===undefined || nodes.find(node=>node.id==bl.fId)===null) {
            await storybl.destroy({
                where: {
                    id: `${bl.id}`,
                    fId: `${bl.fId}`,
                    storyId: `${s.id}`,
                    authId: `${head.authId}`,
                    release: false
                },
              });
        }
        })
    await edges.forEach(async (edge) => {
        const li = await storylin.findOne({where :{
            fId: `${edge.id}`,
            storyId: `${s.id}`,
            authId: `${head.authId}`
        }
        })
        if(li){
            li.smile=edge.data.smile;
            li.text=edge.data.label;
            await li.save()
        }else{
          await storylin.create({
            fId: edge.id,
            smile: edge.data.smile,
            text: edge.data.label,
            source: edge.source,
            target: edge.target,
            storyId: s.id,
            authId: head.authId
        })  
        }
        
    })
    const lis = await storylin.findAll({where: {
        storyId: `${s.id}`,
        authId: `${head.authId}`,
        release: false
    }})
    lis.forEach(async (li)=>{
        if (edges.find(edge=>edge.id==li.fId)===undefined || edges.find(edge=>edge.id==li.fId)===null) {
            await storylin.destroy({
                where: {
                    id: `${li.id}`,
                    fId: `${li.fId}`,
                    storyId: `${s.id}`,
                    authId: `${head.authId}`,
                    release: false
                },
              });
        }
        })
        if (req.body.head.release){
            const st = await story.findOne({where:{authId: `${head.authId}`, release: false}})
            st.release = true;
            st.save()
            await nodes.forEach(async (node)=>{
                const bl = await storybl.findOne({where: {
                    fId: `${node.id}`,
                    storyId: `${s.id}`,
                    authId: `${head.authId}`
            }})
            bl.release=true;
            await bl.save()
            })
            await edges.forEach(async (edge) => {
                    const li = await storylin.findOne({where :{
                    fId: `${edge.id}`,
                    storyId: `${s.id}`,
                    authId: `${head.authId}`
                }
                })
                li.release=true;
                await li.save()
            })
        }  
    }catch(e){
        console.log(e);
    }
    
        
        res.json('success');
  });
  const head = {
    title: '',
    imgUrl: '',
    desc: ''
  }
  const initialNodes = [
    {
      id: '0',
      type: 'block',
      data: { 
        label: 'Зажмите область цвета светло-зелёного моря и проведите в сторону=>', 
        img: ''},
      position: { x: 0, y: 50 },
    },
    {
        id: '1',
        type: 'block',
        data: { 
            label: '=>Отпустите и нажмите на серую форму в появившемся блоке=>', 
            img: '' },
        position: { x: 150, y: 500 },
    },
    {
        id: '2',
        type: 'block',
        data: { 
            label: '=>Творите...', 
            img: ''
          },
        position: { x: -150, y: 650 },
    },
  ];
const initialEdges = [
    {
        id: 'e0-1', 
        source: '0', 
        type: 'CustomEdge', 
        target: '1', 
        data: { label: '...иначе не опубликуется', smile: '' } 
    },
    {
        id: 'e0-2', 
        source: '0', 
        type: 'CustomEdge', 
        target: '2', 
        data: { label: 'Введите текст выбора...', smile: '' } 
    }
]
app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
app.get('/api', async (request, response) => {
    try{
        const id = BigInt(request.query.data);
        const st = await story.findOne({where:{
        authId: id,
        release: false
    }});
    if (st !== null){
        let mind = {
            title: st.title,
            img: st.img,
            desc: st.desc,
        }
        const blocks = await storybl.findAll ({where: {
            authId: id,
            release: false,
            storyId: st.id
        }})
        let nodes = []
        if (blocks){
        let node
        blocks.forEach((block) => {
            node = {
                id: block.fId.toString(),
                type: 'block',
                data: { 
                    label: block.text,
                    img: block.img,
                    },
                position: {
                    x: Number(block.positionX),
                    y: Number(block.positionY),
                }
            }
            nodes.push(node)
        })
    }else{
        nodes = initialNodes
    }
        const links = await storylin.findAll ({where: {
            authId: id,
            release: false,
            storyId: st.id
        }})
        let edges = []
        if (links){
        let edge
        links.forEach((link) => {
            edge = {
                id: link.fId.toString(),
                source: link.source.toString(),
                type: 'CustomEdge',
                target: link.target.toString(),
                data: { 
                    label: link.text,
                    smile: link.smile,
                    },
                hidden: false
            }
            edges.push(edge)
        })
        return response.send({message:{
            head: mind,
            nodes: nodes,
            edges: edges
        }})
    }
    }else{
      return response.send({ 
        message: {
            head: head, 
            nodes: initialNodes, 
            edges: initialEdges
        }
    })  
    }  
    
    }catch(e){
        console.log(e);
    }
})
