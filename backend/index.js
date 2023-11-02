const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
connectToMongo();
const app = express();
const port = 5000;


//to use cors -origin
app.use(cors());
//for using req.body ....use this middleware
app.use(express.json());

//Available routes
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))


app.listen(port,()=>{
    console.log(`iNotebook listening at port ${port}`);
})