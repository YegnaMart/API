const multer = require("multer");
//const path = require("path");
 
//cb = callback
const filterFile = (req, res, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'  ||
        file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname);

    }
});

exports.uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    filterFile: filterFile
});