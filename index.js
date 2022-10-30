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
    const st = await story.findOne({where:{
        authId: `${data}`,
        release: false
    }});
    const {count, rows} = await storybl.findAndCountAll({where:{
        authId: data,
        release: false
    }});
    if (st == null) {
        response.status(200) //устанавливает код ответа 200, ответ не отправлен
        return response.send({ message: "Ошибка!" })
    }else{
    var blocks = new Array();
    let x = count-1;
    for (let i=0; i <= x; i++){
        const {coun, row} = await storylin.findAndCountAll({where:{
            authId: data,
            release: false,
            storyblId: rows[i].id
        }});
        console.log(rows[i]);
        blocks[i] = new Array();
        let z = coun - 1;
        for (let j = 0; j<=z; j++){
            if (j==0){
                console.log(rows[i].bl);
                blocks[i][j] = rows[i].bl
            }else {
                console.log(row[j--].link);
                blocks[i][j] = row[j--].link
            }
        }
    }
    console.log(blocks);
    response.status(200) //устанавливает код ответа 200, ответ не отправлен
    return response.send({ message: blocks})
    }
});
/*app.post('/api', (req, res) => {
    const message = req.body    
    /*const st = await story.findOne({where:{
        id: 6
    }});
    res.json(message)
})*/

