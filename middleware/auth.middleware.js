const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

exports.checkUser = (req,res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(
            token, 
            'RANDOM_TOKEN_SECRET',
            async(err, decodedToken) => {
                if(err) {
                    res.locals.user= null;
                    res.cookie('jwt','',{maxAge:1})
                    next();
                } else {
                    let user = await UserModel.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            }
            )
    }else {
        res.locals.user = null;
        next();
    }
}

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(
            token,
            'RANDOM_TOKEN_SECRET',
            async (err, decodedToken) => {
                if(err){
                    console.log(err);
                }else {
                    console.log(decodedToken.id);
                    next();
                }
            }
        )
    }else{
        console.log('Token is absent');
    }
}