const path = require("path");
const express = require("express");
const router = express.Router();
const scheduleData = require('../data/schedules')
const emailConfig = require('../config/email')
const emailer = require('node-email-sender');
// const xss = require("xss");

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
        req.session.scheduleId = schedule._id;
        const scheduleId = schedule._id.toString()
        if(typeof dates === "string"){
            dates = [dates];
        }
        for (i=0; i < dates.length; i++) {
            await scheduleData.addDateToSchedule(scheduleId, new Date(dates[i]))
        }
        if(typeof emails === "string"){
            emails = [emails];
        }
        for (i=0; i < emails.length; i++) {
            emailer.sendMail({
                emailConfig: emailConfig.emailConfig,
                to: emails[i],
                subject: 'ScheduleMe Invitation to Edit',
                content: `You've been invited to edit a ScheduleMe schedule. Please enter your availability at the following link: \n \
                http://localhost:3000/email/${schedule._id}`,
            });
        }   
    } catch(e) {
        res.status(500).send();
        console.log(e)
    }
    res.redirect('/inviteForm')
});

module.exports = router;