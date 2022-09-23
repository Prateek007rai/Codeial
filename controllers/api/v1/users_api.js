const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const env = require('../../../config/envirnoment');


module.exports.createSession = async function(req ,res){

    try{
        let user = await User.findOne({email:req.body.email})

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Invalid Username/Password'
            });
        }

        return res.status(200).json({
            message: 'Sign In successfull, here is your token ,plz keep it safe',
            data: {
                token: jwt.sign(user.toJSON() , env.jwt_secret ,{expiresIn: '100000'})                  //10000 is in millisec ... codeial is used here for encrypt
            }
        });

    }catch(err){
        console.log('***************' ,err);
        return res.status(500).json({
           message: "internal server error"
        });

     }
};
