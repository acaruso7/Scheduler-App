const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const userData = data.users;


router.post('/', async(req, res) => {
    // console.log(req.body.username, req.body.password);
    
    let isRightPassword = false;
    let userId;
    // Check the username exsit or not. 
    // Check the password is right or not. 
    try {
        userId = await userData.getUserIdByEmail(req.body.username);await userData.get(userId);
        isRightPassword = await bcrypt.compare(req.body.password, (await userData.get(userId)).password);
    } catch (e) {
        // *** client side sent error
        res.status(404).json({error: "email or password is wrong"});
        return;
    }
    
    if(!isRightPassword){
        // *** client side sent error
        res.status(404).json({error: "email or password is wrong"});
        return;
    }

    req.session.isAuthenticated = true;
    req.session.userId = userId;
    res.redirect('/dashboard');

});

module.exports = router;