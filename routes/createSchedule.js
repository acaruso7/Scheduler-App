const path = require("path");
const express = require("express");
const router = express.Router();
const scheduleData = require('../data/schedules')
const userData = require("../data/users")
const emailConfig = require('../config/email')
const emailer = require('node-email-sender');
const deployUrl = require('../config/deploy').url;
const xss = require("xss");

router.get("/", async (req, res) => {
    let user = await userData.get(req.session.userId)
    let email = user.email
    res.render('createSchedule', {email: email})
});

router.post("/", async (req, res) => {  
    let title = xss(req.body.title);
    let description = xss(req.body.description);
    let emails = req.body.emails;
    let dates = req.body.dates;
    if(typeof dates === "string")
        dates = [dates];
    dates = dates.sort()
    
    let creator = req.session.userId;
    var today = new Date();

    if(typeof emails === "string"){
        emails = [emails];
    }
    for (const index in emails) {
        if (emails.hasOwnProperty(index)) {
            const oneEmail = emails[index].toLowerCase();
            emails[index] = oneEmail;
        }
    }
    
    if(typeof dates === "string"){
        dates = [dates];
    }

    try {
        const schedule = await scheduleData.create(creator, today, title, description, emails.length + 1)
        req.session.scheduleId = schedule._id;
        const scheduleId = schedule._id.toString()
        for (i=0; i < dates.length; i++) {
            await scheduleData.addDateToSchedule(scheduleId, new Date(dates[i]))
        }
        for (i=0; i < emails.length; i++) {
            emailer.sendMail({
                emailConfig: emailConfig.emailConfig,
                to: emails[i],
                subject: 'ScheduleMe Invitation to Edit',
                content: `You've been invited to edit a ScheduleMe schedule. Please enter your availability at the following link: 
                ${deployUrl}/email/${schedule._id} <br> <br>
                The schedule title is: ${schedule.title} <br>
                The schedule description is: ${schedule.description}`,
            });
        }   
    } catch(e) {
        res.status(500).render('error/error',{error: "Create Schedule fail!"});
        console.log(e)
    }
    res.redirect('/inviteForm')
});

module.exports = router;