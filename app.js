const express = require('express'); 
const session = require('express-session'); 

const controller = require('./controller'); 
const db = require('./sqlDb');  

const app = express(); 

app.use(session({ 
    secret: "Nilaxi",
    saveUnInitialized: true,
    resave: true
})); 


app.get('/', async (req, res) => {

    // Simple string based Key Value at the Root path of the app. 
    await db.set('key','Some Value is just a string'); 
    req.session.animalObj = {
        species: "Dog",
        type: "Mammal",
        legs: 4
    }; 
    
    res.send(await db.get('key'))

}); 

app.get('/path', controller.pathRender);  

app.get('/dog', controller.dogBuild,
                controller.dogRender)

app.get('/dogurl', controller.dogUrl)                

app.listen(3000, () => {
    console.log('App is listening.')
}); 
