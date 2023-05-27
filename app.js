const express = require('express'); 
const controller = require('./controller'); 

const db = require('./sqlDb');  

const app = express(); 

app.get('/', async (req, res) => {

    // Simple string based Key Value at the Root path of the app. 
    await db.set('key','Some Value is just a string'); 
    res.send(await db.get('key'))

}); 

app.get('/path', controller.pathRender);  

app.get('/dog', controller.dogBuild,
                controller.dogRender)

app.get('/dogurl', controller.dogUrl)                

app.listen(3000, () => {
    console.log('App is listening.')
}); 
