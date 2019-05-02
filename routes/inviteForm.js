const express = require("express");
const router = express.Router();
const data = require('../data');
const scheduleData = data.schedules;
const userData = data.users;

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
      res.status(500).send();
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
    res.redirect('/dashboard')
  } catch(e) {
    console.log(e)
    res.status(500).send()
  }
});

module.exports = router;