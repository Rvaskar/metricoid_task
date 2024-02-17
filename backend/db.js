const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/MetricoidTest";

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("connected to mongo db successfully")
    }catch(error){
        console.error("error connecting to mongoDB:" , error);
    }
}

module.exports = connectToMongo;