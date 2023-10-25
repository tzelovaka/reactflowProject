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
    /*const title = req.query.title;
    const img = req.query.imgUrl;
    const desc = req.query.desc;*/
    const head = req.body.head;
    await story.create({ img: `${head.imgUrl}`, title: `${head.title}`, desc: `${head.desc}`, authId: `${head.authId}`}); 
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
    if (st===null){
        return response.send({ message: [{title: '', imgUrl: '', desc: ''}, initialNodes, []]})
    }else{
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
        if (blocks.length > 0){
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
                    x: block.postionX,
                    y: block.postionY,
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
        if (links.length > 0){
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
        return response.send({ message: [head, nodes, edges]})
    }
})


/*app.post('/api', (req, res) => {
    const message = req.body    
    /*const st = await story.findOne({where:{
        id: 6
    }});
    res.json(message)
})*/

