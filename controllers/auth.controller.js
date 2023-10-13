const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/errors.utils');


const createToken = (id) => {
    return jwt.sign(
        {id}, 
        'RANDOM_TOKEN_SECRET', 
        {expiresIn: "24h"}
        );
}

exports.signUp = async (req,res) => {
    const {pseudo, email, password} = req.body
    try {
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id});
    }
    catch(err){
        const errors = signUpErrors(err);
        res.status(200).send({errors});
    }

}

exports.signIn = async(req,res)=> {
    const {email, password} = req.body;
    try{
        const user = await UserModel.login(email,password);
        const token = createToken(user.id);
        res.cookie('jwt',token, {httpOnly:true, maxAge: 60000*60*24 });
        res.status(200).json({user:user.id});

    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json( {errors});
    }
}

exports.logout = async(req,res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}