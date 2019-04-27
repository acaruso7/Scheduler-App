const express = require("express");
const router = express.Router();
const data = require('../data');
const path = require("path");

router.get("/", async (req, res) => {
    res.sendFile(path.resolve("static/createSchedule.html"));
});

router.post("/", async (req, res) => {  
    let title = req.body.title;
    let description = req.body.description;
    let email = req.body.email;
    let date = req.body.date;

    // try {
    //     const schedule = await scheduleData.getScheduleByID("5cbfa83324fa2b4510608fa8");
    //     const title = schedule.title;
    //     const description = schedule.description;
    //     const dates = schedule.dates;
    //     res.render('inviteForm', {title: title, description: description, dates: dates}) //handlebars templating
    // } catch (e) {
    //   res.status(500).send();
    // }
    res.redirect('/confirm')
});

module.exports = router;