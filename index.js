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
//app.use(bodyParser.json());

try{
    sequelize.sync({force: true})
    sequelize.authenticate()
    console.log('Successful connect!');
}catch(e){
    console.log(e)
}
app.post('/api/story', async (req, res) => {
    const data = req.query.body;
    console.log(data);

       await story.create({ title: `${data}`, desc: `${data}`, authId: 123114565}); 
    res.send('Success');
  });
app.listen(PORT, () => console.log(`Server started on ${PORT}s port`))
app.get('/api', async (request, response) => {
    const data = request.query.data;
    const st = await story.findOne({where:{
        authId: `${data}`,
        release: false
    }});
    if (st === null) {
        return response.send({ message: false })
    }else{
        
    return response.send({ message: true })
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

