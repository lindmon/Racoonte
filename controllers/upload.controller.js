const fs = require('fs');
exports.uploadProfil = async (req,res) => {
    fs.renameSync(req.file.path, req.file.path.replace('NaN', req.body.name));
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }
    res.send('File uploaded');
}