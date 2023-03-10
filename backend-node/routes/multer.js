const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }

});
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File Uploaded Successfully');
    } catch (error) {
        return res.status(500).json("Cant Be uploaded");
    }
});

module.exports = router;