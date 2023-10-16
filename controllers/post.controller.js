const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.readPost = (req,res) => {
    PostModel.find()
    .then((posts) => res.status(200).json(posts))
    // .then(res.send(docs))
    .catch(error => res.status(400).json({error}));
}
module.exports.createPost = (req,res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message:req.body.message,
        video: req.body.video,
        likers:[],
        comments:[],
    });
    
    newPost.save()
    .then(()=> res.status(201).json({message: 'New object created'}))
    .catch(error => res.status(400).json({ error}));
}

module.exports.updatePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id)){
    return res.status(400).send('ID unknown:' + req.params.id);
    };
    const updatedRecord = {
        message:req.body.message
    };
    PostModel.findByIdAndUpdate(
        req.params.id,
        {$set:updatedRecord},
        {new:true},
    )
    .then(() => res.status(200).json({message: 'Object modified'}))
    .catch(error => res.status(400).json({error}));
}
module.exports.deletePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown:' + req.params.id);
    PostModel.findByIdAndRemove(
        req.params.id
    )
    .then(() => res.status(200).json({message: 'Object deleted!'}))
                    .catch(error => res.status(400).json({error}));
}

module.exports.likePost = async (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown:' + req.params.id);
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {likers: req.body.id}
            },
            {new:true}
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {$addToSet: {likes: req.params.id}
            },
            {new:true}
        );
        res.status(201).json('Like added');
    } catch (err) {
        console.log(err);
        return res.status(500).json( {message: err});
    };
}
module.exports.unlikePost = async (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown:' + req.params.id);
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {likers: req.body.id}
            },
            {new:true}
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {$pull: {likes: req.params.id}
            },
            {new:true}
        );
        res.status(201).json('Like deleted');
    } catch (err) {
        console.log(err);
        return res.status(500).json( {message: err});
    };
}