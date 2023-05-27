const db = require('./sqlDb'); 
const fs = require('fs'); 

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