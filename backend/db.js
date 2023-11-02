const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Antier:Antier123@antier.jvklgyk.mongodb.net/UserData?retryWrites=true&w=majority"

const connectToMongo=()=>{
  
    let client =mongoose.connect(mongoURI);
   
    console.log("Connected ");
}
module.exports = connectToMongo;