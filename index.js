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
app.use (express.static('build'));
app.use(bodyParser.json());

try{
    sequelize.sync({force: true})
    sequelize.authenticate()
    console.log('Successful connect!');
}catch(e){
    console.log(e)
}
app.post('/api/story', async (req, res) => {
    const title = req.query.title;
    const img = req.query.imgUrl;
    const desc = req.query.desc;
    await story.create({ img: `${img}`, title: `${title}`, desc: `${desc}`, authId: 123114565}); 
    res.send('Success');
  });

  app.listen(PORT, () => console.log(`Server started on ${PORT}s port`))
app.get('/api', async (request, response) => {
    const id = request.query.data;
    var authId
    var storyId
    var sourceId
    if (id !== null && id !== undefined){
    const st = await story.findOne({where:{
        authId: `${id}`,
        release: false
    }});
    if (st === null) {
        await story.create({title: 'Название', desc: 'Описание', authId: `${id}`});
        const stor = await story.findOne({where:{
            authId: `${id}`,
            release: false
        }});
        await storybl.create({text: 'Блок №0', authId: `${id}`, storyId: `${stor.id}`});
        const block = await storybl.findOne({where:{
            authId: `${id}`,
            release: false,
            storyId: `${stor.id}`
        }});
        const blocks = [
            {
              id: `${block.id}`,
              type: 'block',
              data: { label: `${block.text}`, img: ''},
              position: { x: 0, y: 50 },
            },
          ]
          const head = {
            id: stor.id,
            title: stor.title,
            desc: stor.desc,
            imgUrl: stor.img,
        }
        return response.send({ message: [head, blocks]})
    }else{
        const nodes = await storybl.findAndCountAll({where: {
            authId: `${id}`,
            storyId: `${st.id}`,
            release: false
        }})
        var edges = null
        if (nodes.length>1){
            edges = await storylin.findAll({where: {
                authId: `${id}`,
                storyId: `${st.id}`,
                release: false
            }})
        }
        let head = {
            title: st.title,
            desc: st.desc,
            imgUrl: st.img,
        }
        let blocks = []
        nodes.forEach((node) => 
        blocks.push({
            id: node.id,
            text: node.text,
            img: node.img,
        }))
        let links = []
        edges.forEach((edge) => 
        links.push({
            id: edge.id,
            text: edge.text,
            smile: edge.smile,
        }))
        return response.send({ message: [head, blocks, links] })
    }
    //response.status(200) //устанавливает код ответа 200, ответ не отправлен
    //return response.send({ message: scheme})
    }else{
        authId = request.query.authId;
        storyId = request.query.storyId;
        sourceId = request.query.sourceId;
        const bl = await storybl.create({text: 'Блок', storyId: storyId, authId: authId})
        const li = await storylin.create({text: 'Выбор', storyId: storyId, authId: authId, source: sourceId, tartget: bl.id})
        return response.send({ message: [bl.dataValues.id, li.dataValues.id] })
}
});


/*app.post('/api', (req, res) => {
    const message = req.body    
    /*const st = await story.findOne({where:{
        id: 6
    }});
    res.json(message)
})*/

