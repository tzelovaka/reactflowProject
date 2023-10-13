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
    console.log(request);
    const id = request.query.data;
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
        const data = [
            {
              id: `${block.id}`,
              type: 'block',
              data: { label: `${block.text}`, img: ''},
              position: { x: 0, y: 50 },
            },
          ]
        return response.send({ message: [stor, data]})
    }else{
        const nodes = await storybl.findAndCountAll({where: {
            authId: `${id}`,
            storyId: `${st.id}`,
            release: false
        }})
        var edges = null
        if (nodes.length>1){
            edges = await storylin.findAndCountAll({where: {
                authId: `${id}`,
                storyId: `${st.id}`,
                release: false
            }})
        }
        return response.send({ message: [st, nodes, edges] })
    }
    //response.status(200) //устанавливает код ответа 200, ответ не отправлен
    //return response.send({ message: scheme})
    }
//}
);

/*app.post('/api', (req, res) => {
    const message = req.body    
    /*const st = await story.findOne({where:{
        id: 6
    }});
    res.json(message)
})*/

