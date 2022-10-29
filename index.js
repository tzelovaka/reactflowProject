require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const story = require('./models/story')
const storybl = require('./models/block');
const storylin = require('./models/link');
//const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express();
//const axios = require('axios').default
//const tgid = require('./src/App.js')
/*app.use(cors())*/

try{
    app.listen(PORT, () => console.log(`Server started on ${PORT}s port`))
    sequelize.authenticate()
    console.log('Successful connect!');
}catch(e){
    console.log(e)
}
app.use(express.json())
app.use (express.static('build'));

app.get('/api', async (request, response) => {
    const data = request.query.data;
    console.log(data);
    const st = await story.findOne({where:{
        authId: `${data}`
    }});
    response.json('DATA');
});
/*app.post('/api', (req, res) => {
    const message = req.body    
    /*const st = await story.findOne({where:{
        id: 6
    }});
    res.json(message)
})*/

