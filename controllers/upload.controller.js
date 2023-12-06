const fs = require('fs');
const UserModel = require('../models/user.model');
const path = require('path');

exports.uploadProfil = async (req,res) => {
    // fs.renameSync(req.file.path, req.file.path.replace('NaN', req.body.name));
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }
    
    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set:{picture:"./uploads/profil/" + req.file.filename }
            },
            {new:true},
    
            )
            .then(() => res.status(200).json({message: 'picture added'}))
            .catch(error => res.status(400).json({error}));
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}