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
        const dates = schedule.dates;
        res.render('inviteForm', {title: title, description: description, dates: dates}) //handlebars templating
    } catch (e) {
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
    for (var key in req.body) {
      if (req.body[key][0]==='yes') {
        await scheduleData.addAvailabilityToResponse(scheduleId, user, key, req.body[key].slice(1))
      }
    }
    res.redirect('/dashboard')
  } catch(e) {
    console.log(e)
    res.status(500).send()
  }
});

module.exports = router;