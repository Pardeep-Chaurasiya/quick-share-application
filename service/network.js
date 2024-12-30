const os = require("os")

exports.getNetworkIpAddress =()=>{
    const networkInterfaces = os.networkInterfaces()

    const connectedNetworkInterface = Object.values(networkInterfaces)
    .flatMap(interface=>interface)
    .find(iface=> iface.family === "IPv4")

    if(connectedNetworkInterface){
        return connectedNetworkInterface.address
    }else{
        return null
    }
} 
