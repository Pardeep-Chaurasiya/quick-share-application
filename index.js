const express = require("express");
const app = express();
const router = require("./routes/router")
const {getNetworkIpAddress} = require("./service/network")
const {initIO} = require("./service/socket")

const ipAddress =getNetworkIpAddress()

const port = 3000;


// Middelwares
app.use("/",express.static("./public"))
app.use("/uploads",express.static("./uploads"))

// Routes
app.use("/api/v1",router)

const server = app.listen(port,()=>{

    if(!ipAddress){
        console.info(`Server Stopped`)
        process.exit(0)
    }
    console.info(`Server is running on port ${port}`);
    console.info(`Server connected address for file sharing is http://${ipAddress}:${port}`);
})

// socket connection
initIO(server)