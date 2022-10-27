require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const story = require('./models/story')
const storybl = require('./models/block');
const storylin = require('./models/link');
const Axios = require('axios')
//const tgid = require('./src/App')
//const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express();
//console.log(tgid);
/*app.use(cors())
app.use(express.json())*/
try{
    app.listen(PORT, () => console.log(`Server started on ${PORT}s port`))
    sequelize.authenticate()
    console.log('Successful connect!');
}catch(e){
    console.log(e)
}
app.use (express.static('build'));

app.post("https://storinter.herokuapp.com/api", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    //response.send(`${request.body.userName} - ${request.body.userAge}`);
});
/*app.get('/api', async (req, res) => {
    const st = await story.findOne({where:{
        id: 6
    }});
    const bl = await storybl.findAll({where:{
        storyId: 6
    }});
    const li = await storylin.findAll({where:{
        storyId: 6
    }});
    //console.log(bl);
    await res.json({
        message: `${st.name} - история под номером ${st.id}`
    })
})*/
//const start = async () => {
//}

