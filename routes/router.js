const { Router } = require("express");
const { upload } = require("../service/fileStorage");
const { files } = require("../db");
const { io } = require("../service/socket");
const path = require("path");
const fs = require("fs");

const router = new Router();

// Upload Route
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded", success: false });
    }

    const newFile = {
        filename: req.file.originalname,
        path: req.file.path,
    };

    files.push(newFile);
    res.json({ message: "File uploaded successfully", success: true });

    // Emit updated file list to all connected clients
    io().emit("updateFileList", files);
});

// Download Route
router.get("/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found", success: false });
    }

    res.download(filePath, filename, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error downloading file", success: false });
        }
    });
});

module.exports = router;
