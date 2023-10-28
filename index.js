require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const story = require('./models/story')
const storybl = require('./models/block');
const storylin = require('./models/link');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())
//app.use(express.static(path.join(__dirname, '/build')));
//app.use(express.static(path.join(__dirname, 'build')));

//app.get('/', function (req, res) {
 // res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});
app.use (express.static('build'));
app.use(bodyParser.json());
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});*/
try{
    sequelize.sync({force: true})
    sequelize.authenticate()
    console.log('Successful connect!');
}catch(e){
    console.log(e)
}
app.post('/api/story', async (req, res) => {
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
            bl.positionX=node.position.x;
            bl.positionY=node.position.y
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
          storylin.create({
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
    res.send('Success');
  });


/*const staticPath = './src'
app.get('/', async (request, response)=>{
    response.sendFile(path.join(process.cwd(), staticPath, 'index.html'))
}) */
  const initialNodes = [
    {
      id: '0',
      type: 'block',
      data: { label: 'Node' },
      position: { x: 0, y: 50 },
    },
  ];

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
app.get('/api', async (request, response) => {
    const id = request.query.data;
    const st = await story.findOne({where:{
        authId: `${id}`,
        release: false
    }});
    if (st){
        let head = {
            title: st.title,
            img: st.img,
            desc: st.desc,
        }
        const blocks = await storybl.findAll ({where: {
            authId: `${id}`,
            release: false,
            storyId: st.id
        }})
        let nodes = []
        if (blocks){
        let node
        blocks.forEach((block) => {
            node = {
                id: block.fId,
                type: 'block',
                data: { 
                    label: block.text,
                    img: block.img
                    },
                position: {
                    x: Math.round(parseInt(block.postionX)),
                    y: Math.round(parseInt(block.postionY)),
                }
            }
            nodes.push(node)
        })
    }else{
        nodes = initialNodes
    }
        const links = await storylin.findAll ({where: {
            authId: `${id}`,
            release: false,
            storyId: st.id
        }})
        let edges = []
        if (links){
        let edge
        links.forEach((link) => {
            edge = {
                id: link.fId,
                type: 'CustomEdge',
                data: { 
                    label: link.text,
                    smile: link.smile
                    },
                sorce: link.source,
                target: link.target
            }
            edges.push(edge)
        })
    }
    console.log(nodes);
        return response.send({ message: {
            head: head, 
            nodes: nodes, 
            edges: edges
        }
    })
    }else{
        return response.send({ message: {head: {title: '', imgUrl: '', desc: ''}, nodes: initialNodes, edges: []}})
    }
})


/*app.post('/api', (req, res) => {
    const message = req.body    
    /*const st = await story.findOne({where:{
        id: 6
    }});
    res.json(message)
})*/

