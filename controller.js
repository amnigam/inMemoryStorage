const db = require('./sqlDb'); 
const fs = require('fs'); 
const nativeDS = require('./dataStore');    // This exposes an object with 2 methods to demo add/retrieval of data. 
const axios = require('axios'); 

module.exports.pathRender = async (req, res, next) => {
    const obj = {
        name: 'Superman',
        age: 36
    }; 

    // You need to stringify the object before inserting into SQL DB. 
    const insObj = JSON.stringify(obj); 

    await db.set('person', insObj); 
    db.get('person')
        .then( (resolve) => {
            const x = JSON.parse(resolve); 
            console.log(x);     // Log actual object back
            fs.writeFileSync('out.txt', resolve);   // Write the stringify data object only since File requires String.
        })
    
    // Sending back the key from previous path to test for persistence. 
    res.send(await db.get('key')); 
}

module.exports.dogBuild = async (req, res, next) => {
    const dogUrl = await axios.get('https://dog.ceo/api/breeds/image/random'); 
    req.dogUrl = dogUrl.data.message;       // Setting a property on the REQ body pointing to dog img url. 
    console.log(req.dogUrl); 
    next(); 
}

module.exports.dogRender = async (req, res, next) => {
    const dogImg = await axios.get(req.dogUrl);       // retrieve it from req body set in previous middleware. 
    const temp = JSON.stringify(req.session.animalObj); 
    const html = `<img src=${req.dogUrl} >
                    <div> ${temp}</div> 
                    <a href='/'>Home </a>
                    `     // Show the image on the page. 

    url = req.dogUrl;
    urlObj = {link: url}; 

    console.log("Object we are passing in: ", urlObj); 
    nativeDS.addData('url', urlObj);   // leverage the addData method to add the object into our data store. 
    res.send(html); 
}

module.exports.dogUrl = (req, res, next) => {
    // In this function we retrieve the data stored in our native data store. 
    const data = nativeDS.getAllData('url'); 
    console.log(data); 
    res.json(data); 
}