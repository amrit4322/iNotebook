const mongoose = require('mongoose');
const mongoURI = "<Mongodb uri"  //insert your own mongodb uri

const connectToMongo=()=>{
  
    let client =mongoose.connect(mongoURI);
   
    console.log("Connected ");
}
module.exports = connectToMongo;