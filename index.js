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
    if (st == null) {
        response.status(200) //устанавливает код ответа 200, ответ не отправлен
        return response.send({ message: "Ошибка!" })
    }else{
    const {count, rows} = await storybl.findAndCountAll({where:{
            authId: data,
            release: false
    },
    order: [
      ['linid', 'ASC']
    ]});
    const blocks = rows;
    var levels = new Array();
    let x = count-1;
    for (let i=0; i <= x; i++){
        const {count, rows} = await storylin.findAndCountAll({where:{
            authId: data,
            release: false,
            storyblId: blocks[i].id
        }});
        levels[i] = new Array();
        let j = 0;
        if (count == 0 || rows === null) {
            levels[i][j] = {linktext: null,  url: null, blocktext: blocks[i].bl, blockurl: blocks[i].linid}
        }
        else{
        let z = count-1;
        for (j; j<=z; j++){
        const row = await storybl.findOne({where:{
            linid: rows[j].id,
            authId: data,
            release: false
        }})
        if (j == 0){
            if (row === null){
                levels[i][j] = {linktext: rows[j].link,  url: null, blocktext: blocks[i].bl, blockurl: blocks[i].linid}
            }else {
                levels[i][j] = {linktext: rows[j].link,  url: row.id, blocktext: blocks[i].bl, blockurl: blocks[i].linid}
            }
    }else{
        if (row === null){
            levels[i][j] = {linktext: rows[j].link,  url: null, blocktext: null, blockurl: null}
        }else{
        levels[i][j] = {linktext: rows[j].link,  url: row.id, blocktext: null, blockurl: null}
        }
    }
    }
}
        /*levels[i] = new Array();
        let z = count;
        for (let j = 0; j<=z; j++){
            if (j==0){
                console.log(blocks[i].bl);
                levels[i][j] = blocks[i].bl
            }else {
                console.log(`ССЫЛКА: ${rows[j-1].link}`);
                levels[i][j] = rows[j-1].link
            }
        }*/
    }
    console.log(levels);
    response.status(200) //устанавливает код ответа 200, ответ не отправлен
    return response.send({ message: levels})
    }
});
/*app.post('/api', (req, res) => {
    const message = req.body    
    /*const st = await story.findOne({where:{
        id: 6
    }});
    res.json(message)
})*/

