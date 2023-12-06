const multer = require('multer');
const path = require('path');
const MIME_TYPES = {
'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const uploadPath = path.join(__dirname,'../', 'client','public','uploads','profil');


const storage = multer.diskStorage({
    destination: (req,file, callback) => {
        callback(null, uploadPath);
    },
    filename: (req,file, callback) => {
        // const name = file.originalname.split(' ').join('_');
        // const name = req.body.name
        const extension = MIME_TYPES[file.mimetype];
        callback(null, req.body.name + Date.now() + '.' + extension);
    }
    
});

module.exports = multer({storage}).single('file');