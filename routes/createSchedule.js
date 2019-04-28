const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = require('../data/schedules')
const userData = require('../data/users')
const path = require("path");

router.get("/", async (req, res) => {
    res.sendFile(path.resolve("static/createSchedule.html"));
});

router.post("/", async (req, res) => {  
    let title = req.body.title;
    let description = req.body.description;
    let emails = req.body.emails;
    let dates = req.body.dates;
    let creator = req.session.userId;
    var today = new Date();

    try {
        const schedule = await scheduleData.create(creator, today, title, description)
        const scheduleId = schedule._id.toString()
        for (i=0; i < dates.length; i++) {
            await scheduleData.addDateToSchedule(scheduleId, new Date(dates[i]))
        }

        for (i=0; i < emails.length; i++) {
            await scheduleData.addUserToSchedule(scheduleId, (await userData.getUserIdByEmail(emails[i])))
        }
        
    } catch(e) {
        res.status(500).send();
        console.log(e)
    }
    res.redirect('/confirm')
});

module.exports = router;