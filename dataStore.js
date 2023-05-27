const dataStore = {}; 

module.exports = {
    addData: (model, data) => { 
        // If model doesn't exist, create an array for that model passed in. 
        if (!dataStore[model]) {
            dataStore[model] = []; 
        }; 
    
        data.id = dataStore[model].length + 1; 
        dataStore[model].push(data); 
    
        console.log(`New Data Added to Store. ${model}: `, data); 
    },

    getAllData: (model) => {
        const dataModel = dataStore[model];
        if (!dataModel) {
            console.log(`No Data in Model: ${model}`); 
        }

        console.log('Here is the data: ', {
            [model]: dataModel
        })

        return {
            [model]: dataModel
        }
    }
} ;

// We export an object that has 2 methods to add Data & get Data inside the dataStore object literal defined in this file.
// We leverage these methods to create an in-memory store with normal data structures available to us. 


