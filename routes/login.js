const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const userData = data.users;
const xss = require('xss')

router.get('/', async(req, res) => {
    res.render('log/login',{});
});

router.post('/', async(req, res) => {
    let isRightPassword = false;
    let userId;
    // Check the username exsit or not. 
    // Check the password is right or not. 
    try {
        userId = await userData.getUserIdByEmail(req.body.username);
        isRightPassword = await bcrypt.compare(xss(req.body.password), (await userData.get(userId)).password);
    } catch (e) {
        res.status(404).render('log/login',{error: "Email or password is incorrect"});
        return;
    }
    
    if(!isRightPassword){
        res.status(404).render('log/login',{error: "Email or password is incorrect"});
        return;
    }

    req.session.isAuthenticated = true;
    req.session.userId = userId;
    if(req.session.fromEmail){
        res.redirect('/inviteForm');
    } else if(req.session.fromFinalEmail) {
        res.redirect(`/dashboard/${req.session.scheduleId}`)
    }
    else{
        res.redirect('/dashboard');
    }   

});

module.exports = router;