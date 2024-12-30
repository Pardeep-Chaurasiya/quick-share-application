const { Server } = require("socket.io");

let ioInstance;

exports.initIO = (server) => {
    ioInstance = new Server(server);

    ioInstance.on("connection", (socket) => {
        console.log("New client connected");
        socket.emit("updateFileList", require("../db").files);

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};

exports.io = () => {
    if (!ioInstance) {
        throw new Error("Socket.IO not initialized");
    }
    return ioInstance;
};
