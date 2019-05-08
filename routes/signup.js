const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const userData = data.users;
const saltRounds = 3;

// *** get mey be deleted for the future
router.get('/', async(req, res) => {
    res.render('log/signup',{});
});
// ********

router.post('/', async(req, res) => {
    // find username exist or not
    try {
        await userData.getUserIdByEmail(req.body.username);
        res.render('log/signup',{nameError: "exist"});
        return;
    } catch (e){}

    // compare two password is same or not

    if(req.body.password != req.body.confirmPassword){
        res.render('log/signup',{notSameError: "same"});
        return;
    }

    // create a new user
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await userData.create(req.body.fullName, req.body.username, hashedPassword);
        req.session.isAuthenticated = true;
        req.session.userId = newUser._id.toString();
        if(req.session.fromEmail){
            res.redirect('/inviteForm');
        }
        else{
            res.redirect('/dashboard');
        }   
    } catch (e) {
        res.render('error/error', {error: e});
    }
});


module.exports = router;