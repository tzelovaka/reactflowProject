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

/*app.get('/api', async (request, response) => {
    const st = await story.findOne({where:{
        id: 6
    }});
    response.json({message: `${st.name}`})
})   //message: 
        //`${st.name} - история под номером ${st.id}`
    /*const st = await story.findOne({where:{
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
    })*/
    /*res.status(200).json(`${bl.name}`)
    res.status(200).json(`${li.name}`)*/
//const start = async () => {
//}

