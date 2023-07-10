const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

exports.getAllUsers = async(req,res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

exports.userInfo = async (req,res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);
    try {
        const docs = await UserModel.findById(req.params.id).select('-password');
        res.send(docs);
      } catch (err) {
        console.log('Id unknown' + err);
      }
}

exports.updateUser = async (req,res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);
    try{
       const docs = await UserModel.findOneAndUpdate(
            {_id:req.params.id},
            {
                $set: {
                    bio:req.body.bio
                }
            },
            {new:true, upsert:true, setDefaultsOnInsert:true},
        );
        res.send(docs);
    } catch (err) {
        return res.status(500).json( {message: err});
    }
};

exports.deleteUser = async(req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown:' + req.params.id);
    try {
        await UserModel.deleteOne({_id: req.params.id});
        res.status(200).json({message: "Successfully deleted."});
        console.log('user deleted');
    }catch(err){
        return res.status(500).json( {message: err});
        console.log('user is not deleted');
    }
}