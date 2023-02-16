const multer = require('multer');

// Creating a fiilter to only allow images to be uploaded
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Please upload only images', false);
    };
};

// Configuring multer to use diskstorage, specifying destination and filename
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.session.user_id + "-" + file.originalname);
    }
});

// Passing in options to multer and exporting
var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;