const express = require('express')
const router = express.Router();
const passport = require('passport')
const User = require('../models/user.model');
const { isLoggedIn } = require('../middleware');

router.route('/register')
    .get((req, res)=>{
        res.status(200).json({Message: "Please post and register a new user"})
    })
    .post(async (req,res, next)=>{
        try{
            //console.log(req.body)
            const { email, username, password } = req.body
            const user = new User({email, username});
            const registerUser = await User.register(user, password);
            req.login(registerUser, err => {
                if (err){
                    return next(err);
                }
                res.status(200).json({data: registerUser, Message: "Success!"})
            })
        } catch(e){
            res.status(400).json({Message: "FAILED at registering user"})
        }
    })

router.route('/login')
    .get((req, res)=>{
        res.status(200).json({Message: "NEED TO GIVE PAGE to post and load"})
    })
    .post(
        passport.authenticate('local'), (req, res)=>{
            const redirectUrl = req.session.returnTo || '/home';
            delete req.session.returnTo;
            res.status(208).json({Message: "User signed in", data: req.session})
    })

router.route('/account')
    .get(isLoggedIn, (req, res)=>{
        res.status(200).json({data: req.currentUser, Message:"THIS SHOULD WORK"})
    })
    .delete(isLoggedIn, async (req, res)=>{
        id = req.user["_id"]
        await User.findByIdAndDelete(id)
            .then(data =>{
                req.logout();
                res.status(201).json({Message: "SUCCESS - USER DELETED"})
            })
            .catch(err =>{
                res.status(404).json({Message: "UNABLE TO DELETE"})
            })
    })

router.route('/logout')
    .get(isLoggedIn, (req, res)=>{
        res.status(210).json({Message: 'need to give logout page'})
    })
    .post(isLoggedIn, (req, res)=>{
        req.logout();
        res.status(211).json({Message: "successfully LOGGED OUT"})
    })

module.exports = router;
