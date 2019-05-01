const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const path = require("path");
const userData = data.users;

router.get('/', async(req, res) => {
    res.sendFile(path.resolve("static/login.html"));
});

router.post('/', async(req, res) => {
    let isRightPassword = false;
    let userId;
    // Check the username exsit or not. 
    // Check the password is right or not. 
    try {
        userId = await userData.getUserIdByEmail(req.body.username);
        isRightPassword = await bcrypt.compare(req.body.password, (await userData.get(userId)).password);
    } catch (e) {
        // *** client side sent error
        // res.write('<script> alert(error) </script?');
        res.status(404).render('error/error',{error: "email or password is wrong"});
        // res.status(404).json({error: "email or password is wrong"});
        return;
    }
    
    if(!isRightPassword){
        // *** client side sent error
        //redirct to login and alert 
        res.status(404).render('error/error',{error: "email or password is wrong"});
        // res.status(404).json({error: "email or password is wrong"});
        return;
    }

    req.session.isAuthenticated = true;
    req.session.userId = userId;
    res.redirect('/dashboard');

});

module.exports = router;