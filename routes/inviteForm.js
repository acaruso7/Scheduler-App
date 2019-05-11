const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;
const userData = data.users;
const emailConfig = require('../config/email')
const emailer = require('node-email-sender');
const deployUrl = require('../config/deploy').url;

router.get("/", async (req, res) => {  
    try {
        const schedule = await scheduleData.getScheduleByID(req.session.scheduleId);
        const title = schedule.title;
        const description = schedule.description;
        let dates = schedule.dates;
        for (let i=0; i < dates.length; i++) {
          dates[i] = dates[i].toDateString()
          dates[i] = dates[i].replace(/\s/g, '-');
        }
        res.render('inviteForm', {title: title, description: description, dates: dates}) //handlebars templating
    } catch (e) {
      console.log(e)
      res.status(500).render('error/error',{error: "Get Invite Form fail!"});
    }
});

router.post("/", async (req, res) => { 
  try {
    let user = req.session.userId;
    let scheduleId = req.session.scheduleId;
    await userData.addScheduleToUser(user, scheduleId)
    await scheduleData.addUserToSchedule(scheduleId, user)
    await scheduleData.addResponseToSchedule(scheduleId, user)
    for (let date in req.body) {
      if (req.body[date][0]==='yes') {
        await scheduleData.addAvailabilityToResponse(scheduleId, user, new Date(date), req.body[date].slice(1))
      }
    }
    let schedule = await scheduleData.getScheduleByID(scheduleId)
    let invitees = schedule.users;
    let responses = schedule.responses;
    let numInvitees = schedule.numInvitees;

    if (numInvitees === responses.length) {
      for (let i = 0; i < invitees.length; i++) {
        const oneInvitee = invitees[i];
        emailer.sendMail({
          emailConfig: emailConfig.emailConfig,
          to: (await userData.get(oneInvitee)).email,
          subject: 'ScheduleMe Final Schedule',
          content: `Everyone has responded to your ScheduleMe schedule. Please find the final version at the following link: \n \
          ${deployUrl}/email/dashboard/${scheduleId}`
        });
      }
    } 
    delete req.session.scheduleId;
    res.redirect('/dashboard');
  } catch(e) {
    console.log(e)
    res.status(500).render('error/error',{error: "Post Invite Form fail"});
  }
});

module.exports = router;