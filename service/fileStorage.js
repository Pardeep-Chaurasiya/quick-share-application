const fs = require("fs")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDirectory = "./uploads"

        if(!fs.existsSync(uploadDirectory)){
            fs.mkdirSync(uploadDirectory);
        }
        cb(null, uploadDirectory);
        },
        filename: (req, file, cb) => {
            // const uniqueSuffix = Date.now() +'-'+file.originalname;
            cb(null,file.originalname)
        },
})

exports.upload = multer({storage})